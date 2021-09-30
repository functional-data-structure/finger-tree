import assert from 'assert';
import {Tree} from '../base/index.js';
import {
	_from_digit,
	_from_small_list,
	_deepL,
	_deepR,
	CachedMeasure,
	Split,
} from '../../0-core/index.js';
import {One, Two, Three, Four} from '../../1-digit/index.js';
import {delay, Lazy} from '../../4-lazy/index.js';
import _prepend_small_list from '../../0-core/_fast/_prepend_small_list.js';
import _fill_right from '../../0-core/_fast/_fill_right.js';
import isSameMeasure from '../../_debug/isSameMeasure.js';
import _append_small_list from '../../0-core/_fast/_append_small_list.js';
import {Empty} from './0-Empty.js';
import {Single} from './1-Single.js';

export function Deep(M, left, middle, right) {
	assert(
		left instanceof One ||
			left instanceof Two ||
			left instanceof Three ||
			left instanceof Four,
	);
	assert(
		middle instanceof Empty ||
			middle instanceof Single ||
			middle instanceof Deep ||
			middle instanceof Lazy,
	);
	assert(
		right instanceof One ||
			right instanceof Two ||
			right instanceof Three ||
			right instanceof Four,
	);
	assert(middle instanceof Lazy || middle.M instanceof CachedMeasure);
	this.M = M;
	this._left = left;
	this._middle = middle;
	this._right = right;
	this.v = null;
}

Deep.prototype = new Tree();

Deep.prototype.measure = function () {
	if (this.v === null) {
		const M = this.M;

		this.v = M.plus(
			this._left.measure(M),
			M.plus(this._middle.measure(), this._right.measure(M)),
		);
	}

	return this.v;
};

Deep.prototype.isEmpty = function () {
	return false;
};

Deep.prototype.head = function () {
	return this._left.head();
};

Deep.prototype.last = function () {
	return this._right.last();
};

Deep.prototype.tail = function () {
	if (this._left instanceof One) {
		if (this._middle.isEmpty()) {
			return _from_digit(this.M, this._right);
		}

		return new Deep(
			this.M,
			this._middle.head()._digit(),
			delay(() => this._middle.tail()),
			this._right,
		);
	}

	return new Deep(this.M, this._left.tail(), this._middle, this._right);
};

Deep.prototype.init = function () {
	if (this._right instanceof One) {
		if (this._middle.isEmpty()) {
			return _from_digit(this.M, this._left);
		}

		return new Deep(
			this.M,
			this._left,
			delay(() => this._middle.init()),
			this._middle.last()._digit(),
		);
	}

	return new Deep(this.M, this._left, this._middle, this._right.init());
};

Deep.prototype.cons = function (value) {
	if (this._left instanceof Four) {
		return new Deep(
			this.M,
			new Two(value, this._left.head()),
			this._middle.cons(this._left.tail()._node(this.M)),
			this._right,
		);
	}

	return new Deep(this.M, this._left.cons(value), this._middle, this._right);
};

Deep.prototype.push = function (value) {
	if (this._right instanceof Four) {
		return new Deep(
			this.M,
			this._left,
			this._middle.push(this._right.init()._node(this.M)),
			new Two(this._right.last(), value),
		);
	}

	return new Deep(this.M, this._left, this._middle, this._right.push(value));
};

Deep.prototype.append = function (iterable) {
	const it = iterable[Symbol.iterator]();

	let event = it.next();
	if (event.done) return this;
	const a = event.value;

	event = it.next();
	if (event.done) return this.push(a);
	const b = event.value;

	// TODO simplify
	const middle = _append_small_list(
		this._middle,
		this._right._nodes(this.M, new One(a)),
	);

	return _fill_right(this.M, this._left, middle, b, it);
};

Deep.prototype.concat = function (other) {
	assert(other instanceof Tree);
	return other._concat_with_deep(this);
};

Deep.prototype[Symbol.iterator] = function* () {
	yield* this._left;
	for (const node of this._middle) yield* node;
	yield* this._right;
};

Deep.prototype.reversed = function* () {
	yield* this._right.reversed();
	for (const node of this._middle.reversed()) yield* node.reversed();
	yield* this._left.reversed();
};

/**
 * It is assumed that p(i+|this|) is true.
 */
Deep.prototype.splitTree = function (p, i) {
	assert(p(this.M.plus(i, this.measure())));

	const {_left, _middle, _right, M} = this;

	// See if the split point is inside the left tree
	const leftMeasure = M.plus(i, _left.measure(M));
	if (p(leftMeasure)) {
		const split = _left._splitDigit(p, i, M);
		return new Split(
			_from_small_list(M, split._left),
			split._middle,
			_deepL(M, split._right, _middle, _right),
		);
	}

	// See if the split point is inside the middle tree
	const midMeasure = M.plus(leftMeasure, _middle.measure());

	if (p(midMeasure)) {
		const midSplit = _middle.splitTree(p, leftMeasure);
		// Midsplit._middle is a Node since middle is a Tree ( Node a )
		const split = midSplit._middle
			._digit()
			._splitDigit(p, M.plus(leftMeasure, midSplit._left.measure()), M);
		return new Split(
			_deepR(M, _left, midSplit._left, split._left),
			split._middle,
			_deepL(M, split._right, midSplit._right, _right),
		);
	}

	// The split point is in the right tree
	const split = _right._splitDigit(p, midMeasure, M);
	return new Split(
		_deepR(M, _left, _middle, split._left),
		split._middle,
		_from_small_list(M, split._right),
	);
};

Deep.prototype.split = function (p) {
	if (p(this.measure())) {
		const split = this.splitTree(p, this.M.zero());
		return [split._left, split._right.cons(split._middle)];
	}

	return [this, new Empty(this.M)];
};

Deep.prototype._concat_with_deep = function (other) {
	assert(other instanceof Deep);
	assert(isSameMeasure(other.M, this.M));
	return new Deep(
		this.M,
		other._left,
		other._middle._app3(other._right._nodes(this.M, this._left), this._middle),
		this._right,
	);
};

Deep.prototype._app3 = function (list, other) {
	assert(other instanceof Tree);
	return other._app3_with_deep(list, this);
};

Deep.prototype._app3_with_empty = function (list) {
	return _prepend_small_list(this, list);
};

Deep.prototype._app3_with_single = function (list, value) {
	return _prepend_small_list(this, list).cons(value);
};

Deep.prototype._app3_with_deep = function (list, other) {
	assert(other instanceof Deep);
	assert(isSameMeasure(other.M, this.M));
	return new Deep(
		this.M,
		other._left,
		other._middle._app3(
			other._right._nodes_with_list(this.M, list, this._left),
			this._middle,
		),
		this._right,
	);
};

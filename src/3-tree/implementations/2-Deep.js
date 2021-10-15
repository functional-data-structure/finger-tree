import assert from 'assert';
import {Tree} from '../base/index.js';
import {deepL, deepR, CachedMeasure, Split} from '../../0-core/index.js';
import {One, Two, Three, Four} from '../../1-digit/index.js';
import Lazy from '../../4-lazy/Lazy.js';
import _prepend_small_list from '../../0-core/_fast/_prepend_small_list.js';
import _fill_right from '../../0-core/_fast/_fill_right.js';
import isSameMeasure from '../../_debug/isSameMeasure.js';
import _append_small_list from '../../0-core/_fast/_append_small_list.js';
import _from_by_filling from '../../0-core/_fast/_from_by_filling.js';
import empty from '../../5-api/empty.js';
import delayApp3RecurseStep from '../../4-lazy/delayApp3RecurseStep.js';
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
	return this._left._isolated_tail(this);
};

Deep.prototype.init = function () {
	return this._right._isolated_init(this);
};

Deep.prototype.cons = function (value) {
	return this._left._isolated_cons(this, value);
};

Deep.prototype.push = function (value) {
	return this._right._isolated_push(this, value);
};

Deep.prototype._UNSAFE_push = function (value) {
	return this._right._UNSAFE_push(this, value);
};

Deep.prototype.prepend = function (iterable) {
	return _from_by_filling(this.M, iterable).concat(this);
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
	)._copy_spine();
	// TODO _copy_spine should return a MutableDeep type on the spine
	// TODO then _fill_right should only accept Empty, Single, or MutableDeep

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

	// See if the split point is inside the left digit
	const leftMeasure = this.M.plus(i, this._left.measure(this.M));
	if (p(leftMeasure)) {
		const split = this._left._splitDigit(p, i, this.M);
		return new Split(
			split._left === null ? empty(this.M) : split._left._tree(this.M),
			split._middle,
			deepL(this.M, split._right, this._middle, this._right),
		);
	}

	// See if the split point is inside the middle tree
	const midMeasure = this.M.plus(leftMeasure, this._middle.measure());

	if (p(midMeasure)) {
		const midSplit = this._middle.splitTree(p, leftMeasure);
		// Midsplit._middle is a Node since middle is a Tree ( Node a )
		const split = midSplit._middle
			._digit()
			._splitDigit(
				p,
				this.M.plus(leftMeasure, midSplit._left.measure()),
				this.M,
			);
		return new Split(
			deepR(this.M, this._left, midSplit._left, split._left),
			split._middle,
			deepL(this.M, split._right, midSplit._right, this._right),
		);
	}

	// The split point is in the right digit
	const split = this._right._splitDigit(p, midMeasure, this.M);
	return new Split(
		deepR(this.M, this._left, this._middle, split._left),
		split._middle,
		split._right === null ? empty(this.M) : split._right._tree(this.M),
	);
};

Deep.prototype.split = function (p) {
	if (p(this.measure())) {
		const split = this.splitTree(p, this.M.zero());
		return [split._left, split._right.cons(split._middle)];
	}

	return [this, empty(this.M)];
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

Deep.prototype._copy_spine = function () {
	return new Deep(this.M, this._left, this._middle._copy_spine(), this._right);
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
		delayApp3RecurseStep(other, list, this),
		this._right,
	);
};

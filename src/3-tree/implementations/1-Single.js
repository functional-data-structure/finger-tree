import assert from 'assert';
import {Tree} from '../base/index.js';
import {cache, Split} from '../../0-core/index.js';
import {One} from '../../1-digit/index.js';
import _append_small_list from '../../0-core/_fast/_append_small_list.js';
import {_from_medium_list} from '../../0-core/_fast/_from_medium_list.js';
import isSameMeasure from '../../_debug/isSameMeasure.js';
import _from_by_filling from '../../0-core/_fast/_from_by_filling.js';
import {Empty, Deep} from './index.js';

export function Single(M, value) {
	this.M = M;
	this.a = value;
	this.v = M.measure(value);
}

Single.prototype = new Tree();

Single.prototype.measure = function () {
	return this.v;
};

Single.prototype.isEmpty = function () {
	return false;
};

Single.prototype.head = function () {
	return this.a;
};

Single.prototype.last = function () {
	return this.a;
};

Single.prototype.tail = function () {
	return new Empty(this.M);
};

Single.prototype.init = function () {
	return new Empty(this.M);
};

Single.prototype.cons = function (value) {
	return new Deep(
		this.M,
		new One(value),
		new Empty(cache(this.M)),
		new One(this.a),
	);
};

Single.prototype._UNSAFE_push =
	// eslint-disable-next-line no-multi-assign
	Single.prototype.push = function (value) {
		return new Deep(
			this.M,
			new One(this.a),
			new Empty(cache(this.M)),
			new One(value),
		);
	};

Single.prototype.prepend = function (iterable) {
	return _from_by_filling(this.M, iterable).push(this.a);
};

Single.prototype.append = function (iterable) {
	return _from_by_filling(this.M, iterable).cons(this.a);
};

Single.prototype.concat = function (other) {
	assert(other instanceof Tree);
	return other.cons(this.a);
};

Single.prototype[Symbol.iterator] =
	// eslint-disable-next-line no-multi-assign
	Single.prototype.reversed = function* () {
		yield this.a;
	};

/**
 * It is assumed that p(i+|this|) is true.
 */
Single.prototype.splitTree = function (_p, _i) {
	return new Split(new Empty(this.M), this.a, new Empty(this.M));
};

Single.prototype.split = function (p) {
	return p(this.measure())
		? [new Empty(this.M), this]
		: [this, new Empty(this.M)];
};

Single.prototype._copy_spine = function () {
	return this;
};

Single.prototype._concat_with_deep = function (other) {
	assert(other instanceof Deep);
	assert(isSameMeasure(other.M, this.M));
	return other.push(this.a);
};

Single.prototype._app3 = function (list, other) {
	assert(other instanceof Tree);
	return other._app3_with_single(list, this.a);
};

Single.prototype._app3_with_empty = function (list) {
	return _from_medium_list(this.M, list).push(this.a);
};

Single.prototype._app3_with_single = function (list, value) {
	return _from_medium_list(this.M, list).push(this.a).cons(value);
};

Single.prototype._app3_with_deep = function (list, other) {
	assert(other instanceof Deep);
	assert(isSameMeasure(other.M, this.M));
	return _append_small_list(other, list).push(this.a);
};

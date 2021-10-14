import assert from 'assert';
import {Tree} from '../base/index.js';
import {_EMPTY} from '../../0-core/index.js';
import {_from_medium_list} from '../../0-core/_fast/_from_medium_list.js';
import _append_small_list from '../../0-core/_fast/_append_small_list.js';
import {Single, Deep} from './index.js';

export function Empty(M) {
	this.M = M;
	this.v = M.zero();
}

Empty.prototype = new Tree();

Empty.prototype.measure = function () {
	return this.v;
};

Empty.prototype.isEmpty = function () {
	return true;
};

Empty.prototype.head = function () {
	throw new Error('cannot call head on Empty');
};

Empty.prototype.last = function () {
	throw new Error('cannot call last on Empty');
};

Empty.prototype.tail = function () {
	return this;
};

Empty.prototype.init = function () {
	return this;
};

Empty.prototype.push = function (value) {
	return new Single(this.M, value);
};

Empty.prototype.cons = function (value) {
	return new Single(this.M, value);
};

Empty.prototype.concat = function (other) {
	return other;
};

Empty.prototype[Symbol.iterator] = function () {
	return _EMPTY;
};

Empty.prototype.reversed = function* () {};

/**
 * It is assumed that p(i+|this|) is true.
 */
Empty.prototype.splitTree = function (_p, _i) {
	throw new Error('splitTree not implemented in Empty');
};

Empty.prototype.split = function (_p) {
	return [this, this];
};

Empty.prototype._concat_with_deep = function (other) {
	assert(other instanceof Deep);
	return other;
};

Empty.prototype._app3 = function (list, other) {
	assert(other instanceof Tree);
	return other._app3_with_empty(list);
};

Empty.prototype._app3_with_empty = function (list) {
	return _from_medium_list(this.M, list);
};

Empty.prototype._app3_with_single = function (list, value) {
	return _from_medium_list(this.M, list).cons(value);
};

Empty.prototype._app3_with_deep = function (list, other) {
	assert(other instanceof Deep);
	return _append_small_list(other, list);
};

import {Tree} from '../base';
import {Single} from '.';
import {_EMPTY} from '../../0-core';

export function Empty(M) {
	this.M = M;
	this.v = M.zero();
}

Empty.prototype = new Tree();

Empty.prototype.measure = function () {
	return this.v;
};

Empty.prototype.empty = function () {
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

/**
 * It is assumed that p(|this|) is true.
 */
Empty.prototype.splitTree = function (p, i) {
	throw new Error('splitTree not implemented in Empty');
};

Empty.prototype.split = function (p) {
	return [this, this];
};

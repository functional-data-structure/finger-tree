import {Tree} from '../base/index.js';
import {Single} from './index.js';
import {_EMPTY} from '../../0-core/index.js';

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

/**
 * It is assumed that p(i+|this|) is true.
 */
Empty.prototype.splitTree = function (_p, _i) {
	throw new Error('splitTree not implemented in Empty');
};

Empty.prototype.split = function (_p) {
	return [this, this];
};

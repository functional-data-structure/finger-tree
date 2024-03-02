import assert from 'assert';

import {Split} from '../0-core/index.js';
import {node2, node3} from '../2-node/index.js';

import {Digit, Two, Three} from './index.js';

export function One(a) {
	this.a = a;
	this.v = null;
}

One.prototype = new Digit();

One.prototype.measure = function (M) {
	if (this.v === null) this.v = M.measure(this.a);
	return this.v;
};

One.prototype.head = function () {
	return this.a;
};

One.prototype.last = function () {
	return this.a;
};

One.prototype.init = function () {
	throw new Error('cannot call init on digit One');
};

One.prototype.tail = function () {
	throw new Error('cannot call tail on digit One');
};

One.prototype.push = function (value) {
	return new Two(this.a, value);
};

One.prototype.cons = function (value) {
	return new Two(value, this.a);
};

One.prototype.node = function (_M) {
	throw new Error('cannot convert One to node');
};

/**
 * It is assumed that p(i+|this|) is true.
 */
One.prototype.splitDigit = function (p, i, M) {
	assert(p(M.plus(i, this.measure(M)))); // /!\ Potential Heisenbug generator.
	return new Split([], this.a, []);
};

One.prototype._nodes = function (M, other) {
	if (other instanceof One) return [node2(M, this.a, other.a)];
	if (other instanceof Two) return [node3(M, this.a, other.a, other.b)];
	if (other instanceof Three)
		return [node2(M, this.a, other.a), node2(M, other.b, other.c)];
	assert(other instanceof Digit);
	return [node3(M, this.a, other.a, other.b), node2(M, other.c, other.d)];
};

One.prototype._list = function () {
	return [this.a];
};

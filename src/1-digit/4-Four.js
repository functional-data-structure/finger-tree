import assert from 'assert';

import {Split} from '../0-core/index.js';
import {node2, node3} from '../2-node/index.js';

import {Digit, One, Two, Three} from './index.js';

export function Four(a, b, c, d) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.v = null;
}

Four.prototype = new Digit();

Four.prototype.measure = function (M) {
	if (this.v === null)
		this.v = M.plus(
			M.measure(this.a),
			M.plus(M.measure(this.b), M.plus(M.measure(this.c), M.measure(this.d))),
		);
	return this.v;
};

Four.prototype.head = function () {
	return this.a;
};

Four.prototype.last = function () {
	return this.d;
};

Four.prototype.init = function () {
	return new Three(this.a, this.b, this.c);
};

Four.prototype.tail = function () {
	return new Three(this.b, this.c, this.d);
};

Four.prototype.push = function (_value) {
	throw new Error('cannot push digit Four');
};

Four.prototype.cons = function (_value) {
	throw new Error('cannot cons digit Four');
};

Four.prototype.node = function (_M) {
	throw new Error('cannot convert Four to node');
};

/**
 * It is assumed that p(i+|this|) is true.
 */
Four.prototype.splitDigit = function (p, i, M) {
	assert(p(M.plus(i, this.measure(M)))); // /!\ Potential Heisenbug generator.
	i = M.plus(i, M.measure(this.a));
	if (p(i)) return new Split([], this.a, [this.b, this.c, this.d]);
	i = M.plus(i, M.measure(this.b));
	if (p(i)) return new Split([this.a], this.b, [this.c, this.d]);
	i = M.plus(i, M.measure(this.c));
	if (p(i)) return new Split([this.a, this.b], this.c, [this.d]);
	return new Split([this.a, this.b, this.c], this.d, []);
};

Four.prototype._nodes = function (M, other) {
	if (other instanceof One)
		return [node3(M, this.a, this.b, this.c), node2(M, this.d, other.a)];
	if (other instanceof Two)
		return [
			node3(M, this.a, this.b, this.c),
			node3(M, this.d, other.a, other.b),
		];
	if (other instanceof Three)
		return [
			node3(M, this.a, this.b, this.c),
			node2(M, this.d, other.a),
			node2(M, other.b, other.c),
		];
	assert(other instanceof Four);
	return [
		node3(M, this.a, this.b, this.c),
		node3(M, this.d, other.a, other.b),
		node2(M, other.c, other.d),
	];
};

Four.prototype._list = function () {
	return [this.a, this.b, this.c, this.d];
};

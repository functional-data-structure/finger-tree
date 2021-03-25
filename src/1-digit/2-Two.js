import {Digit, One, Three} from './index.js';
import {node2, node3} from '../2-node/index.js';
import {Split} from '../0-core/index.js';

import assert from 'assert';

export function Two(a, b) {
	this.a = a;
	this.b = b;
	this.v = null;
}

Two.prototype = new Digit();

Two.prototype.measure = function (M) {
	if (this.v === null) this.v = M.plus(M.measure(this.a), M.measure(this.b));
	return this.v;
};

Two.prototype.head = function () {
	return this.a;
};

Two.prototype.last = function () {
	return this.b;
};

Two.prototype.init = function () {
	return new One(this.a);
};

Two.prototype.tail = function () {
	return new One(this.b);
};

Two.prototype.push = function (value) {
	return new Three(this.a, this.b, value);
};

Two.prototype.cons = function (value) {
	return new Three(value, this.a, this.b);
};

Two.prototype.node = function (_M) {
	throw new Error(
		'Two should never be converted to Node2 with current implementation',
	);
};

/**
 * It is assumed that p(i+|this|) is true.
 */
Two.prototype.splitDigit = function (p, i, M) {
	assert(p(M.plus(i, this.measure(M)))); // /!\ Potential Heisenbug generator.
	i = M.plus(i, M.measure(this.a));
	if (p(i)) return new Split([], this.a, [this.b]);
	return new Split([this.a], this.b, []);
};

Two.prototype._nodes = function (M, other) {
	if (other instanceof One) return [node3(M, this.a, this.b, other.a)];
	if (other instanceof Two)
		return [node2(M, this.a, this.b), node2(M, other.a, other.b)];
	if (other instanceof Three)
		return [node3(M, this.a, this.b, other.a), node2(M, other.b, other.c)];
	assert(other instanceof Digit);
	return [
		node3(M, this.a, this.b, other.a),
		node3(M, other.b, other.c, other.d),
	];
};

Two.prototype._list = function () {
	return [this.a, this.b];
};

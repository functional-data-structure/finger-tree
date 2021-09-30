import assert from 'assert';
import {cache} from '../0-core/measure/cache.js';
import {DigitSplit} from '../0-core/split/DigitSplit.js';
import {node2, node3} from '../2-node/index.js';
import {Empty} from '../3-tree/implementations/0-Empty.js';
import {Deep} from '../3-tree/implementations/2-Deep.js';
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

Four.prototype._node = function (_M) {
	throw new Error('cannot convert Four to node');
};

Four.prototype._tree = function (M) {
	return new Deep(
		M,
		new Two(this.a, this.b),
		new Empty(cache(M)),
		new Two(this.c, this.d),
	);
};

/**
 * It is assumed that p(i+|this|) is true.
 */
Four.prototype._splitDigit = function (p, i, M) {
	assert(p(M.plus(i, this.measure(M)))); // /!\ Potential Heisenbug generator.
	i = M.plus(i, M.measure(this.a));
	if (p(i))
		return new DigitSplit(null, this.a, new Three(this.b, this.c, this.d));
	i = M.plus(i, M.measure(this.b));
	if (p(i))
		return new DigitSplit(new One(this.a), this.b, new Two(this.c, this.d));
	i = M.plus(i, M.measure(this.c));
	if (p(i))
		return new DigitSplit(new Two(this.a, this.b), this.c, new One(this.d));
	return new DigitSplit(new Three(this.a, this.b, this.c), this.d, null);
};

Four.prototype._nodes = function (M, other) {
	return other._nodes_with_four(M, this);
};

Four.prototype._nodes_with_one = function (M, other) {
	assert(other instanceof One);
	return [node3(M, other.a, this.a, this.b), node2(M, this.c, this.d)];
};

Four.prototype._nodes_with_two = function (M, other) {
	assert(other instanceof Two);
	return [node3(M, other.a, other.b, this.a), node3(M, this.b, this.c, this.d)];
};

Four.prototype._nodes_with_three = function (M, other) {
	assert(other instanceof Three);
	return [
		node3(M, other.a, other.b, other.c),
		node2(M, this.a, this.b),
		node2(M, this.c, this.d),
	];
};

Four.prototype._nodes_with_four = function (M, other) {
	assert(other instanceof Four);
	return [
		node3(M, other.a, other.b, other.c),
		node2(M, other.d, this.a),
		node3(M, this.b, this.c, this.d),
	];
};

Four.prototype._nodes_with_list = function (M, list, other) {
	return other._nodes_with_list_and_four(M, list, this);
};

Four.prototype._nodes_with_list_and_one = function (M, list, other) {
	assert(other instanceof One);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [
				node3(M, other.a, list[0], this.a),
				node3(M, this.b, this.c, this.d),
			];
		case 2:
			return [
				node2(M, other.a, list[0]),
				node3(M, list[1], this.a, this.b),
				node2(M, this.c, this.d),
			];
		case 3:
			return [
				node3(M, other.a, list[0], list[1]),
				node2(M, list[2], this.a),
				node3(M, this.b, this.c, this.d),
			];
		case 4:
			return [
				node3(M, other.a, list[0], list[1]),
				node3(M, list[2], list[3], this.a),
				node3(M, this.b, this.c, this.d),
			];
	}
};

Four.prototype._nodes_with_list_and_two = function (M, list, other) {
	assert(other instanceof Two);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [
				other._node(M),
				node3(M, list[0], this.a, this.b),
				node2(M, this.c, this.d),
			];
		case 2:
			return [
				other._node(M),
				node3(M, list[0], list[1], this.a),
				node3(M, this.b, this.c, this.d),
			];
		case 3:
			return [
				node3(M, other.a, other.b, list[0]),
				node3(M, list[1], list[2], this.a),
				node3(M, this.b, this.c, this.d),
			];
		case 4:
			return [
				other._node(M),
				node3(M, list[0], list[1], list[2]),
				node3(M, list[3], this.a, this.b),
				node2(M, this.c, this.d),
			];
	}
};

Four.prototype._nodes_with_list_and_three = function (M, list, other) {
	assert(other instanceof Three);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [
				other._node(M),
				node2(M, list[0], this.a),
				node3(M, this.b, this.c, this.d),
			];
		case 2:
			return [
				other._node(M),
				node3(M, list[0], list[1], this.a),
				node3(M, this.b, this.c, this.d),
			];
		case 3:
			return [
				other._node(M),
				node2(M, list[0], list[1]),
				node2(M, list[2], this.a),
				node3(M, this.b, this.c, this.d),
			];
		case 4:
			return [
				other._node(M),
				node2(M, list[0], list[1]),
				node3(M, list[2], list[3], this.a),
				node3(M, this.b, this.c, this.d),
			];
	}
};

Four.prototype._nodes_with_list_and_four = function (M, list, other) {
	assert(other instanceof Four);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [
				node3(M, other.a, other.b, other.c),
				node3(M, other.d, list[0], this.a),
				node3(M, this.b, this.c, this.d),
			];
		case 2:
			return [
				node2(M, other.a, other.b),
				node3(M, other.c, other.d, list[0]),
				node3(M, list[1], this.a, this.b),
				node2(M, this.c, this.d),
			];
		case 3:
			return [
				node2(M, other.a, other.b),
				node3(M, other.c, other.d, list[0]),
				node3(M, list[1], list[2], this.a),
				node3(M, this.b, this.c, this.d),
			];
		case 4:
			return [
				node3(M, other.a, other.b, other.c),
				node3(M, other.d, list[0], list[1]),
				node3(M, list[2], list[3], this.a),
				node3(M, this.b, this.c, this.d),
			];
	}
};

Four.prototype._list = function () {
	return [this.a, this.b, this.c, this.d];
};

import assert from 'assert';
import {node2, node3} from '../2-node/index.js';
import {DigitSplit} from '../0-core/split/DigitSplit.js';
import {Single} from '../3-tree/implementations/1-Single.js';
import {Deep} from '../3-tree/implementations/2-Deep.js';
import {Digit, Two, Three, Four} from './index.js';

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

One.prototype._node = function (_M) {
	throw new Error('cannot convert One to node');
};

One.prototype._tree = function (M) {
	return new Single(M, this.a);
};

/**
 * It is assumed that p(i+|this|) is true.
 */
One.prototype._splitDigit = function (p, i, M) {
	assert(p(M.plus(i, this.measure(M)))); // /!\ Potential Heisenbug generator.
	return new DigitSplit(null, this.a, null);
};

One.prototype._nodes = function (M, other) {
	return other._nodes_with_one(M, this);
};

One.prototype._nodes_with_one = function (M, other) {
	assert(other instanceof One);
	return [node2(M, other.a, this.a)];
};

One.prototype._nodes_with_two = function (M, other) {
	assert(other instanceof Two);
	return [node3(M, other.a, other.b, this.a)];
};

One.prototype._nodes_with_three = function (M, other) {
	assert(other instanceof Three);
	return [node2(M, other.a, other.b), node2(M, other.c, this.a)];
};

One.prototype._nodes_with_four = function (M, other) {
	assert(other instanceof Four);
	return [node3(M, other.a, other.b, other.c), node2(M, other.d, this.a)];
};

One.prototype._nodes_with_list = function (M, list, other) {
	return other._nodes_with_list_and_one(M, list, this);
};

One.prototype._nodes_with_list_and_one = function (M, list, other) {
	assert(other instanceof One);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [node3(M, other.a, list[0], this.a)];
		case 2:
			return [node2(M, other.a, list[0]), node2(M, list[1], this.a)];
		case 3:
			return [node3(M, other.a, list[0], list[1]), node2(M, list[2], this.a)];
		case 4:
			return [
				node3(M, other.a, list[0], list[1]),
				node3(M, list[2], list[3], this.a),
			];
	}
};

One.prototype._nodes_with_list_and_two = function (M, list, other) {
	assert(other instanceof Two);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [other._node(M), node2(M, list[0], this.a)];
		case 2:
			return [other._node(M), node3(M, list[0], list[1], this.a)];
		case 3:
			return [
				node3(M, other.a, other.b, list[0]),
				node3(M, list[1], list[2], this.a),
			];
		case 4:
			return [
				other._node(M),
				node3(M, list[0], list[1], list[2]),
				node2(M, list[3], this.a),
			];
	}
};

One.prototype._nodes_with_list_and_three = function (M, list, other) {
	assert(other instanceof Three);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [other._node(M), node2(M, list[0], this.a)];
		case 2:
			return [other._node(M), node3(M, list[0], list[1], this.a)];
		case 3:
			return [
				other._node(M),
				node2(M, list[0], list[1]),
				node2(M, list[2], this.a),
			];
		case 4:
			return [
				other._node(M),
				node2(M, list[0], list[1]),
				node3(M, list[2], list[3], this.a),
			];
	}
};

One.prototype._nodes_with_list_and_four = function (M, list, other) {
	assert(other instanceof Four);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [
				node3(M, other.a, other.b, other.c),
				node3(M, other.d, list[0], this.a),
			];
		case 2:
			return [
				node2(M, other.a, other.b),
				node3(M, other.c, other.d, list[0]),
				node2(M, list[1], this.a),
			];
		case 3:
			return [
				node3(M, other.a, other.b, other.c),
				node2(M, other.d, list[0]),
				node3(M, list[1], list[2], this.a),
			];
		case 4:
			return [
				node3(M, other.a, other.b, other.c),
				node3(M, other.d, list[0], list[1]),
				node3(M, list[2], list[3], this.a),
			];
	}
};

One.prototype._list = function () {
	return [this.a];
};

One.prototype._isolated_push = function (parent, value) {
	assert(parent._right === this);
	return new Deep(parent.M, parent._left, parent._middle, this.push(value));
};

One.prototype._UNSAFE_push = function (parent, value) {
	assert(parent._right === this);
	parent._right = this.push(value);
	return parent;
};

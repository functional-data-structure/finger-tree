import assert from 'assert';
import {Node2, node2, node3} from '../2-node/index.js';
import {Split} from '../0-core/index.js';
import {Digit, One, Three, Four} from './index.js';

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

Two.prototype.node = function (M) {
	return new Node2(this.measure(M), this.a, this.b);
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
	return other._nodes_with_two(M, this);
};

Two.prototype._nodes_with_one = function (M, other) {
	assert(other instanceof One);
	return [node3(M, other.a, this.a, this.b)];
};

Two.prototype._nodes_with_two = function (M, other) {
	assert(other instanceof Two);
	return [node2(M, other.a, other.b), node2(M, this.a, this.b)];
};

Two.prototype._nodes_with_three = function (M, other) {
	assert(other instanceof Three);
	return [node3(M, other.a, other.b, other.c), node2(M, this.a, this.b)];
};

Two.prototype._nodes_with_four = function (M, other) {
	assert(other instanceof Four);
	return [
		node3(M, other.a, other.b, other.c),
		node3(M, other.d, this.a, this.b),
	];
};

Two.prototype._nodes_with_list = function (M, list, other) {
	return other._nodes_with_list_and_two(M, list, this);
};

Two.prototype._nodes_with_list_and_one = function (M, list, other) {
	assert(other instanceof One);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [node2(M, other.a, list[0]), this.node(M)];
		case 2:
			return [node3(M, other.a, list[0], list[1]), this.node(M)];
		case 3:
			return [
				node2(M, other.a, list[0]),
				node2(M, list[1], list[2]),
				this.node(M),
			];
		case 4:
			return [
				node2(M, other.a, list[0]),
				node3(M, list[1], list[2], list[3]),
				this.node(M),
			];
	}
};

Two.prototype._nodes_with_list_and_two = function (M, list, other) {
	assert(other instanceof Two);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [node3(M, other.a, other.b, list[0]), node2(M, this.a, this.b)];
		case 2:
			return [other.node(M), node2(M, list[0], list[1]), this.node(M)];
		case 3:
			return [
				node2(M, other.a, other.b),
				node3(M, list[0], list[1], list[2]),
				node2(M, this.a, this.b),
			];
		case 4:
			return [
				node3(M, other.a, other.b, list[0]),
				node2(M, list[1], list[2]),
				node3(M, list[3], this.a, this.b),
			];
	}
};

Two.prototype._nodes_with_list_and_three = function (M, list, other) {
	assert(other instanceof Three);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [
				node3(M, other.a, other.b, other.c),
				node3(M, list[0], this.a, this.b),
			];
		case 2:
			return [
				node2(M, other.a, other.b),
				node3(M, other.c, list[0], list[1]),
				node2(M, this.a, this.b),
			];
		case 3:
			return [
				node3(M, other.a, other.b, other.c),
				node2(M, list[0], list[1]),
				node3(M, list[2], this.a, this.b),
			];
		case 4:
			return [
				node3(M, other.a, other.b, other.c),
				node3(M, list[0], list[1], list[2]),
				node3(M, list[3], this.a, this.b),
			];
	}
};

Two.prototype._nodes_with_list_and_four = function (M, list, other) {
	assert(other instanceof Four);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [
				node2(M, other.a, other.b),
				node3(M, other.c, other.d, list[0]),
				node2(M, this.a, this.b),
			];
		case 2:
			return [
				node3(M, other.a, other.b, other.c),
				node2(M, other.d, list[0]),
				node3(M, list[1], this.a, this.b),
			];
		case 3:
			return [
				node3(M, other.a, other.b, other.c),
				node3(M, other.d, list[0], list[1]),
				node3(M, list[2], this.a, this.b),
			];
		case 4:
			return [
				node2(M, other.a, other.b),
				node3(M, other.c, other.d, list[0]),
				node3(M, list[1], list[2], list[3]),
				node2(M, this.a, this.b),
			];
	}
};

Two.prototype._list = function () {
	return [this.a, this.b];
};

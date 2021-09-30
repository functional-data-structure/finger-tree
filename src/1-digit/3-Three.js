import assert from 'assert';
import {node2, Node3, node3} from '../2-node/index.js';
import {Split} from '../0-core/index.js';
import {Digit, One, Two, Four} from './index.js';

export function Three(a, b, c) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.v = null;
}

Three.prototype = new Digit();

Three.prototype.measure = function (M) {
	if (this.v === null)
		this.v = M.plus(
			M.measure(this.a),
			M.plus(M.measure(this.b), M.measure(this.c)),
		);
	return this.v;
};

Three.prototype.head = function () {
	return this.a;
};

Three.prototype.last = function () {
	return this.c;
};

Three.prototype.init = function () {
	return new Two(this.a, this.b);
};

Three.prototype.tail = function () {
	return new Two(this.b, this.c);
};

Three.prototype.push = function (value) {
	return new Four(this.a, this.b, this.c, value);
};

Three.prototype.cons = function (value) {
	return new Four(value, this.a, this.b, this.c);
};

Three.prototype._node = function (M) {
	return new Node3(this.measure(M), this.a, this.b, this.c);
};

/**
 * It is assumed that p(i+|this|) is true.
 */
Three.prototype._splitDigit = function (p, i, M) {
	assert(p(M.plus(i, this.measure(M)))); // /!\ Potential Heisenbug generator.
	i = M.plus(i, M.measure(this.a));
	if (p(i)) return new Split([], this.a, [this.b, this.c]);
	i = M.plus(i, M.measure(this.b));
	if (p(i)) return new Split([this.a], this.b, [this.c]);
	return new Split([this.a, this.b], this.c, []);
};

Three.prototype._nodes = function (M, other) {
	return other._nodes_with_three(M, this);
};

Three.prototype._nodes_with_one = function (M, other) {
	assert(other instanceof One);
	return [node2(M, other.a, this.a), node2(M, this.b, this.c)];
};

Three.prototype._nodes_with_two = function (M, other) {
	assert(other instanceof Two);
	return [other._node(M), this._node(M)];
};

Three.prototype._nodes_with_three = function (M, other) {
	assert(other instanceof Three);
	return [other._node(M), this._node(M)];
};

Three.prototype._nodes_with_four = function (M, other) {
	assert(other instanceof Four);
	return [
		node2(M, other.a, other.b),
		node2(M, other.c, other.d),
		this._node(M),
	];
};

Three.prototype._nodes_with_list = function (M, list, other) {
	return other._nodes_with_list_and_three(M, list, this);
};

Three.prototype._nodes_with_list_and_one = function (M, list, other) {
	assert(other instanceof One);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [node2(M, other.a, list[0]), this._node(M)];
		case 2:
			return [node3(M, other.a, list[0], list[1]), this._node(M)];
		case 3:
			return [
				node2(M, other.a, list[0]),
				node2(M, list[1], list[2]),
				this._node(M),
			];
		case 4:
			return [
				node3(M, other.a, list[0], list[1]),
				node2(M, list[2], list[3]),
				this._node(M),
			];
	}
};

Three.prototype._nodes_with_list_and_two = function (M, list, other) {
	assert(other instanceof Two);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [node3(M, other.a, other.b, list[0]), this._node(M)];
		case 2:
			return [other._node(M), node2(M, list[0], list[1]), this._node(M)];
		case 3:
			return [
				other._node(M),
				node3(M, list[0], list[1], list[2]),
				this._node(M),
			];
		case 4:
			return [
				node3(M, other.a, other.b, list[0]),
				node3(M, list[1], list[2], list[3]),
				this._node(M),
			];
	}
};

Three.prototype._nodes_with_list_and_three = function (M, list, other) {
	assert(other instanceof Three);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [
				node2(M, other.a, other.b),
				node2(M, other.c, list[0]),
				this._node(M),
			];
		case 2:
			return [other._node(M), node2(M, list[0], list[1]), this._node(M)];
		case 3:
			return [
				other._node(M),
				node3(M, list[0], list[1], list[2]),
				this._node(M),
			];
		case 4:
			return [
				other._node(M),
				node2(M, list[0], list[1]),
				node2(M, list[2], list[3]),
				this._node(M),
			];
	}
};

Three.prototype._nodes_with_list_and_four = function (M, list, other) {
	assert(other instanceof Four);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return [
				node2(M, other.a, other.b),
				node3(M, other.c, other.d, list[0]),
				this._node(M),
			];
		case 2:
			return [
				node3(M, other.a, other.b, other.c),
				node3(M, other.d, list[0], list[1]),
				this._node(M),
			];
		case 3:
			return [
				node2(M, other.a, other.b),
				node2(M, other.c, other.d),
				node3(M, list[0], list[1], list[2]),
				this._node(M),
			];
		case 4:
			return [
				node3(M, other.a, other.b, other.c),
				node2(M, other.d, list[0]),
				node3(M, list[1], list[2], list[3]),
				this._node(M),
			];
	}
};

Three.prototype._list = function () {
	return [this.a, this.b, this.c];
};

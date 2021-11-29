import {Tree} from '../3-tree/base/Tree.js';

export function Lazy(thunk) {
	this.tree = null;
	this.thunk = thunk;
}

Lazy.prototype = new Tree();

Lazy.prototype.force = function () {
	if (this.tree === null) {
		this.tree = this.thunk();
		this.thunk = null;
	}

	return this.tree;
};

Lazy.prototype.isEmpty = function () {
	return this.force().isEmpty();
};

Lazy.prototype.measure = function () {
	return this.force().measure();
};

Lazy.prototype.head = function () {
	return this.force().head();
};

Lazy.prototype.last = function () {
	return this.force().last();
};

Lazy.prototype.cons = function (value) {
	return this.force().cons(value);
};

Lazy.prototype.push = function (value) {
	return this.force().push(value);
};

Lazy.prototype.tail = function () {
	return this.force().tail();
};

Lazy.prototype.init = function () {
	return this.force().init();
};

Lazy.prototype.splitTree = function (p, i) {
	return this.force().splitTree(p, i);
};

Lazy.prototype.split = function (p) {
	return this.force().split(p);
};

Lazy.prototype.append = function (iterable) {
	return this.force().append(iterable);
};

Lazy.prototype.concat = function (other) {
	return this.force().concat(other);
};

Lazy.prototype[Symbol.iterator] = function () {
	return this.force()[Symbol.iterator]();
};

Lazy.prototype.reversed = function () {
	return this.force().reversed();
};

Lazy.prototype._concat_with_deep = function (other) {
	return this.force()._concat_with_deep(other);
};

Lazy.prototype._app3 = function (list, other) {
	return this.force()._app3(list, other);
};

Lazy.prototype._app3_with_empty = function (list) {
	return this.force()._app3_with_empty(list);
};

Lazy.prototype._app3_with_single = function (list, value) {
	return this.force()._app3_with_single(list, value);
};

Lazy.prototype._app3_with_deep = function (list, other) {
	return this.force()._app3_with_deep(list, other);
};

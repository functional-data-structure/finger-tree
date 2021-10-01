import {Tree} from '../3-tree/base/Tree.js';

export function Lazy(thunk) {
	this._tree = null;
	this._thunk = thunk;
}

Lazy.prototype = new Tree();

Lazy.prototype._force = function () {
	if (this._tree === null) {
		this._tree = this._thunk();
		this._thunk = null;
	}

	return this._tree;
};

Lazy.prototype.isEmpty = function () {
	return this._force().isEmpty();
};

Lazy.prototype.measure = function () {
	return this._force().measure();
};

Lazy.prototype.head = function () {
	return this._force().head();
};

Lazy.prototype.last = function () {
	return this._force().last();
};

Lazy.prototype.cons = function (value) {
	return this._force().cons(value);
};

Lazy.prototype.push = function (value) {
	return this._force().push(value);
};

Lazy.prototype._UNSAFE_push = function (value) {
	return this._force()._UNSAFE_push(value);
};

Lazy.prototype.tail = function () {
	return this._force().tail();
};

Lazy.prototype.init = function () {
	return this._force().init();
};

Lazy.prototype.splitTree = function (p, i) {
	return this._force().splitTree(p, i);
};

Lazy.prototype.split = function (p) {
	return this._force().split(p);
};

Lazy.prototype.append = function (iterable) {
	return this._force().append(iterable);
};

Lazy.prototype.concat = function (other) {
	return this._force().concat(other);
};

Lazy.prototype[Symbol.iterator] = function () {
	return this._force()[Symbol.iterator]();
};

Lazy.prototype.reversed = function () {
	return this._force().reversed();
};

Lazy.prototype._concat_with_deep = function (other) {
	return this._force()._concat_with_deep(other);
};

Lazy.prototype._app3 = function (list, other) {
	return this._force()._app3(list, other);
};

Lazy.prototype._app3_with_empty = function (list) {
	return this._force()._app3_with_empty(list);
};

Lazy.prototype._app3_with_single = function (list, value) {
	return this._force()._app3_with_single(list, value);
};

Lazy.prototype._app3_with_deep = function (list, other) {
	return this._force()._app3_with_deep(list, other);
};

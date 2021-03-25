import {Two} from '../1-digit/index.js';

export function Node2(v, a, b) {
	this.v = v;
	this.a = a;
	this.b = b;
}

Node2.prototype[Symbol.iterator] = function () {
	return [this.a, this.b][Symbol.iterator]();
};

Node2.prototype.reversed = function () {
	return [this.b, this.a][Symbol.iterator]();
};

Node2.prototype.measure = function () {
	return this.v;
};

Node2.prototype.digit = function () {
	return new Two(this.a, this.b);
};

Node2.prototype.head = function () {
	throw new Error('trying to call head of Node2');
};

Node2.prototype.last = function () {
	throw new Error('trying to call last of Node2');
};

Node2.prototype.init = function () {
	throw new Error('trying to call init of Node2');
};

Node2.prototype.tail = function () {
	throw new Error('trying to call tail of Node2');
};

Node2.prototype.push = function (_value) {
	throw new Error('trying to call push of Node2');
};

Node2.prototype.cons = function (_value) {
	throw new Error('trying to call cons of Node2');
};

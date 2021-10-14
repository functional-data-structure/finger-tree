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

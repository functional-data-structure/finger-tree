import {Three} from '../1-digit/index.js';

export function Node3(v, a, b, c) {
	this.v = v;
	this.a = a;
	this.b = b;
	this.c = c;
}

Node3.prototype[Symbol.iterator] = function () {
	return [this.a, this.b, this.c][Symbol.iterator]();
};

Node3.prototype.reversed = function () {
	return [this.c, this.b, this.a][Symbol.iterator]();
};

Node3.prototype.measure = function () {
	return this.v;
};

Node3.prototype._digit = function () {
	return new Three(this.a, this.b, this.c);
};

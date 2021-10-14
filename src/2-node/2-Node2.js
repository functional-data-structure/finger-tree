import {Two} from '../1-digit/index.js';

export function Node2(v, a, b) {
	this.v = v;
	this.a = a;
	this.b = b;
}

Node2.prototype.measure = function () {
	return this.v;
};

Node2.prototype._digit = function () {
	return new Two(this.a, this.b);
};

Node2.prototype._forward = function (level, iterator) {
	iterator._level.push(level);
	iterator._stack.push(this.b);
	return this.a;
};

Node2.prototype._backward = function (level, iterator) {
	iterator._level.push(level);
	iterator._stack.push(this.a);
	return this.b;
};

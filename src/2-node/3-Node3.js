import {Three} from '../1-digit/3-Three.js';

export function Node3(v, a, b, c) {
	this.v = v;
	this.a = a;
	this.b = b;
	this.c = c;
}

Node3.prototype.measure = function () {
	return this.v;
};

Node3.prototype._digit = function () {
	return new Three(this.a, this.b, this.c);
};

Node3.prototype._forward = function (level, iterator) {
	iterator._level.push(level, level);
	iterator._stack.push(this.c, this.b);
	return this.a;
};

Node3.prototype._backward = function (level, iterator) {
	iterator._level.push(level, level);
	iterator._stack.push(this.a, this.b);
	return this.c;
};

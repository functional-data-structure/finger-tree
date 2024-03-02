import {cache, Split} from '../../0-core/index.js';
import {One} from '../../1-digit/index.js';
import {Tree} from '../base/index.js';

import {Empty, Deep} from './index.js';

export function Single(M, value) {
	this.M = M;
	this.a = value;
	this.v = M.measure(value);
}

Single.prototype = new Tree();

Single.prototype.measure = function () {
	return this.v;
};

Single.prototype.isEmpty = function () {
	return false;
};

Single.prototype.head = function () {
	return this.a;
};

Single.prototype.last = function () {
	return this.a;
};

Single.prototype.tail = function () {
	return new Empty(this.M);
};

Single.prototype.init = function () {
	return new Empty(this.M);
};

Single.prototype.cons = function (value) {
	return new Deep(
		this.M,
		new One(value),
		new Empty(cache(this.M)),
		new One(this.a),
	);
};

Single.prototype.push = function (value) {
	return new Deep(
		this.M,
		new One(this.a),
		new Empty(cache(this.M)),
		new One(value),
	);
};

Single.prototype.concat = function (other) {
	return other.cons(this.a);
};

Single.prototype[Symbol.iterator] =
	// eslint-disable-next-line no-multi-assign
	Single.prototype.reversed = function* () {
		yield this.a;
	};

/**
 * It is assumed that p(i+|this|) is true.
 */
Single.prototype.splitTree = function (_p, _i) {
	return new Split(new Empty(this.M), this.a, new Empty(this.M));
};

Single.prototype.split = function (p) {
	return p(this.measure())
		? [new Empty(this.M), this]
		: [this, new Empty(this.M)];
};

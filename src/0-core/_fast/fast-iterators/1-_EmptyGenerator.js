export function _EmptyGenerator() {}

_EmptyGenerator.prototype.next = function () {
	return {done: true};
};

_EmptyGenerator.prototype[Symbol.iterator] = function () {
	return this;
};

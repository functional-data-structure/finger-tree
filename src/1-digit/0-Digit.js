export function Digit() {}

Digit.prototype[Symbol.iterator] = function () {
	return this._list()[Symbol.iterator]();
};

Digit.prototype.reversed = function () {
	return this._list().reverse()[Symbol.iterator]();
};

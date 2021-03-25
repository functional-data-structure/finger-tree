import {nodes} from '../0-core/index.js';

export function Digit() {}

Digit.prototype._concat = function (list, other) {
	return this._list().concat(list).concat(other._list());
};

Digit.prototype._nodes_with_list = function (M, list, other) {
	return nodes(M, this._concat(list, other));
};

Digit.prototype[Symbol.iterator] = function () {
	return this._list()[Symbol.iterator]();
};

Digit.prototype.reversed = function () {
	return this._list().reverse()[Symbol.iterator]();
};

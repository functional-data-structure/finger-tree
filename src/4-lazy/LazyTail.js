import Lazy from './Lazy.js';

export default function LazyTail(middle) {
	this._tree = null;
	this._middle = middle;
}

LazyTail.prototype = new Lazy();

LazyTail.prototype._force = function () {
	if (this._tree === null) {
		this._tree = this._middle.tail();
		this._middle = null;
	}

	return this._tree;
};

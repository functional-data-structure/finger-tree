import Lazy from './Lazy.js';

export default function LazyInit(middle) {
	this._tree = null;
	this._middle = middle;
}

LazyInit.prototype = new Lazy();

LazyInit.prototype._force = function () {
	if (this._tree === null) {
		this._tree = this._middle.init();
		this._middle = null;
	}

	return this._tree;
};

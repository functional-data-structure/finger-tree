import Lazy from './Lazy.js';

export default function LazyApp3RecurseStep(left, middle, right) {
	this._tree = null;
	this._left = left;
	this._middle = middle;
	this._right = right;
}

LazyApp3RecurseStep.prototype = new Lazy();

LazyApp3RecurseStep.prototype._force = function () {
	if (this._tree === null) {
		this._tree = this._left._middle._app3(
			this._left._right._nodes_with_list(
				this._left.M,
				this._middle,
				this._right._left,
			),
			this._right._middle,
		);
		this._left = null;
		this._middle = null;
		this._right = null;
	}

	return this._tree;
};

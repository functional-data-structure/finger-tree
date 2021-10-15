import assert from 'assert';
import {Node2} from '../../../2-node/2-Node2.js';
import {Node3} from '../../../2-node/3-Node3.js';
import {Deep} from '../../../3-tree/implementations/2-Deep.js';
import DeepIterator, {DOWNWARD} from './DeepIterator.js';

/**
 * BackwardIterator.
 *
 * @param {Deep} tree
 */
export default function BackwardIterator(tree) {
	assert(tree instanceof Deep);
	this._stack = tree._right._list();
	this._level = this._stack.map(() => 0);
	this._tree = tree;
	this._direction = DOWNWARD;
	this._currentLevel = 0;
	this._treeStack = [];
}

BackwardIterator.prototype = new DeepIterator();

BackwardIterator.prototype._downwardStep = function () {
	this._stack = this._tree._right._list();
};

BackwardIterator.prototype._upwardStep = function () {
	this._stack = this._tree._left._list();
};

BackwardIterator.prototype._traverse = function (level, x) {
	if (x instanceof Node3) {
		this._level.push(level, level);
		this._stack.push(x.a, x.b);
		return x.c;
	}

	assert(x instanceof Node2);
	this._level.push(level);
	this._stack.push(x.a);
	return x.b;
};

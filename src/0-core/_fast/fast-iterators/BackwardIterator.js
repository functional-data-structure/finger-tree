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
	this._stack = [];
	this._level = [];
	this._direction = DOWNWARD;
	this._currentLevel = 0;
	this._treeStack = [tree];
}

BackwardIterator.prototype = new DeepIterator();

BackwardIterator.prototype._downwardStep = function (tree) {
	tree._right._backward(this);
};

BackwardIterator.prototype._upwardStep = function () {
	this._treeStack.pop()._left._backward(this);
};

BackwardIterator.prototype._traverse = function (level, x) {
	assert(Number.isInteger(level) && level >= 0);
	assert(x instanceof Node2 || x instanceof Node3);
	return x._backward(level, this);
};

import assert from 'assert';
import {Node2} from '../../../2-node/2-Node2.js';
import {Node3} from '../../../2-node/3-Node3.js';
import {Deep} from '../../../3-tree/implementations/2-Deep.js';
import DeepIterator, {DOWNWARD} from './DeepIterator.js';

/**
 * ForwardIterator.
 *
 * @param {Deep} tree
 */
export default function ForwardIterator(tree) {
	assert(tree instanceof Deep);
	this._stack = [];
	this._level = [];
	this._direction = DOWNWARD;
	this._currentLevel = 0;
	this._treeStack = [tree];
}

ForwardIterator.prototype = new DeepIterator();

ForwardIterator.prototype._downwardStep = function (tree) {
	tree._left._forward(this);
};

ForwardIterator.prototype._upwardStep = function () {
	this._treeStack.pop()._right._forward(this);
};

ForwardIterator.prototype._traverse = function (level, x) {
	assert(Number.isInteger(level) && level >= 0);
	assert(x instanceof Node2 || x instanceof Node3);
	return x._forward(level, this);
};

import assert from 'assert';
import {Empty} from '../../../3-tree/implementations/0-Empty.js';
import {Single} from '../../../3-tree/implementations/1-Single.js';
import {Deep} from '../../../3-tree/implementations/2-Deep.js';

export const DOWNWARD = 0;
export const UPWARD = 1;

export default function DeepIterator() {}

DeepIterator.prototype._pop = function () {
	assert(this._stack.length >= 1);
	assert(this._stack.length === this._level.length);
	let x = this._stack.pop();
	let level = this._level.pop();

	for (;;) {
		assert(this._stack.length === this._level.length);
		assert(Number.isInteger(level) && level >= 0);
		if (level === 0) return {done: false, value: x};

		x = this._traverse(--level, x);
	}
};

DeepIterator.prototype.next = function () {
	if (this._stack.length === 0) {
		/* eslint-disable no-fallthrough */
		// eslint-disable-next-line default-case
		switch (this._direction) {
			case DOWNWARD:
				// eslint-disable-next-line no-case-declarations
				const tree = this._treeStack.pop()._force();
				if (tree instanceof Deep) {
					this._downwardStep(tree);
					++this._currentLevel;
					this._treeStack.push(tree, tree._middle);
					break;
				} else {
					assert(this._treeStack.length >= 1);
					this._direction = UPWARD;
					if (tree instanceof Single) {
						this._stack.push(tree.a);
						this._level.push(this._currentLevel);
						break;
					}

					assert(tree instanceof Empty);
				}

			case UPWARD:
				if (this._currentLevel === 0) return {done: true};
				assert(this._treeStack[this._treeStack.length - 1] instanceof Deep);
				--this._currentLevel;
				this._upwardStep();
		}
		/* eslint-enable no-fallthrough */
	}

	return this._pop();
};

DeepIterator.prototype[Symbol.iterator] = function () {
	return this;
};

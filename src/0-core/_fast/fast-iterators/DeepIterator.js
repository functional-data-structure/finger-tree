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
				this._tree._middle = this._tree._middle._force();
				if (this._tree._middle instanceof Deep) {
					this._treeStack.push(this._tree);
					this._tree = this._tree._middle;
					this._downwardStep();
					++this._currentLevel;
					this._level = this._stack.map(() => this._currentLevel);
					break;
				} else {
					this._direction = UPWARD;
					if (this._tree._middle instanceof Single) {
						this._stack = [this._tree._middle.a];
						this._level = [this._currentLevel + 1];
						break;
					}

					assert(this._tree._middle instanceof Empty);
				}

			case UPWARD:
				if (this._currentLevel === -1) return {done: true};
				assert(this._tree instanceof Deep);
				this._upwardStep();
				this._level = this._stack.map(() => this._currentLevel);

				this._tree = --this._currentLevel === -1 ? null : this._treeStack.pop();
		}
		/* eslint-enable no-fallthrough */
	}

	return this._pop();
};

DeepIterator.prototype[Symbol.iterator] = function () {
	return this;
};

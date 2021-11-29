import assert from 'assert';
import {Tree} from '../../3-tree/base/Tree.js';

/**
 * Split.
 *
 * @param {Tree} left
 * @param {any} middle
 * @param {Tree} right
 */
export function Split(left, middle, right) {
	assert(left instanceof Tree);
	assert(right instanceof Tree);
	this._left = left;
	this._middle = middle;
	this._right = right;
}

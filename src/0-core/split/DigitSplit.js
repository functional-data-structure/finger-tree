import assert from 'assert';
import {Digit} from '../../1-digit/0-Digit.js';

/**
 * DigitSplit.
 *
 * @param {Digit} left
 * @param {any} middle
 * @param {Digit} right
 */
export function DigitSplit(left, middle, right) {
	assert(left === null || left instanceof Digit);
	assert(right === null || right instanceof Digit);
	this._left = left;
	this._middle = middle;
	this._right = right;
}

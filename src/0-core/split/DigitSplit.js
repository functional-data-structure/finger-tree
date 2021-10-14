import assert from 'assert';
import {One} from '../../1-digit/1-One.js';
import {Two} from '../../1-digit/2-Two.js';
import {Three} from '../../1-digit/3-Three.js';
import {Four} from '../../1-digit/4-Four.js';

/**
 * DigitSplit.
 *
 * @param {null|One|Two|Three|Four} left
 * @param {any} middle
 * @param {null|One|Two|Three|Four} right
 */
export function DigitSplit(left, middle, right) {
	assert(
		left === null ||
			left instanceof One ||
			left instanceof Two ||
			left instanceof Three ||
			left instanceof Four,
	);
	assert(
		right === null ||
			right instanceof One ||
			right instanceof Two ||
			right instanceof Three ||
			right instanceof Four,
	);
	this._left = left;
	this._middle = middle;
	this._right = right;
}

import assert from 'assert';

import {Digit} from '../../1-digit/0-Digit.js';
import {Deep, Tree} from '../../3-tree/index.js';
import {delay} from '../../4-lazy/index.js';

/**
 * @param {any} M
 * @param {Digit|null} left
 * @param {Tree} middle
 * @param {Digit} right
 */
export function deepL(M, left, middle, right) {
	assert(left === null || left instanceof Digit);
	assert(middle instanceof Tree);
	assert(right instanceof Digit);

	if (left === null) {
		if (middle.isEmpty()) return right._tree(M);

		return new Deep(
			M,
			middle.head()._digit(),
			delay(() => middle.tail()),
			right,
		);
	}

	return new Deep(M, left, middle, right);
}

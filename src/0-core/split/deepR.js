import assert from 'assert';

import {Digit} from '../../1-digit/0-Digit.js';
import {Deep, Tree} from '../../3-tree/index.js';
import {delay} from '../../4-lazy/index.js';

/**
 * @param {any} M
 * @param {Digit} left
 * @param {Tree} middle
 * @param {Digit|null} right
 */
export function deepR(M, left, middle, right) {
	assert(left instanceof Digit);
	assert(middle instanceof Tree);
	assert(right === null || right instanceof Digit);

	if (right === null) {
		if (middle.isEmpty()) return left._tree(M);

		return new Deep(
			M,
			left,
			delay(() => middle.init()),
			middle.last()._digit(),
		);
	}

	return new Deep(M, left, middle, right);
}

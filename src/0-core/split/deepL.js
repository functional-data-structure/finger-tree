import assert from 'assert';

import {One} from '../../1-digit/1-One.js';
import {Two} from '../../1-digit/2-Two.js';
import {Three} from '../../1-digit/3-Three.js';
import {Four} from '../../1-digit/4-Four.js';
import {Deep, Tree} from '../../3-tree/index.js';
import delayTail from '../../4-lazy/delayTail.js';

/**
 * @param {any} M
 * @param {null|One|Two|Three|Four} left
 * @param {Tree} middle
 * @param {One|Two|Three|Four} right
 */
export function deepL(M, left, middle, right) {
	assert(
		left === null ||
			left instanceof One ||
			left instanceof Two ||
			left instanceof Three ||
			left instanceof Four,
	);
	assert(middle instanceof Tree);
	assert(
		right instanceof One ||
			right instanceof Two ||
			right instanceof Three ||
			right instanceof Four,
	);

	if (left === null) {
		if (middle.isEmpty()) return right._tree(M);

		return new Deep(M, middle.head()._digit(), delayTail(middle), right);
	}

	return new Deep(M, left, middle, right);
}

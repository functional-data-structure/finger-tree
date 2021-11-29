import assert from 'assert';

import {One} from '../../1-digit/1-One.js';
import {Two} from '../../1-digit/2-Two.js';
import {Three} from '../../1-digit/3-Three.js';
import {Four} from '../../1-digit/4-Four.js';
import {Deep, Tree} from '../../3-tree/index.js';
import delayInit from '../../4-lazy/delayInit.js';

/**
 * @param {any} M
 * @param {One|Two|Three|Four} left
 * @param {Tree} middle
 * @param {null|One|Two|Three|Four} right
 */
export function deepR(M, left, middle, right) {
	assert(
		left instanceof One ||
			left instanceof Two ||
			left instanceof Three ||
			left instanceof Four,
	);
	assert(middle instanceof Tree);
	assert(
		right === null ||
			right instanceof One ||
			right instanceof Two ||
			right instanceof Three ||
			right instanceof Four,
	);

	if (right === null) {
		if (middle.isEmpty()) return left._tree(M);

		return new Deep(M, left, delayInit(middle), middle.last()._digit());
	}

	return new Deep(M, left, middle, right);
}

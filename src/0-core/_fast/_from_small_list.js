import assert from 'assert';
import {Empty, Single, Deep} from '../../3-tree/index.js';
import {One, Two} from '../../1-digit/index.js';
import {cache} from '../measure/index.js';

export const THRESHOLD = 3;

export function _from_small_list(M, list) {
	assert(
		Number.isInteger(list.length) &&
			list.length >= 0 &&
			list.length <= THRESHOLD,
	);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 0:
			return new Empty(M);
		case 1:
			return new Single(M, list[0]);
		case 2:
			return new Deep(
				M,
				new One(list[0]),
				new Empty(cache(M)),
				new One(list[1]),
			);
		case 3:
			return new Deep(
				M,
				new Two(list[0], list[1]),
				new Empty(cache(M)),
				new One(list[2]),
			);
	}
}

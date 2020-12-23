import {One, Two, Three} from '../../1-digit';

import assert from 'assert';

/**
 * Creates a Digit from as small list.
 *
 * It should never be called on length 4 lists since it is only called
 * on results of splitDigit which outputs lists of length at most 3.
 *
 * @param {Array} list A list of length 1, 2, or 3.
 * @return {Digit} A digit containing the elements of list in order.
 */
export function _digit(list) {
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 3);
	switch (list.length) {
		case 1:
			return new One(list[0]);
		case 2:
			return new Two(list[0], list[1]);
		default:
			return new Three(list[0], list[1], list[2]);
	}
}

import assert from 'assert';
import {One, Two, Three} from '../../1-digit/index.js';

/**
 * Creates a Digit from as small list.
 *
 * It should never be called on length 4 lists since it is only called
 * on results of _splitDigit which outputs lists of length at most 3.
 *
 * @param {Array} list A list of length 1, 2, or 3.
 * @return {Digit} A digit containing the elements of list in order.
 */
export function _digit(list) {
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 3);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 1:
			return new One(list[0]);
		case 2:
			return new Two(list[0], list[1]);
		case 3:
			return new Three(list[0], list[1], list[2]);
	}
}

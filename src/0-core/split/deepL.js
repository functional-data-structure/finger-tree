import {Deep} from '../../3-tree/index.js';
import {delay} from '../../4-lazy/index.js';
import {_from_digit, _digit} from '../_fast/index.js';

/**
 * @param {Measure} M
 * @param {Array} left
 * @param {FingerTree} middle
 * @param {Digit} right
 */
export function deepL(M, left, middle, right) {
	if (left.length === 0) {
		if (middle.isEmpty()) return _from_digit(M, right);

		return new Deep(
			M,
			middle.head()._digit(),
			delay(() => middle.tail()),
			right,
		);
	}

	return new Deep(M, _digit(left), middle, right);
}

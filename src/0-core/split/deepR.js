import {Deep} from "../../3-tree/index.js";
import {delay} from "../../4-lazy/index.js";
import {_from_digit, _digit} from "../_fast/index.js";

/**
 * @param {Measure} M
 * @param {Digit} left
 * @param {FingerTree} middle
 * @param {Array} right
 */
export function deepR(M, left, middle, right) {
	if (right.length === 0) {
		if (middle.empty()) return _from_digit(M, left);

		return new Deep(
			M,
			left,
			delay(() => middle.init()),
			middle.last().digit()
		);
	}

	return new Deep(M, left, middle, _digit(right));
}

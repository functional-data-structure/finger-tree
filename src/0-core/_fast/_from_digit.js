import {One, Two, Three, Four} from '../../1-digit';
import {Empty, Single, Deep} from '../../3-tree';
import {cache} from '../measure';

import assert from 'assert';

export function _from_digit(M, digit) {
	if (digit instanceof One) return new Single(M, digit.a);
	assert(
		digit instanceof Two || digit instanceof Three || digit instanceof Four
	);
	return new Deep(M, digit.init(), new Empty(cache(M)), new One(digit.last()));
}

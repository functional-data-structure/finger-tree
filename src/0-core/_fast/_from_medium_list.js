import assert from 'assert';
import {Single, Deep} from '../../3-tree/index.js';
import empty from '../../5-api/empty.js';
import {Two, One} from '../../1-digit/index.js';
import {cache} from '../measure/index.js';

export function _from_medium_list(M, list) {
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);

	// eslint-disable-next-line default-case
	switch (list.length | 0) {
		case 1:
			return new Single(M, list[0]);
		case 2:
			return new Deep(M, new One(list[0]), empty(cache(M)), new One(list[1]));
		case 3:
			return new Deep(
				M,
				new Two(list[0], list[1]),
				empty(cache(M)),
				new One(list[2]),
			);
		case 4:
			return new Deep(
				M,
				new Two(list[0], list[1]),
				empty(cache(M)),
				new Two(list[2], list[3]),
			);
	}
}

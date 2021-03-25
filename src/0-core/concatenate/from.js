import {Empty} from '../../3-tree/index.js';

export function from(M, iterable) {
	return new Empty(M).append(iterable);
}

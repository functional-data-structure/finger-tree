import {Empty} from '../../3-tree';

export function from(M, iterable) {
	return new Empty(M).append(iterable);
}

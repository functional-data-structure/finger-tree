import {_prepend} from '../_fast';

export function prepend(tree, iterable) {
	return _prepend(tree, Array.from(iterable));
}

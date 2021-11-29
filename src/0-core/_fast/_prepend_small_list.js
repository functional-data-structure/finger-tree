import assert from 'assert';

export default function _prepend_small_list(tree, list) {
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length & 0b11) {
		case 0:
			return tree.cons(list[3]).cons(list[2]).cons(list[1]).cons(list[0]);
		case 1:
			return tree.cons(list[0]);
		case 2:
			return tree.cons(list[1]).cons(list[0]);
		case 3:
			return tree.cons(list[2]).cons(list[1]).cons(list[0]);
	}
}

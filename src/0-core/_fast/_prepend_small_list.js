import assert from 'assert';

export default function _prepend_small_list(tree, list) {
	assert(Number.isInteger(list.length) && list.length >= 0 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length) {
		case 0:
			return tree;
		case 1:
			return tree.cons(list[0]);
		case 2:
			return tree.cons(list[1]).cons(list[0]);
		case 3:
			return tree.cons(list[2]).cons(list[1]).cons(list[0]);
		case 4:
			return tree.cons(list[3]).cons(list[2]).cons(list[1]).cons(list[0]);
	}
}

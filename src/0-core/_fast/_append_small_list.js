import assert from 'assert';

export default function _append_small_list(tree, list) {
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	// eslint-disable-next-line default-case
	switch (list.length & 0b11) {
		case 0:
			return tree.push(list[0]).push(list[1]).push(list[2]).push(list[3]);
		case 1:
			return tree.push(list[0]);
		case 2:
			return tree.push(list[0]).push(list[1]);
		case 3:
			return tree.push(list[0]).push(list[1]).push(list[2]);
	}
}

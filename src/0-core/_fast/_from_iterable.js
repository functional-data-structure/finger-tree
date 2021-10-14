// Import {Empty} from '../../3-tree/index.js';

import {Empty} from '../../3-tree/implementations/0-Empty.js';
import {
	THRESHOLD as MEDIUM_THRESHOLD,
	_from_medium_list,
	_from_largest_medium_list,
} from './_from_medium_list.js';

function increment(trees, tree) {
	// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
	const n = trees.length | 0;
	// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
	for (let i = 0; i !== n; i = (i + 1) | 0) {
		if (trees[i] === null) {
			trees[i] = tree;
			return;
		}

		tree = trees[i].concat(tree);
		trees[i] = null;
	}

	trees.push(tree);
}

function sum(M, trees) {
	let result = new Empty(M);
	for (const tree of trees) {
		if (tree !== null) {
			result = tree.concat(result);
		}
	}

	return result;
}

export function _from_iterable(M, iterable) {
	// Return new Empty(M).append(iterable);
	const it = iterable[Symbol.iterator]();
	const trees = [];
	for (;;) {
		const list = [];
		// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
		for (let i = MEDIUM_THRESHOLD; i !== 0; i = (i - 1) | 0) {
			const event = it.next();
			if (event.done) {
				increment(trees, _from_medium_list(M, list));
				return sum(M, trees);
			}

			list.push(event.value);
		}

		increment(trees, _from_largest_medium_list(M, list));
	}
}

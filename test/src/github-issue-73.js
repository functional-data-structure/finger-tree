import test from 'ava';

import {Measures} from '@functional-abstraction/measure';

import {list} from '@iterable-iterator/list';

import {from} from '../../src/index.js';
const {COUNTER} = Measures;

function set(tree, index, value) {
	if (index < 0 || index >= tree.measure())
		throw new Error(`wrong index '${index}'`);

	const split = tree.splitTree((m) => m > index, tree.M.zero());

	return split.left.push(value).concat(split.right);
}

test('github issue #73', (t) => {
	let T = from(COUNTER, 'abcde');
	T = set(T, 2, 'C');
	t.deepEqual(list(T), list('abCde'));
	T = set(T, 2, 'Z');
	t.deepEqual(list(T), list('abZde'));
});

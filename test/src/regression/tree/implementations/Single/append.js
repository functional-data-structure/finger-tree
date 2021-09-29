import test from 'ava';

import {range} from '@iterable-iterator/range';

import {ABSTRACT_COUNTER as COUNTER} from '../../../../_fixtures.js';

import {from} from '../../../../../../src/index.js';

test('empty', (t) => {
	let tree = from(COUNTER, range(1));
	tree = tree.append(range(0));
	t.deepEqual(
		Array.from(tree),
		Array.from(range(1)).concat(Array.from(range(0))),
	);
	t.is(tree.measure(), 1);
});

test('range(1)', (t) => {
	let tree = from(COUNTER, range(1));
	tree = tree.append(range(1));
	t.deepEqual(
		Array.from(tree),
		Array.from(range(1)).concat(Array.from(range(1))),
	);
	t.is(tree.measure(), 2);
});

test('range(200)', (t) => {
	let tree = from(COUNTER, range(1));
	tree = tree.append(range(200));
	t.deepEqual(
		Array.from(tree),
		Array.from(range(1)).concat(Array.from(range(200))),
	);
	t.is(tree.measure(), 201);
});

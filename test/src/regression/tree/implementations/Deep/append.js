import test from 'ava';

import {range} from '@iterable-iterator/range';

import {ABSTRACT_COUNTER as COUNTER} from '../../../../_fixtures.js';

import {from} from '../../../../../../src/index.js';

test('empty', (t) => {
	const r0 = range(0);
	const r200 = range(200);
	let tree = from(COUNTER, r200);
	tree = tree.append(r0);
	t.deepEqual(Array.from(tree), Array.from(r200).concat(Array.from(r0)));
	t.is(tree.measure(), 200);
});

test('range(1)', (t) => {
	const r1 = range(1);
	const r200 = range(200);
	let tree = from(COUNTER, r200);
	tree = tree.append(r1);
	t.deepEqual(Array.from(tree), Array.from(r200).concat(Array.from(r1)));
	t.is(tree.measure(), 201);
});

test('r200', (t) => {
	const r200 = range(200);
	let tree = from(COUNTER, r200);
	tree = tree.append(r200);
	t.deepEqual(Array.from(tree), Array.from(r200).concat(Array.from(r200)));
	t.is(tree.measure(), 400);
});

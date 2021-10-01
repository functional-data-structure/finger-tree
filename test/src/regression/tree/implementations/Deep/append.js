import test from 'ava';

import {range} from '@iterable-iterator/range';

import {ABSTRACT_COUNTER as COUNTER} from '../../../../_fixtures.js';

import {from} from '../../../../../../src/index.js';

test('empty', (t) => {
	const r0 = range(0);
	const r200 = range(200);
	const before = from(COUNTER, r200);
	const after = before.append(r0);

	t.deepEqual(Array.from(after), Array.from(r200).concat(Array.from(r0)));
	t.is(after.measure(), 200);

	t.deepEqual(Array.from(before), Array.from(r200));
	t.is(before.measure(), 200);
});

test('range(1)', (t) => {
	const r1 = range(1);
	const r200 = range(200);
	const before = from(COUNTER, r200);
	const after = before.append(r1);

	t.deepEqual(Array.from(after), Array.from(r200).concat(Array.from(r1)));
	t.is(after.measure(), 201);

	t.deepEqual(Array.from(before), Array.from(r200));
	t.is(before.measure(), 200);
});

test('r200', (t) => {
	const r200 = range(200);
	const before = from(COUNTER, r200);
	const after = before.append(r200);

	t.deepEqual(Array.from(after), Array.from(r200).concat(Array.from(r200)));
	t.is(after.measure(), 400);

	t.deepEqual(Array.from(before), Array.from(r200));
	t.is(before.measure(), 200);
});

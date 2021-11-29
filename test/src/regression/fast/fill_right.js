import test from 'ava';

import {range} from '@iterable-iterator/range';

import {ABSTRACT_COUNTER as COUNTER, measure} from '../../_fixtures.js';

import {empty} from '../../../../src/index.js';

test('left instanceof Four', (t) => {
	const before = empty(COUNTER).append(range(2)).cons(-1).cons(-2).cons(-3);

	const after = before.append(range(2, 4));

	t.deepEqual(Array.from(after), Array.from(range(-3, 4)));
	t.is(after.measure(), measure(COUNTER, range(-3, 4)));

	t.deepEqual(Array.from(before), Array.from(range(-3, 2)));
	t.is(before.measure(), measure(COUNTER, range(-3, 2)));
});

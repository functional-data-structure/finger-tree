import test from 'ava';

import {range} from '@iterable-iterator/range';

import {ABSTRACT_COUNTER as COUNTER, measure} from '../../_fixtures.js';

import {empty} from '../../../../src/index.js';

test('left instanceof Four', (t) => {
	const tree = empty(COUNTER)
		.append(range(2))
		.cons(-1)
		.cons(-2)
		.cons(-3)
		.append(range(2, 4));
	t.deepEqual(Array.from(tree), Array.from(range(-3, 4)));
	t.is(tree.measure(), measure(COUNTER, range(-3, 4)));
});

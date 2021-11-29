import test from 'ava';

import {ncycle} from '@iterable-iterator/cycle';
import {reversed} from '@iterable-iterator/reversed';
import {range} from '@iterable-iterator/range';
import {ABSTRACT_COUNTER as COUNTER} from '../../_fixtures.js';

import {empty} from '../../../../src/index.js';

test('cover', (t) => {
	const n = 11;
	let tree = empty(COUNTER);
	for (let i = 0; i < n; ++i) tree = tree.push(i); // (1) ((3)(3)) (4)
	tree = tree.concat(tree);
	t.deepEqual(
		Array.from(tree.reversed()),
		Array.from(ncycle(reversed(range(n)), 2)),
	);
});

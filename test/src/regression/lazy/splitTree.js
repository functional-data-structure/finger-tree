import test from 'ava';

import {ABSTRACT_COUNTER as COUNTER} from '../../_fixtures.js';

import {empty} from '../../../../src/index.js';

test('cover', (t) => {
	const x = {};
	const n = 9;
	let tree = empty(COUNTER);
	for (let i = 0; i < n; ++i) tree = tree.push(x); // (1) ((3)(3)) (2)
	tree = tree.init().init(); // (1) ((3)) (3)
	const [left, right] = tree.split((m) => m >= 3);
	t.is(left.measure(), 2);
	t.is(right.measure(), n - 4);
	t.deepEqual(Array.from(left.concat(right)), Array.from(tree));
});

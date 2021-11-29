import test from 'ava';

import {nrepeat} from '@iterable-iterator/repeat';
import {ABSTRACT_COUNTER as COUNTER} from '../../_fixtures.js';

import {empty} from '../../../../src/index.js';

test('cover', (t) => {
	const x = {};
	const n = 9;
	let tree = empty(COUNTER);
	for (let i = 0; i < n; ++i) tree = tree.push(x); // (1) ((3)(3)) (2)
	tree = tree.init().init(); // (1) ((3)) (3)
	const A = tree.concat(tree);
	t.deepEqual(Array.from(A), Array.from(nrepeat(x, 2 * (n - 2))));

	tree = tree.init().init().init(); // (1) () (3)
	const B = tree.concat(tree);
	t.deepEqual(Array.from(B), Array.from(nrepeat(x, 2 * (n - 5))));
});

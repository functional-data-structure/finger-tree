import test from 'ava';

import {nrepeat} from '@iterable-iterator/repeat';
import {ABSTRACT_COUNTER as COUNTER} from '../../_fixtures.js';

import {empty} from '../../../../src/index.js';

test('cover', (t) => {
	const x = {};
	const n = 9;
	let tree = empty(COUNTER);
	for (let i = 0; i < n; ++i) tree = tree.push(x); // (1) ((3)(3)) (2)
	for (let i = 0; i < n; ++i) {
		const copy = tree.init().push(x);
		t.deepEqual(Array.from(copy), Array.from(nrepeat(x, n - i)));
		t.false(copy.isEmpty());
		tree = tree.init();
	}

	t.true(tree.isEmpty());
});

import test from 'ava';

import {ABSTRACT_COUNTER as COUNTER} from '../../../_fixtures.js';

import {empty} from '../../../../../src/index.js';

const cover = (t, j) => {
	t.true(Number.isInteger(j) && j >= 0 && j <= 3);
	const x = {};
	const n = 11;
	let tree = empty(COUNTER);
	for (let i = 0; i < n; ++i) tree = tree.push(x); // (1) ((3)(3)) (4)
	const [left, right] = tree.split((m) => m >= n - j);
	t.is(left.measure(), n - (j + 1));
	t.is(right.measure(), j + 1);
	t.deepEqual(Array.from(left.concat(right)), Array.from(tree));
};

cover.title = (title, i) => title ?? `cover ${i}`;

test(cover, 0);
test(cover, 1);
test(cover, 2);
test(cover, 3);

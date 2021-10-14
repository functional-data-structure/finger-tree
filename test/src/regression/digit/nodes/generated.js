import test from 'ava';

import {range} from '@iterable-iterator/range';
import {product} from '@set-theory/cartesian-product';

import {
	ABSTRACT_COUNTER as COUNTER,
	fromToString as f,
	fromRight,
	fromLeft,
} from '../../../_fixtures.js';

const cover = (t, M, A, B) => {
	const left = fromLeft(M, A);
	const right = fromRight(M, B);
	const tree = left.concat(right);
	const expected = Array.from(A).concat(Array.from(B));
	t.is(tree.measure(), expected.length);
	t.deepEqual(Array.from(tree), expected);
};

cover.title = (title, M, A, B) => title ?? `${f(M, A)}.concat(${f(M, B)})`;

for (const [m, n] of product([range(62)], 2)) {
	test(cover, COUNTER, range(m), range(n));
}

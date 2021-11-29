import test from 'ava';

import {range} from '@iterable-iterator/range';
import {product} from '@set-theory/cartesian-product';

import {
	ABSTRACT_COUNTER as COUNTER,
	fromLeft,
	fromRight,
	fromLeftToString as fl,
	fromRightToString as fr,
} from '../../../_fixtures.js';

import {empty} from '../../../../../src/index.js';

const flfr = (t, M, A, B) => {
	const left = fromLeft(empty(M), A);
	const right = fromRight(empty(M), B);
	const tree = left.concat(right);
	const expected = Array.from(A).concat(Array.from(B));
	t.is(tree.measure(), expected.length);
	t.deepEqual(Array.from(tree), expected);
};

flfr.title = (title, M, A, B) => title ?? `${fl(M, A)}.concat(${fr(M, B)})`;

const flifrt = (t, M, A, B) => {
	const left = fromLeft(empty(M), A).init();
	const right = fromRight(empty(M), B).tail();
	const tree = left.concat(right);
	const expected = Array.from(A).slice(0, -1).concat(Array.from(B).slice(1));
	t.is(tree.measure(), expected.length);
	t.deepEqual(Array.from(tree), expected);
};

flifrt.title = (title, M, A, B) =>
	title ?? `${fl(M, A)}.init().concat(${fr(M, B)}.tail())`;

for (const [m, n] of product([range(62)], 2)) {
	test(flfr, COUNTER, range(m), range(n));
}

for (const [m, n] of product([range(19)], 2)) {
	test(flifrt, COUNTER, range(m), range(n));
}

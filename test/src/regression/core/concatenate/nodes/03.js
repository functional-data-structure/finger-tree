import test from 'ava';

import {Measures} from '@functional-abstraction/measure';
import {nrepeat} from '@iterable-iterator/repeat';

import {
	empty,
	leftDigit,
	middleTree,
	rightDigit,
	nodes,
	digitSize,
} from '../../../../../../src/index.js';

const {COUNTER} = Measures;

test('cover', (t) => {
	const x = 'x';

	// (xxxx, (), x)
	let A = empty(COUNTER).cons(x).cons(x).cons(x).cons(x).cons(x);
	A = A.cons(x); // (xx, ([xxx]), x)
	A = A.cons(x).cons(x); // (xxxx, ([xxx]), x)
	A = A.cons(x); // (xx, ([xxx], (), [xxx]), x)

	// (x, (), xxxx)
	let B = empty(COUNTER).push(x).push(x).push(x).push(x).push(x);
	B = B.push(x); // (x, ([xxx]), xx)
	B = B.push(x).push(x); // (x, ([xxx]), xxxx)
	B = B.push(x); // (x, ([xxx], (), [xxx]), xx)

	t.is(
		digitSize(rightDigit(middleTree(A))) +
			nodes(COUNTER, rightDigit(A), leftDigit(B)).length +
			digitSize(leftDigit(middleTree(B))),
		3,
	);

	const C = A.concat(B);

	t.deepEqual([...C], [...nrepeat(x, 18)]);
});

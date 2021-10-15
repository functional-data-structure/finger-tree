import test from 'ava';

import {Measures} from '@functional-abstraction/measure';
import {range} from '@iterable-iterator/range';

import {
	empty,
	leftDigit,
	middleTree,
	rightDigit,
	embeddedMeasure,
	nodes,
	nodesWithList,
	digitSize,
} from '../../../../../../src/index.js';

const {COUNTER} = Measures;

test('cover', (t) => {
	let A = empty(COUNTER);
	for (const i of range(65)) A = A.cons(i);
	// (4, (12, (45), 3), 1)

	let B = empty(COUNTER);
	for (const i of range(65)) B = B.push(i);
	// (1, (3, (45), 12), 4)

	const M = COUNTER;
	const Am = middleTree(A);
	const Bm = middleTree(B);
	const cM = embeddedMeasure(Bm);
	const Al = leftDigit(A);
	const Br = rightDigit(B);
	const Amm = middleTree(Am);
	const Bmm = middleTree(Bm);

	t.is(
		digitSize(rightDigit(Bmm)) +
			nodesWithList(cM, rightDigit(Bm), nodes(M, Br, Al), leftDigit(Am))
				.length +
			digitSize(leftDigit(Amm)),
		12,
	);

	const C = B.concat(A);

	t.deepEqual([...C], [...range(65), ...range(64, -1, -1)]);
});

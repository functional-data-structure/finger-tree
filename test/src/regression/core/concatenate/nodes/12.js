import test from 'ava';

import {Measures} from '@functional-abstraction/measure';
import {range} from '@iterable-iterator/range';

import {empty} from '../../../../../../src/index.js';

const {COUNTER} = Measures;

test('cover', (t) => {
	let A = empty(COUNTER);
	for (const i of range(65)) A = A.cons(i);
	// (4, (12, (45), 3), 1)

	let B = empty(COUNTER);
	for (const i of range(65)) B = B.push(i);
	// (1, (3, (45), 12), 4)

	const M = B._middle.M;

	t.is(
		[...B._middle._middle._right].length +
			B._middle._right._nodes_with_list(
				M,
				B._right._nodes(COUNTER, A._left),
				A._middle._left,
			).length +
			[...A._middle._middle._left].length,
		12,
	);

	const C = B.concat(A);

	t.deepEqual([...C], [...range(65), ...range(64, -1, -1)]);
});

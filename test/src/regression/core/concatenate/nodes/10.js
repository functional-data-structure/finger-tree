import test from 'ava';

import {Measures} from '@functional-abstraction/measure';
import {nrepeat} from '@iterable-iterator/repeat';

import {empty} from '../../../../../../src/index.js';

const {COUNTER} = Measures;

test('cover', (t) => {
	const x = 'x';

	// (xxxx, (), x)
	let A = empty(COUNTER).cons(x).cons(x).cons(x).cons(x).cons(x);
	A = A.cons(x); // (xx, ([xxx]), x)
	A = A.cons(x).cons(x); // (xxxx, ([xxx]), x)
	A = A.cons(x); // (xx, ([xxx], (), [xxx]), x)
	A = A.cons(x).cons(x); // (xxxx, ([xxx], (), [xxx]), x)
	A = A.cons(x); // (xx, ([xxx][xxx], (), [xxx]), x)
	A = A.cons(x).cons(x); // (xxxx, ([xxx][xxx], (), [xxx]), x)
	A = A.cons(x); // (xx, ([xxx][xxx][xxx], (), [xxx]), x)
	A = A.cons(x).cons(x); // (xxxx, ([xxx][xxx][xxx], (), [xxx]), x)
	A = A.cons(x); // (xx, ([xxx][xxx][xxx][xxx], (), [xxx]), x)

	// (x, (), xxxx)
	let B = empty(COUNTER).push(x).push(x).push(x).push(x).push(x);
	B = B.push(x); // (x, ([xxx]), xx)
	B = B.push(x).push(x); // (x, ([xxx]), xxxx)
	B = B.push(x); // (x, ([xxx], (), [xxx]), xx)
	B = B.push(x).push(x); // (x, ([xxx], (), [xxx]), xxxx)
	B = B.push(x); // (x, ([xxx], (), [xxx][xxx]), xx)
	B = B.push(x).push(x); // (x, ([xxx], (), [xxx][xxx]), xxxx)
	B = B.push(x); // (x, ([xxx], (), [xxx][xxx][xxx]), xx)
	B = B.push(x).push(x); // (x, ([xxx], (), [xxx][xxx][xxx]), xxxx)
	B = B.push(x); // (x, ([xxx], (), [xxx][xxx][xxx][xxx]), xx)

	t.is(
		B.middle.right.measure(COUNTER) +
			B.right._nodes(COUNTER, A.left).length +
			A.middle.left.measure(COUNTER),
		10,
	);

	const C = B.concat(A);

	t.deepEqual([...C], [...nrepeat(x, 36)]);
});

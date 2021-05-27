import test from 'ava';

import {Measures} from '@aureooms/js-measure';

import {map} from '@iterable-iterator/map';
import {list} from '@iterable-iterator/list';
import {_chain as chain} from '@iterable-iterator/chain';
import {range} from '@iterable-iterator/range';
import {reversed} from '@iterable-iterator/reversed';

import {gt} from '@functional-abstraction/predicate';

import {empty, from} from '../../src/index.js';
const {COUNTER} = Measures;

test('FingerTree', (t) => {
	let T = empty(COUNTER);

	const N = 10;

	for (const value of range(N)) T = T.push(value);
	for (const value of range(N)) T = T.cons(value);

	t.deepEqual(
		list(T),
		list(chain([reversed(range(N)), range(N)])),
		'check T 9..00..9',
	);

	let U = from(COUNTER, range(N));

	// eslint-disable-next-line no-unused-vars
	for (const _ of range(N)) {
		U = U.push(T.head());
		T = T.tail();
	}

	t.deepEqual(
		list(U),
		list(chain([range(N), reversed(range(N))])),
		'check U 0..99..0',
	);
	t.deepEqual(list(T), list(range(N)), 'check T 0..9');

	t.deepEqual(
		list(U.concat(T)),
		list(chain([range(N), reversed(range(N)), range(N)])),
		'concat U T 0..99..00..9',
	);

	t.is(U.measure(), 2 * N);
	t.is(U.tail().measure(), 2 * N - 1);
	t.is(U.init().measure(), 2 * N - 1);

	const M = 100;

	const V1 = from(COUNTER, [0]);
	const V2 = from(COUNTER, range(1, M - 50));
	const V3 = from(COUNTER, range(M - 50, M - 1));
	const V4 = from(COUNTER, [M - 1]);
	const EMPTY = from(COUNTER, []);

	let V = EMPTY.concat(V1)
		.concat(EMPTY)
		.concat(V2)
		.concat(EMPTY)
		.concat(V3)
		.concat(EMPTY)
		.concat(V4)
		.concat(EMPTY);

	t.true(EMPTY.isEmpty());
	t.true(!V.isEmpty());
	t.true(V1.tail().isEmpty());
	t.true(V1.init().isEmpty());
	t.true(V4.tail().isEmpty());
	t.true(V4.init().isEmpty());
	t.true(EMPTY.tail().isEmpty());
	t.true(EMPTY.init().isEmpty());
	t.is(V.measure(), M);
	t.is(V.head(), 0);
	t.is(V.last(), M - 1);
	t.deepEqual(list(V1.concat(V4).init()), [0]);
	t.deepEqual(list(V1.concat(V4).tail()), [M - 1]);
	t.deepEqual(list(V1.concat(V4).concat(V1)), [0, M - 1, 0]);

	for (let i = 0; i <= M; ++i) {
		t.deepEqual(list(V), list(range(i, M)));
		V = V.tail();
	}

	// CORNER CASES

	let Z;

	t.is(from(COUNTER, 'xabcde').head(), 'x');
	t.is(from(COUNTER, 'abcdex').last(), 'x');
	t.deepEqual(list(from(COUNTER, 'abcdex').init()), ['a', 'b', 'c', 'd', 'e']);
	t.deepEqual(list(from(COUNTER, 'xabcde').tail()), ['a', 'b', 'c', 'd', 'e']);

	Z = from(COUNTER, 'ex').prepend('abcd');

	t.deepEqual(list(Z.init()), ['a', 'b', 'c', 'd', 'e']);

	const W = from(COUNTER, 'de').prepend('xabc');
	t.deepEqual(list(W.tail()), ['a', 'b', 'c', 'd', 'e']);

	t.deepEqual(list(W.concat(Z)), list('xabcdeabcdex'));

	// MAKE NAIVE nodes(.) FAIL

	let F = empty(COUNTER);
	let G = empty(COUNTER);

	F = F.append(range(4 + 16));
	G = G.prepend(range(4 + 16));

	t.is(F.concat(G).measure(), 40, 'make naive nodes(.) fail');

	// SPLIT

	F = from(COUNTER, 'abcdefgh');

	t.deepEqual(
		list(map(list, F.split(gt(0)))),
		[list(''), list('abcdefgh')],
		'split 0',
	);
	t.deepEqual(
		list(map(list, F.split(gt(1)))),
		[list('a'), list('bcdefgh')],
		'split 1',
	);
	t.deepEqual(
		list(map(list, F.split(gt(2)))),
		[list('ab'), list('cdefgh')],
		'split 2',
	);
	t.deepEqual(
		list(map(list, F.split(gt(3)))),
		[list('abc'), list('defgh')],
		'split 3',
	);
	t.deepEqual(
		list(map(list, F.split(gt(4)))),
		[list('abcd'), list('efgh')],
		'split 4',
	);
	t.deepEqual(
		list(map(list, F.split(gt(5)))),
		[list('abcde'), list('fgh')],
		'split 5',
	);
	t.deepEqual(
		list(map(list, F.split(gt(6)))),
		[list('abcdef'), list('gh')],
		'split 6',
	);
	t.deepEqual(
		list(map(list, F.split(gt(7)))),
		[list('abcdefg'), list('h')],
		'split 7',
	);
	t.deepEqual(
		list(map(list, F.split(gt(8)))),
		[list('abcdefgh'), list('')],
		'split 8',
	);

	const split = F.splitTree(gt(4), COUNTER.zero());

	t.deepEqual(
		[list(split.left), split.middle, list(split.right)],
		[list('abcd'), 'e', list('fgh')],
		'splitTree',
	);

	const _N = 1000;
	const __N = Math.floor(_N / 2);
	const J = from(COUNTER, range(_N));
	t.deepEqual(
		list(map(list, J.split(gt(__N)))),
		[list(range(__N)), list(range(__N, _N))],
		'split 1000',
	);

	t.deepEqual(list(J.takeUntil(gt(__N))), list(range(__N)), 'takeUntil 1000');
	t.deepEqual(
		list(J.dropUntil(gt(__N))),
		list(range(__N, _N)),
		'dropUntil 1000',
	);

	t.deepEqual(
		list(map(list, from(COUNTER, '').split(gt(0)))),
		[[], []],
		'split empty',
	);
	t.deepEqual(
		list(map(list, from(COUNTER, 'a').split(gt(0)))),
		[[], ['a']],
		'split single 0',
	);
	t.deepEqual(
		list(map(list, from(COUNTER, 'a').split(gt(1)))),
		[['a'], []],
		'split single 1',
	);

	// Provoke split of digit One
	t.deepEqual(
		list(map(list, from(COUNTER, 'a').append('bcde').split(gt(0)))),
		[list(''), list('abcde')],
		'One.splitDigit 0',
	);
	// Provoke split of digit Two
	t.deepEqual(
		list(map(list, from(COUNTER, 'b').append('cde').prepend('a').split(gt(0)))),
		[list(''), list('abcde')],
		'Two.splitDigit 0',
	);
	t.deepEqual(
		list(map(list, from(COUNTER, 'b').append('cde').prepend('a').split(gt(1)))),
		[list('a'), list('bcde')],
		'Two.splitDigit 1',
	);
	// Provoke split of digit Three
	t.deepEqual(
		list(map(list, from(COUNTER, 'c').append('de').prepend('ab').split(gt(0)))),
		[list(''), list('abcde')],
		'Three.splitDigit 0',
	);
	t.deepEqual(
		list(map(list, from(COUNTER, 'c').append('de').prepend('ab').split(gt(1)))),
		[list('a'), list('bcde')],
		'Three.splitDigit 1',
	);
	t.deepEqual(
		list(map(list, from(COUNTER, 'c').append('de').prepend('ab').split(gt(2)))),
		[list('ab'), list('cde')],
		'Three.splitDigit 2',
	);
	// Provoke split of digit Four
	t.deepEqual(
		list(map(list, from(COUNTER, 'd').append('e').prepend('abc').split(gt(0)))),
		[list(''), list('abcde')],
		'Four.splitDigit 0',
	);
	t.deepEqual(
		list(map(list, from(COUNTER, 'd').append('e').prepend('abc').split(gt(1)))),
		[list('a'), list('bcde')],
		'Four.splitDigit 1',
	);
	t.deepEqual(
		list(map(list, from(COUNTER, 'd').append('e').prepend('abc').split(gt(2)))),
		[list('ab'), list('cde')],
		'Four.splitDigit 2',
	);
	t.deepEqual(
		list(map(list, from(COUNTER, 'd').append('e').prepend('abc').split(gt(3)))),
		[list('abc'), list('de')],
		'Four.splitDigit 3',
	);

	// Provoke head / last on digits
	t.is(from(COUNTER, 'x').prepend('a').head(), 'a', 'One.head');
	t.is(from(COUNTER, 'a').append('x').last(), 'x', 'One.last');
	t.is(from(COUNTER, 'x').prepend('ab').head(), 'a', 'Two.head');
	t.is(from(COUNTER, 'a').append('bx').last(), 'x', 'Two.last');
	t.is(from(COUNTER, 'x').prepend('abc').head(), 'a', 'Three.head');
	t.is(from(COUNTER, 'a').append('bcx').last(), 'x', 'Three.last');
	t.is(from(COUNTER, 'x').prepend('abcd').head(), 'a', 'Four.head');
	t.is(from(COUNTER, 'a').append('bcdx').last(), 'x', 'Four.last');

	// Provoke several corner cases
	Z = from(COUNTER, range(10_000));

	const x = Z.split(gt(5000));

	let Y = x[0].concat(x[1]);

	t.deepEqual(list(Y), list(Z), 'split then concat 10000 items');

	// Provoke _nodes optimisation

	Y = empty(COUNTER).cons(0).push(1);
	Z = empty(COUNTER).push(9).cons(8);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 8, 9], '1+1');

	Y = empty(COUNTER).cons(0).push(1);
	Z = empty(COUNTER).push(9).cons(8).cons(7);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 7, 8, 9], '1+2');

	Y = empty(COUNTER).cons(0).push(1);
	Z = empty(COUNTER).push(9).cons(8).cons(7).cons(6);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 6, 7, 8, 9], '1+3');

	Y = empty(COUNTER).cons(0).push(1);
	Z = empty(COUNTER).push(9).cons(8).cons(7).cons(6).cons(5);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 5, 6, 7, 8, 9], '1+4');

	Y = empty(COUNTER).cons(0).push(1).push(2);
	Z = empty(COUNTER).push(9).cons(8);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 8, 9], '2+1');

	Y = empty(COUNTER).cons(0).push(1).push(2);
	Z = empty(COUNTER).push(9).cons(8).cons(7);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 7, 8, 9], '2+2');

	Y = empty(COUNTER).cons(0).push(1).push(2);
	Z = empty(COUNTER).push(9).cons(8).cons(7).cons(6);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 6, 7, 8, 9], '2+3');

	Y = empty(COUNTER).cons(0).push(1).push(2);
	Z = empty(COUNTER).push(9).cons(8).cons(7).cons(6).cons(5);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 5, 6, 7, 8, 9], '2+4');

	Y = empty(COUNTER).cons(0).push(1).push(2).push(3);
	Z = empty(COUNTER).push(9).cons(8);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 3, 8, 9], '3+1');

	Y = empty(COUNTER).cons(0).push(1).push(2).push(3);
	Z = empty(COUNTER).push(9).cons(8).cons(7);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 3, 7, 8, 9], '3+2');

	Y = empty(COUNTER).cons(0).push(1).push(2).push(3);
	Z = empty(COUNTER).push(9).cons(8).cons(7).cons(6);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 3, 6, 7, 8, 9], '3+3');

	Y = empty(COUNTER).cons(0).push(1).push(2).push(3);
	Z = empty(COUNTER).push(9).cons(8).cons(7).cons(6).cons(5);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 3, 5, 6, 7, 8, 9], '3+4');

	Y = empty(COUNTER).cons(0).push(1).push(2).push(3).push(4);
	Z = empty(COUNTER).push(9).cons(8);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 3, 4, 8, 9], '4+1');

	Y = empty(COUNTER).cons(0).push(1).push(2).push(3).push(4);
	Z = empty(COUNTER).push(9).cons(8).cons(7);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 3, 4, 7, 8, 9], '4+2');

	Y = empty(COUNTER).cons(0).push(1).push(2).push(3).push(4);
	Z = empty(COUNTER).push(9).cons(8).cons(7).cons(6);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 3, 4, 6, 7, 8, 9], '4+3');

	Y = empty(COUNTER).cons(0).push(1).push(2).push(3).push(4);
	Z = empty(COUNTER).push(9).cons(8).cons(7).cons(6).cons(5);
	t.deepEqual(list(Y.concat(Z)), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], '4+4');

	// Provoke app3 Deep + list + Single

	Y = empty(COUNTER).append(range(12));
	Z = empty(COUNTER).prepend(range(6));

	t.deepEqual(list(Y.concat(Z)), list(chain([range(12), range(6)])), 'D+l+S');
});

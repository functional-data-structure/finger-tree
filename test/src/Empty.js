import test from 'ava';

import {Measures} from '@functional-abstraction/measure';

import {gt} from '@functional-abstraction/predicate';

import {empty} from '../../src/index.js';

const {COUNTER} = Measures;

test('head', (t) => {
	t.throws(() => empty(COUNTER).head(), {message: /cannot/});
});

test('last', (t) => {
	t.throws(() => empty(COUNTER).last(), {message: /cannot/});
});

test('splitTree', (t) => {
	t.throws(() => empty(COUNTER).splitTree(gt(0), COUNTER.zero()), {
		message: /not implemented/,
	});
});

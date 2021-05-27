import test from 'ava';

import {Measures} from '@aureooms/js-measure';

import {gt} from '@aureooms/js-predicate';

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

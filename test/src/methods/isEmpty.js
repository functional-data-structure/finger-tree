import test from 'ava';

import {Measures} from '@functional-abstraction/measure';

import {range} from '@iterable-iterator/range';

import {empty, from} from '../../../src/index.js';
const {COUNTER} = Measures;

test('empty(COUNTER) is empty', (t) => {
	t.true(empty(COUNTER).isEmpty());
});

test('from(COUNTER, []) is empty', (t) => {
	t.true(from(COUNTER, []).isEmpty());
});

test('from(COUNTER, range(0)) is empty', (t) => {
	t.true(from(COUNTER, range(0)).isEmpty());
});

test('from(COUNTER, [0]) is not empty', (t) => {
	t.false(from(COUNTER, [0]).isEmpty());
});

test('from(COUNTER, range(1000)) is not empty', (t) => {
	t.false(from(COUNTER, range(1000)).isEmpty());
});

import test from 'ava';

import {Measures} from '@functional-abstraction/measure';

import {gt} from '@functional-abstraction/predicate';

import {from, leftTree} from '../../src/index.js';

const {COUNTER} = Measures;

test('Cover Lazy#split', (t) => {
	const T = from(COUNTER, 'abcde');
	const split = T.splitTree(gt(2), COUNTER.zero());
	t.is([...leftTree(split).takeUntil(gt(1))].join(''), 'a');
});

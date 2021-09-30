import test from 'ava';

import {Measures} from '@functional-abstraction/measure';

import {gt} from '@functional-abstraction/predicate';

import {from} from '../../src/index.js';

const {COUNTER} = Measures;

test('Cover Lazy#split', (t) => {
	const T = from(COUNTER, 'abcde');
	const split = T.splitTree(gt(2), COUNTER.zero());
	t.is([...split._left.takeUntil(gt(1))].join(''), 'a');
});

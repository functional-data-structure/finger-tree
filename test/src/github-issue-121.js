import test from 'ava';

import {Measures} from '@aureooms/js-measure';
const {COUNTER} = Measures;

import {gt} from '@aureooms/js-predicate';

import {from} from '../../src/index.js';

test('Cover Lazy#split', (t) => {
	const T = from(COUNTER, 'abcde');
	const split = T.splitTree(gt(2), COUNTER.zero());
	t.is([...split.left.takeUntil(gt(1))].join(''), 'a');
});

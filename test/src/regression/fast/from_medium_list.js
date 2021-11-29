import test from 'ava';

import {range} from '@iterable-iterator/range';
import {tee} from '@iterable-iterator/tee';

import {
	ABSTRACT_COUNTER as COUNTER,
	measure,
	measureToString,
	iterableToString,
} from '../../_fixtures.js';

import {from} from '../../../../src/index.js';

const cover = (t, M, iterable) => {
	const [copy1, copy2, copy3] = tee(iterable, 3);

	const tree = from(M, copy1);

	const expectedMeasure = measure(M, copy2);
	t.is(tree.measure(), expectedMeasure);

	const expectedContents = Array.from(copy3);
	t.deepEqual(Array.from(tree), expectedContents);
};

cover.title = (title, M, iterable) =>
	title ?? `${measureToString(M)} ${iterableToString(iterable)}`;

for (const i of range(145)) {
	test(cover, COUNTER, range(i));
}

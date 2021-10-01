import test from 'ava';

import {tee} from '@iterable-iterator/tee';
import {range} from '@iterable-iterator/range';

import {
	ABSTRACT_COUNTER as COUNTER,
	measure,
	measureToString,
	iterableToString,
} from '../../_fixtures.js';

import {empty} from '../../../../src/index.js';

const macro = (t, M, iterable) => {
	const [copy1, copy2, copy3] = tee(iterable, 3);
	const tree = empty(M).append(copy1);

	t.is(tree.measure(), measure(M, copy2));

	const expected = Array.from(copy3);
	t.deepEqual(Array.from(tree), expected);
};

macro.title = (title, M, iterable) =>
	title ?? `empty(${measureToString(M)}).append(${iterableToString(iterable)})`;

for (const i of range(30)) {
	test(macro, COUNTER, range(i));
}

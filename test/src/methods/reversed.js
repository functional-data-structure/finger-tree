import test from 'ava';

import {Measures} from '@functional-abstraction/measure';
import {list} from '@iterable-iterator/list';
import {range} from '@iterable-iterator/range';
import {reversed} from '@iterable-iterator/reversed';
import {tee} from '@iterable-iterator/tee';

import {from} from '#module';

const {COUNTER} = Measures;

const macro = (t, iterable) => {
	const [copy1, copy2] = tee(iterable, 2);
	const expected = list(reversed(copy1));
	const actual = list(from(COUNTER, copy2).reversed());
	t.deepEqual(actual, expected);
};

macro.title = (title, iterable) =>
	`from(COUNTER, ${title || JSON.stringify(iterable)})`;

test(macro, []);
test('range(0)', macro, range(0));
test(macro, [0]);
test(macro, 'ab');
test(macro, '724');
test(macro, 'abcd');
test('range(9)', macro, range(9));
test('range(1000)', macro, range(1000));
test('range(100000)', macro, range(100_000));

import assert from 'assert';

import 'regenerator-runtime/runtime.js';
import {ArgumentParser} from 'argparse';

import {range} from '@iterable-iterator/range';
import Benchtable from 'benchtable';
import {
	FAST_COUNTER as COUNTER,
	measure,
	measureToString,
	iterableToString,
} from '../test/src/_fixtures.js';

import {dist, dependency, object} from './_fixtures.js';

const parser = new ArgumentParser();
parser.add_argument('filter');
const args = parser.parse_args();
const filter = new RegExp(args.filter, 'i');

const cjs = dist('cjs');
const module = dist('module.js');
const modern = dist('modern.js');
const list = dependency('list');
const array = object('Array', Array);

const suite = new Benchtable('Tree Construction', {isTransposed: false});

const add = async (module, fn) => {
	if (!filter.test(module.name)) return;
	if (!filter.test(fn.name)) return;
	const {title, build} = await fn.compile(module);
	suite.addFunction(
		title,
		(measure, iterable) => {
			build(measure, iterable);
		},
		{
			maxTime: 5,
		},
	);
	if (!filter.test('measure')) return;
	suite.addFunction(
		`${title}.measure`,
		(measure, iterable, expected) => {
			const result = build(measure, iterable).measure();
			if (result !== expected) {
				throw new Error('wrong measure');
			}
		},
		{
			maxTime: 5,
		},
	);
};

const makeFn = ({name: fnName, build}) => ({
	name: fnName,
	compile: async (module) => {
		const {name, version, exports} = await module.load();
		return {
			title: `${name} ${version} #${fnName}`,
			build: build({exports}),
		};
	},
});

const from = makeFn({
	name: 'from',
	build: ({exports}) => {
		const from = exports.from;
		return (measure, iterable) => from(measure, iterable);
	},
});

const append = makeFn({
	name: 'append',
	build: ({exports}) => {
		const empty = exports.empty;
		return (measure, iterable) => empty(measure).append(iterable);
	},
});

const push = makeFn({
	name: 'push',
	build: ({exports}) => {
		const {empty} = exports;
		return (measure, iterable) => {
			let l = empty(measure);
			for (const x of iterable) l = l.push(x);
			return l;
		};
	},
});

const prepend = makeFn({
	name: 'prepend',
	build: ({exports}) => {
		const empty = exports.empty;
		return (measure, iterable) => empty(measure).prepend(iterable);
	},
});

const listFrom = makeFn({
	name: 'from',
	build: ({exports}) => {
		const from = exports.from;
		return (_measure, iterable) => from(iterable);
	},
});

const listAppend = makeFn({
	name: 'push',
	build: ({exports}) => {
		const {empty, append} = exports;
		return (_measure, iterable) => {
			let l = empty();
			for (const x of iterable) l = append(x, l);
			return l;
		};
	},
});

const arrayPush = makeFn({
	name: 'push',
	build: ({exports}) => {
		assert(exports === Array);
		return (_measure, iterable) => {
			const l = [];
			for (const x of iterable) l.push(x);
			return l;
		};
	},
});

await add(cjs, from);
await add(cjs, append);
await add(cjs, prepend);
await add(cjs, push);
await add(module, from);
await add(module, append);
await add(module, prepend);
await add(module, push);
await add(modern, from);
await add(modern, append);
await add(modern, prepend);
await add(modern, push);

await add(list, listFrom);
await add(list, listAppend);
await add(array, listFrom);
await add(array, arrayPush);

const addTitle = (input) => {
	const {measure, iterable} = input;
	const title = `(${measureToString(measure)}, ${iterableToString(iterable)})`;
	return {
		...input,
		title,
	};
};

const addExpected = (input) => {
	const expected = measure(input.measure, input.iterable);
	return {
		...input,
		expected,
	};
};

const benchmarkInputs = [
	{
		measure: COUNTER,
		iterable: range(1000),
	},
	{
		measure: COUNTER,
		iterable: range(10_000),
	},
	{
		measure: COUNTER,
		iterable: range(100_000),
	},
]
	.map(addTitle)
	.map(addExpected);

for (const {title, measure, iterable, expected} of benchmarkInputs) {
	suite.addInput(title, [measure, iterable, expected]);
}

suite.on('cycle', (evt) => {
	console.log(evt.target.name);
});

suite.on('complete', () => {
	console.log(suite.table.toString());
});

suite.run();

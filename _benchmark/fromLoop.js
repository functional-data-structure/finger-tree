import assert from 'assert';

import 'regenerator-runtime/runtime.js';
import {ArgumentParser} from 'argparse';

import {range} from '@iterable-iterator/range';

import Benchtable from 'benchtable';
import {
	FAST_COUNTER as COUNTER,
	measure,
	measureToString,
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
		(measure, n) => {
			build(measure, n);
		},
		{
			maxTime: 5,
		},
	);
	if (!filter.test('measure')) return;
	suite.addFunction(
		`${title}.measure`,
		(measure, n, expected) => {
			const result = build(measure, n).measure();
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

const treePush = makeFn({
	name: 'push',
	build: ({exports}) => {
		const empty = exports.empty;
		return (measure, n) => {
			let l = empty(measure);
			for (let i = 0; i < n; ++i) l = l.push(i);
			return l;
		};
	},
});

const listAppend = makeFn({
	name: 'push',
	build: ({exports}) => {
		const {empty, append} = exports;
		return (_measure, n) => {
			let l = empty();
			for (let i = 0; i < n; ++i) l = append(i, l);
			return l;
		};
	},
});

const arrayPush = makeFn({
	name: 'push',
	build: ({exports}) => {
		assert(exports === Array);
		return (_measure, n) => {
			const l = [];
			for (let i = 0; i < n; ++i) l.push(i);
			return l;
		};
	},
});

await add(cjs, treePush);
await add(module, treePush);
await add(modern, treePush);

await add(list, listAppend);
await add(array, arrayPush);

const addTitle = (input) => {
	const {measure, n} = input;
	const title = `(${measureToString(measure)}, ${n})`;
	return {
		...input,
		title,
	};
};

const addExpected = (input) => {
	const expected = measure(input.measure, range(input.n));
	return {
		...input,
		expected,
	};
};

const benchmarkInputs = [
	{
		measure: COUNTER,
		n: 1000,
	},
	{
		measure: COUNTER,
		n: 10_000,
	},
	{
		measure: COUNTER,
		n: 100_000,
	},
]
	.map(addTitle)
	.map(addExpected);

for (const {title, measure, n, expected} of benchmarkInputs) {
	suite.addInput(title, [measure, n, expected]);
}

suite.on('cycle', (evt) => {
	console.log(evt.target.name);
});

suite.on('complete', () => {
	console.log(suite.table.toString());
});

suite.run();

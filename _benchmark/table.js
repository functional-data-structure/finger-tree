import 'regenerator-runtime/runtime.js';

import {ArgumentParser} from 'argparse';
import Benchtable from 'benchtable';

import {range} from '@iterable-iterator/range';
import {exhaust} from '@iterable-iterator/consume';

import {
	FAST_COUNTER as COUNTER,
	measureToString,
} from '../test/src/_fixtures.js';

import {dist} from './_fixtures.js';

const parser = new ArgumentParser();
parser.add_argument('M');
parser.add_argument('filter');
const args = parser.parse_args();

const filter = new RegExp(args.filter, 'i');
global.range = range;
global.n = args.M;
global.measure = COUNTER;

const suite = new Benchtable('Methods', {isTransposed: false});

const modern = dist('modern.js');
const {name, version, exports} = await modern.load();

const {empty, from} = exports;

global.empty = empty;
global.from = from;

global.t = empty(measure);
global.r = range(n);
global.at = from(measure, r);

const splits = [];
for (let i = 0; i < n; ++i) {
	splits.push(at.split((m) => m > i));
}

global.splits = splits;

const fds_finger_tree = {
	name: '@functional-data-structure/finger-tree',
	compile: async () => ({
		title: `${name} ${version}`,
		methods: {
			push: {
				run: () => {
					let _t = t;
					const _n = n;
					for (let i = 0; i < _n; ++i) _t = _t.push(i);
				},
			},
			cons: {
				run: () => {
					let _t = t;
					const _n = n;
					for (let i = 0; i < _n; ++i) _t = _t.cons(i);
				},
			},
			init: {
				run: () => {
					let _t = at;
					const _n = n;
					for (let i = 0; i < _n; ++i) _t = _t.init();
				},
			},
			tail: {
				run: () => {
					let _t = at;
					const _n = n;
					for (let i = 0; i < _n; ++i) _t = _t.tail();
				},
			},
			append: {
				run: () => {
					at.append(r);
				},
			},
			prepend: {
				run: () => {
					at.prepend(r);
				},
			},
			from: {
				run: () => {
					from(measure, r);
				},
			},
			split: {
				run: () => {
					const _at = at;
					const _n = n;
					for (let i = 0; i < _n; ++i) _at.split((m) => m > i);
				},
			},
			concat: {
				run: () => {
					const _s = splits;
					const _n = n;
					for (let i = 0; i < _n; ++i) _s[i][0].concat(_s[i][1]);
				},
			},
			iterator: {
				run: () => {
					exhaust(at[Symbol.iterator]());
				},
			},
			reversed: {
				run: () => {
					exhaust(at.reversed());
				},
			},
		},
	}),
};

const add = async (module, api, method) => {
	if (!filter.test(module.name)) return;
	if (!filter.test(method)) return;
	const {title, methods} = await api.compile(module);

	suite.addFunction(`${title} #${method}`, methods[method].run, {
		maxTime: 5,
	});
};

await add(modern, fds_finger_tree, 'from');
await add(modern, fds_finger_tree, 'push');
await add(modern, fds_finger_tree, 'cons');
await add(modern, fds_finger_tree, 'init');
await add(modern, fds_finger_tree, 'tail');
await add(modern, fds_finger_tree, 'append');
await add(modern, fds_finger_tree, 'prepend');
await add(modern, fds_finger_tree, 'split');
await add(modern, fds_finger_tree, 'concat');
await add(modern, fds_finger_tree, 'iterator');
await add(modern, fds_finger_tree, 'reversed');

suite.addInput(`(${measureToString(measure)}, ${n})`, []);

suite.on('cycle', (evt) => {
	console.log(`${evt.target.name}: ${evt.target.hz} ops/sec`);
});

suite.on('complete', () => {
	console.log(suite.table.toString());
});

suite.run();

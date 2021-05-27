require('regenerator-runtime/runtime');

const ArgumentParser = require('argparse').ArgumentParser;
const Benchmark = require('benchmark');

const itertools = require('@aureooms/js-itertools');

const qiao_fingertree = require('fingertree');
const fds_finger_tree = require('..');
const fromArray = qiao_fingertree.fromArray;
const empty = fds_finger_tree.empty;
const from = fds_finger_tree.from;

const COUNTER = {
	plus(a, b) {
		return a + b;
	},
	measure(_x) {
		return 1;
	},
	zero() {
		return 0;
	},
};

const parser = new ArgumentParser();
parser.addArgument(['M']);
const args = parser.parseArgs();

global.M = args.M;
global.COUNTER = COUNTER;
global.fromArray = fromArray;
global.empty = empty;
global.from = from;
global.range = itertools.range;

// PUSH

const PUSH = new Benchmark.Suite()
	.on('start', () => {
		console.log('\nPUSH\n==\n');
	})
	.add('Array#push', () => {
		const a = [];
		const _M = M;
		for (let i = 0; i < _M; ++i) a.push(i);
	})
	.add('fingertree#addLast', () => {
		let t = fromArray([]);
		const _M = M;
		for (let i = 0; i < _M; ++i) t = t.addLast(i);
	})
	.add('@functional-data-structure/finger-tree#push', () => {
		let t = empty(COUNTER);
		const _M = M;
		for (let i = 0; i < _M; ++i) t = t.push(i);
	});

if (M <= 1000)
	PUSH.add('Mock#push', () => {
		let m = [];
		const _M = M;
		for (let i = 0; i < _M; ++i) m = m.concat([i]);
	});

PUSH.on('cycle', (event) => {
	console.log(String(event.target));
})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({async: false});

// CONS

const CONS = new Benchmark.Suite().on('start', () => {
	console.log('\nCONS\n==\n');
});

if (M <= 10_000)
	CONS.add('Array#unshift', () => {
		const a = [];
		const _M = M;
		for (let i = 0; i < _M; ++i) a.unshift(i);
	});

CONS.add('fingertree#addFirst', () => {
	let t = fromArray([]);
	const _M = M;
	for (let i = 0; i < _M; ++i) t = t.addFirst(i);
}).add('@functional-data-structure/finger-tree#cons', () => {
	let t = empty(COUNTER);
	const _M = M;
	for (let i = 0; i < _M; ++i) t = t.cons(i);
});
if (M <= 1000)
	CONS.add('Mock#cons', () => {
		let m = [];
		const _M = M;
		for (let i = 0; i < _M; ++i) m = [i].concat(m);
	});

CONS.on('cycle', (event) => {
	console.log(String(event.target));
})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({async: false});

// INIT

const setup = function () {
	let i;
	const a = [];
	const _M = M;
	for (i = 0; i < _M; ++i) a.push(i);
	let qt = fromArray([]);
	for (i = 0; i < _M; ++i) qt = qt.addLast(i);
	let at = empty(COUNTER);
	for (i = 0; i < _M; ++i) at = at.push(i);
};

const INIT = new Benchmark.Suite()
	.on('start', () => {
		console.log('\nINIT\n==\n');
	})
	.add(
		'Array#pop',
		() => {
			const _a = a.slice();
			for (let i = 0; i < _M; ++i) _a.pop();
		},
		{setup},
	)
	.add(
		'fingertree#removeLast',
		() => {
			let _t = qt;
			for (let i = 0; i < _M; ++i) _t = _t.removeLast();
		},
		{setup},
	)
	.add(
		'@functional-data-structure/finger-tree#init',
		() => {
			let _t = at;
			for (let i = 0; i < _M; ++i) _t = _t.init();
		},
		{setup},
	);

if (M <= 1000)
	INIT.add(
		'Mock#init',
		() => {
			let _m = a;
			for (let i = 0; i < _M; ++i) _m = _m.slice(0, -1);
		},
		{setup},
	);

INIT.on('cycle', (event) => {
	console.log(String(event.target));
})
	.on('error', (event) => {
		console.dir(event);
	})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({async: false});

// TAIL

const TAIL = new Benchmark.Suite().on('start', () => {
	console.log('\nTAIL\n==\n');
});

if (M <= 10_000)
	TAIL.add(
		'Array#shift',
		() => {
			const _a = a.slice();
			for (let i = 0; i < _M; ++i) _a.shift();
		},
		{setup},
	);

TAIL.add(
	'fingertree#removeLast',
	() => {
		let _t = qt;
		for (let i = 0; i < _M; ++i) _t = _t.removeFirst();
	},
	{setup},
).add(
	'@functional-data-structure/finger-tree#init',
	() => {
		let _t = at;
		for (let i = 0; i < _M; ++i) _t = _t.tail();
	},
	{setup},
);

if (M <= 1000)
	TAIL.add(
		'Mock#init',
		() => {
			let _m = a;
			for (let i = 0; i < _M; ++i) _m = _m.slice(1);
		},
		{setup},
	);

TAIL.on('cycle', (event) => {
	console.log(String(event.target));
})
	.on('error', (event) => {
		console.dir(event);
	})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({async: false});

// APPEND

const APPEND = new Benchmark.Suite()
	.on('start', () => {
		console.log('\nAPPEND\n==\n');
	})
	.add(
		'@functional-data-structure/finger-tree#append',
		() => {
			at.append(range(M));
		},
		{setup},
	);

if (M <= 1000)
	APPEND.add(
		'Mock#append',
		() => {
			a.concat(Array.from(range(M)));
		},
		{setup},
	);

APPEND.on('cycle', (event) => {
	console.log(String(event.target));
})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({async: false});

// PREPEND

const PREPEND = new Benchmark.Suite()
	.on('start', () => {
		console.log('\nPREPEND\n==\n');
	})
	.add(
		'@functional-data-structure/finger-tree#prepend',
		() => {
			at.prepend(range(M));
		},
		{setup},
	);

if (M <= 1000)
	PREPEND.add(
		'Mock#prepend',
		() => {
			Array.from(range(M)).concat(a);
		},
		{setup},
	);

PREPEND.on('cycle', (event) => {
	console.log(String(event.target));
})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({async: false});

// FROM

new Benchmark.Suite()
	.on('start', () => {
		console.log('\nFROM\n==\n');
	})
	.add('fingertree.fromArray', () => {
		fromArray(Array.from(range(M)));
	})
	.add('@functional-data-structure/finger-tree.from', () => {
		from(COUNTER, range(M));
	})
	.add('Mock.from', () => {
		Array.from(range(M));
	})
	.on('cycle', (event) => {
		console.log(String(event.target));
	})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({async: false});

// SPLIT

const SPLIT = new Benchmark.Suite()
	.on('start', () => {
		console.log('\nSPLIT\n==\n');
	})
	.add(
		'fingertree#split',
		() => {
			const _M = M;
			const _qt = qt;
			for (let i = 0; i < _M; ++i)
				_qt.split((m) => {
					return m > i;
				});
		},
		{setup},
	)
	.add(
		'@functional-data-structure/finger-tree#split',
		() => {
			const _M = M;
			const _at = at;
			for (let i = 0; i < _M; ++i)
				_at.split((m) => {
					return m > i;
				});
		},
		{setup},
	);

if (M < 1000)
	SPLIT.add(
		'Mock#split',
		() => {
			const _M = M;
			const _a = a;
			for (let i = 0; i < _M; ++i) {
				_a.slice(0, i);
				_a.slice(i);
			}
		},
		{setup},
	);

SPLIT.on('cycle', (event) => {
	console.log(String(event.target));
})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({async: false});

// CONCAT

new Benchmark.Suite()
	.on('start', () => {
		console.log('\nCONCAT\n==\n');
	})
	// I had to put this version first because the second uses a lot of memory.
	// This is probably because qiao/fingetree.js keeps references of used thunks.
	.add(
		'@functional-data-structure/finger-tree#concat',
		() => {
			const _M = M;
			const _s = splits;
			for (let i = 0; i < _M; ++i) _s[i][0].concat(_s[i][1]);
		},
		{
			setup() {
				const t = from(COUNTER, range(M));
				const splits = [];
				for (let i = 0; i < M; ++i) {
					splits.push(
						t.split((m) => {
							return m > i;
						}),
					);
				}
			},
			teardown() {
				splits.splice(0);
			},
		},
	)
	.add(
		'fingertree#concat',
		() => {
			const _M = M;
			const _s = splits;
			for (let i = 0; i < _M; ++i) _s[i][0].concat(_s[i][1]);
		},
		{
			setup() {
				const t = fromArray(Array.from(range(M)));
				const splits = [];
				for (let i = 0; i < M; ++i) {
					splits.push(
						t.split((m) => {
							return m > i;
						}),
					);
				}
			},
			teardown() {
				splits.splice(0);
			},
		},
	)
	.on('cycle', (event) => {
		console.log(String(event.target));
	})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({async: false});

require('regenerator-runtime/runtime');

const itertools = require('@aureooms/js-itertools');

const qiao_fingertree = require('fingertree');
const fromArray = qiao_fingertree.fromArray;
const aureooms_fingertree = require('..');
const empty = aureooms_fingertree.empty;
const from = aureooms_fingertree.from;

const COUNTER = {
	plus(a, b) {
		return a + b;
	},
	measure(x) {
		return 1;
	},
	zero() {
		return 0;
	}
};

const ArgumentParser = require('argparse').ArgumentParser;
const parser = new ArgumentParser();
parser.addArgument(['M']);
const args = parser.parseArgs();

global.M = args.M;
global.COUNTER = COUNTER;
global.fromArray = fromArray;
global.empty = empty;
global.from = from;
global.range = itertools.range;

const Benchmark = require('benchmark');

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
	.add('@aureooms/js-fingertree#push', () => {
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

if (M <= 10000)
	CONS.add('Array#unshift', () => {
		const a = [];
		const _M = M;
		for (let i = 0; i < _M; ++i) a.unshift(i);
	});

CONS.add('fingertree#addFirst', () => {
	let t = fromArray([]);
	const _M = M;
	for (let i = 0; i < _M; ++i) t = t.addFirst(i);
}).add('@aureooms/js-fingertree#cons', () => {
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
		{setup}
	)
	.add(
		'fingertree#removeLast',
		() => {
			let _t = qt;
			for (let i = 0; i < _M; ++i) _t = _t.removeLast();
		},
		{setup}
	)
	.add(
		'@aureooms/js-fingertree#init',
		() => {
			let _t = at;
			for (let i = 0; i < _M; ++i) _t = _t.init();
		},
		{setup}
	);

if (M <= 1000)
	INIT.add(
		'Mock#init',
		() => {
			let _m = a;
			for (let i = 0; i < _M; ++i) _m = _m.slice(0, -1);
		},
		{setup}
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

if (M <= 10000)
	TAIL.add(
		'Array#shift',
		() => {
			const _a = a.slice();
			for (let i = 0; i < _M; ++i) _a.shift();
		},
		{setup}
	);

TAIL.add(
	'fingertree#removeLast',
	() => {
		let _t = qt;
		for (let i = 0; i < _M; ++i) _t = _t.removeFirst();
	},
	{setup}
).add(
	'@aureooms/js-fingertree#init',
	() => {
		let _t = at;
		for (let i = 0; i < _M; ++i) _t = _t.tail();
	},
	{setup}
);

if (M <= 1000)
	TAIL.add(
		'Mock#init',
		() => {
			let _m = a;
			for (let i = 0; i < _M; ++i) _m = _m.slice(1);
		},
		{setup}
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
		'@aureooms/js-fingertree#append',
		() => {
			at.append(range(M));
		},
		{setup}
	);

if (M <= 1000)
	APPEND.add(
		'Mock#append',
		() => {
			a.concat(Array.from(range(M)));
		},
		{setup}
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
		'@aureooms/js-fingertree#prepend',
		() => {
			at.prepend(range(M));
		},
		{setup}
	);

if (M <= 1000)
	PREPEND.add(
		'Mock#prepend',
		() => {
			Array.from(range(M)).concat(a);
		},
		{setup}
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
	.add('@aureooms/js-fingertree.from', () => {
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
		{setup}
	)
	.add(
		'@aureooms/js-fingertree#split',
		() => {
			const _M = M;
			const _at = at;
			for (let i = 0; i < _M; ++i)
				_at.split((m) => {
					return m > i;
				});
		},
		{setup}
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
		{setup}
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
		'@aureooms/js-fingertree#concat',
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
						})
					);
				}
			},
			teardown() {
				splits.splice(0);
			}
		}
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
						})
					);
				}
			},
			teardown() {
				splits.splice(0);
			}
		}
	)
	.on('cycle', (event) => {
		console.log(String(event.target));
	})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({async: false});

require('regenerator-runtime/runtime');
const itertools = require('@aureooms/js-itertools');
const fingertree = require('..');
const empty = fingertree.empty;
const from = fingertree.from;

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

let t;
let i;
const length = 100000;

let start = Number(new Date());

console.log('number of operations:', length);

console.time('total');
console.time('cons');
t = from(COUNTER, []);
for (i = 0; i < length; ++i) {
	t = t.cons(i);
}

console.timeEnd('cons');

console.time('tail');
for (i = 0; i < length; ++i) {
	t = t.tail();
}

console.timeEnd('tail');

console.time('push');
t = from(COUNTER, []);
for (i = 0; i < length; ++i) {
	t = t.push(i);
}

console.timeEnd('push');

console.time('init');
for (i = 0; i < length; ++i) {
	t = t.init();
}

console.timeEnd('init');

console.time('prepend');
t = empty(COUNTER).prepend(itertools.range(length));
console.timeEnd('prepend');
console.time('append');
t = empty(COUNTER).append(itertools.range(length));
console.timeEnd('append');

console.time('split');
for (i = 0; i < length; ++i) {
	t.split(function (m) {
		return m > i;
	});
}

console.timeEnd('split');

const time = Number(new Date()) - start;

const splits = [];
for (i = 0; i < length; ++i) {
	splits.push(
		t.split(function (m) {
			return m > i;
		})
	);
}

start = Number(new Date()) - time;

console.time('concat');
for (i = 0; i < length; ++i) {
	t = splits[i][0].concat(splits[i][1]);
}

console.timeEnd('concat');

splits.splice(0);
console.log('total:', Number(new Date()) - start + 'ms');

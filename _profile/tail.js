console.time('prepare');
require('regenerator-runtime/runtime');
const ArgumentParser = require('argparse').ArgumentParser;
const itertools = require('@aureooms/js-itertools');
const empty = require('..').empty;
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
parser.add_argument('M', {default: 1000, nargs: '?'});
parser.add_argument('-N', {default: 1000});
const args = parser.parse_args();
const M = args.M;
const N = args.N;

console.log('number of operations:', M * N);

const t = empty(COUNTER).append(itertools.range(M));
console.timeEnd('prepare');

console.time('tail');
for (let k = 0; k < N; ++k) {
	let x = t;
	for (let i = 0; i < M; ++i) x = x.tail();
}

console.timeEnd('tail');

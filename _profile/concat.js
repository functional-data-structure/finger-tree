console.time('prepare');
require('regenerator-runtime/runtime');
const ArgumentParser = require('argparse').ArgumentParser;
const range = require('@iterable-iterator/range').range;
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

const t = empty(COUNTER).append(range(M));

const splits = [];
for (let j = 0; j < M; ++j)
	splits.push(
		t.split((m) => {
			return m > j;
		}),
	);
console.timeEnd('prepare');

console.time('concat');
for (let k = 0; k < N; ++k)
	for (let i = 0; i < M; ++i) splits[i][0].concat(splits[i][1]);
console.timeEnd('concat');

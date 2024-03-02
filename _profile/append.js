console.time('prepare');
require('regenerator-runtime/runtime');
const range = require('@iterable-iterator/range').range;
const ArgumentParser = require('argparse').ArgumentParser;

// eslint-disable-next-line import/extensions
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

const t = empty(COUNTER);
console.timeEnd('prepare');

console.time('append');
for (let k = 0; k < N; ++k) t.append(range(M));
console.timeEnd('append');

import 'regenerator-runtime/runtime.js';
import {ArgumentParser} from 'argparse';
import {FAST_COUNTER as COUNTER} from '../test/src/_fixtures.js';
import {empty} from './dist/profile/index.js';

console.time('prepare');

const parser = new ArgumentParser();
parser.add_argument('M', {default: 1000, nargs: '?'});
parser.add_argument('-N', {default: 1000});
const args = parser.parse_args();
const M = args.M;
const N = args.N;

console.log('number of operations:', M * N);

const t = empty(COUNTER);
console.timeEnd('prepare');

console.time('push');
for (let k = 0; k < N; ++k) {
	let x = t;
	for (let i = 0; i < M; ++i) x = x.push(i);
}

console.timeEnd('push');

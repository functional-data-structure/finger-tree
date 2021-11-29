import 'regenerator-runtime/runtime.js';
import {ArgumentParser} from 'argparse';
import {range} from '@iterable-iterator/range';
import {FAST_COUNTER as COUNTER} from '../test/src/_fixtures.js';
import {from} from './dist/profile/index.js';

console.time('prepare');

const parser = new ArgumentParser();
parser.add_argument('M', {default: 1000, nargs: '?'});
parser.add_argument('-N', {default: 1000});
const args = parser.parse_args();
const M = args.M;
const N = args.N;

console.log('number of operations:', M * N);

console.timeEnd('prepare');

const r = range(M);
console.time('from+measure');
for (let k = 0; k < N; ++k) from(COUNTER, r).measure();
console.timeEnd('from+measure');

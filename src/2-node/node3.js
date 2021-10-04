import assert from 'assert';

import {CachedMeasure} from '../0-core/index.js';
import {Two} from '../1-digit/2-Two.js';
import {Three} from '../1-digit/3-Three.js';

export function node3(M, a, b, c) {
	assert(
		!(a instanceof Two || a instanceof Three) || M instanceof CachedMeasure,
	);
	assert(
		a instanceof Two || a instanceof Three || !(M instanceof CachedMeasure),
	);
	const digit = new Three(a, b, c);
	digit.measure(M);
	return digit;
}

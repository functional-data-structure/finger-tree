import {CachedMeasure} from './index.js';

const CACHE = new WeakMap();

export function cache(M) {
	if (CACHE.has(M)) return CACHE.get(M);

	const cM = new CachedMeasure(M);
	CACHE.set(M, cM);
	CACHE.set(cM, cM);
	return cM;
}

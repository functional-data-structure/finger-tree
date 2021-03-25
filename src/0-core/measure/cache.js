import {CachedMeasure} from './index.js';

export function cache(M) {
	return M instanceof CachedMeasure ? M : new CachedMeasure(M);
}

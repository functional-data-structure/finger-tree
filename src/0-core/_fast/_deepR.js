import {delay} from '../../4-lazy/index.js';
import {deepR} from '../split/index.js';

export function _deepR(M, left, middle, right) {
	return delay(() => deepR(M, left, middle, right));
}

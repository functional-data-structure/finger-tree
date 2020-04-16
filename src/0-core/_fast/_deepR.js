import {delay} from '../../4-lazy';
import {deepR} from '../split';

export function _deepR(M, left, middle, right) {
	return delay(() => deepR(M, left, middle, right));
}

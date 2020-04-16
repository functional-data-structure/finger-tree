import {delay} from '../../4-lazy';
import {deepL} from '../split';

export function _deepL(M, left, middle, right) {
	return delay(() => deepL(M, left, middle, right));
}

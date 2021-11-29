import assert from 'assert';
import {One} from '../1-digit/1-One.js';
import {Two} from '../1-digit/2-Two.js';
import {Three} from '../1-digit/3-Three.js';
import {Four} from '../1-digit/4-Four.js';

const digitSize = (digit) => {
	assert(
		digit instanceof One ||
			digit instanceof Two ||
			digit instanceof Three ||
			digit instanceof Four,
	);
	if (digit instanceof One) return 1;
	if (digit instanceof Two) return 2;
	if (digit instanceof Three) return 3;
	return 4;
};

export default digitSize;

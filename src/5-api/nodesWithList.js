import assert from 'assert';
import {One} from '../1-digit/1-One.js';
import {Two} from '../1-digit/2-Two.js';
import {Three} from '../1-digit/3-Three.js';
import {Four} from '../1-digit/4-Four.js';

const nodesWithList = (M, left, list, right) => {
	assert(
		left instanceof One ||
			left instanceof Two ||
			left instanceof Three ||
			left instanceof Four,
	);
	assert(Number.isInteger(list.length) && list.length >= 1 && list.length <= 4);
	assert(
		right instanceof One ||
			right instanceof Two ||
			right instanceof Three ||
			right instanceof Four,
	);
	return left._nodes_with_list(M, list, right);
};

export default nodesWithList;

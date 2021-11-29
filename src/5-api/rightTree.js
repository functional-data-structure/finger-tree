import assert from 'assert';
import {Split} from '../0-core/split/Split.js';

const rightTree = (treeSplit) => {
	assert(treeSplit instanceof Split);
	return treeSplit._right;
};

export default rightTree;

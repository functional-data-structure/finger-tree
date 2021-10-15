import assert from 'assert';
import {Split} from '../0-core/split/Split.js';

const leftTree = (treeSplit) => {
	assert(treeSplit instanceof Split);
	return treeSplit._left;
};

export default leftTree;

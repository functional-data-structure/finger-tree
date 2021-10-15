import assert from 'assert';
import {Split} from '../0-core/split/Split.js';

const middleElement = (treeSplit) => {
	assert(treeSplit instanceof Split);
	return treeSplit._middle;
};

export default middleElement;

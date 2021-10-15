import assert from 'assert';
import {Deep} from '../3-tree/implementations/2-Deep.js';

const middleTree = (tree) => {
	assert(tree instanceof Deep);
	return tree._middle;
};

export default middleTree;

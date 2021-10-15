import assert from 'assert';
import {Deep} from '../3-tree/implementations/2-Deep.js';

const leftDigit = (tree) => {
	assert(tree instanceof Deep);
	return tree._left;
};

export default leftDigit;

import assert from 'assert';
import {Deep} from '../3-tree/implementations/2-Deep.js';

const rightDigit = (tree) => {
	assert(tree instanceof Deep);
	return tree._right;
};

export default rightDigit;

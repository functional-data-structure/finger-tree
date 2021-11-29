import assert from 'assert';
import {Tree} from '../3-tree/base/Tree.js';

const embeddedMeasure = (tree) => {
	assert(tree instanceof Tree);
	return tree._force().M;
};

export default embeddedMeasure;

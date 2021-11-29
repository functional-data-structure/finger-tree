import assert from 'assert';
import {Split} from './0-core/split/Split.js';
import {One} from './1-digit/1-One.js';
import {Two} from './1-digit/2-Two.js';
import {Three} from './1-digit/3-Three.js';
import {Four} from './1-digit/4-Four.js';
import {Tree} from './3-tree/base/Tree.js';
import {Empty} from './3-tree/implementations/0-Empty.js';
import {Deep} from './3-tree/implementations/2-Deep.js';

export const empty = (M) => new Empty(M);
export {from} from './0-core/index.js';

export const leftTree = (treeSplit) => {
	assert(treeSplit instanceof Split);
	return treeSplit.left;
};

export const rightTree = (treeSplit) => {
	assert(treeSplit instanceof Split);
	return treeSplit.right;
};

export const middleElement = (treeSplit) => {
	assert(treeSplit instanceof Split);
	return treeSplit.middle;
};

export const leftDigit = (tree) => {
	assert(tree instanceof Deep);
	return tree.left;
};

export const rightDigit = (tree) => {
	assert(tree instanceof Deep);
	return tree.right;
};

export const middleTree = (tree) => {
	assert(tree instanceof Deep);
	return tree.middle;
};

export const embeddedMeasure = (tree) => {
	assert(tree instanceof Tree);
	return tree.force().M;
};

export const nodes = (M, left, right) => {
	assert(
		left instanceof One ||
			left instanceof Two ||
			left instanceof Three ||
			left instanceof Four,
	);
	assert(
		right instanceof One ||
			right instanceof Two ||
			right instanceof Three ||
			right instanceof Four,
	);
	return left._nodes(M, right);
};

export const nodesWithList = (M, left, list, right) => {
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

export const digitSize = (digit) => {
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

import {Empty} from '../3-tree/index.js';

const EMPTY = new WeakMap();

const empty = (M) => {
	if (EMPTY.has(M)) return EMPTY.get(M);

	const tree = new Empty(M);
	EMPTY.set(M, tree);
	return tree;
};

export default empty;

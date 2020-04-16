export function append(tree, iterable) {
	for (const value of iterable) tree = tree.push(value);

	return tree;
}

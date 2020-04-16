import {Lazy} from '.';

/**
 * Wraps a tree-returning function with a tree proxy that will shallow evaluate
 * as soon as a method is called on it.
 *
 * @param {Function} thunk The function that evaluates to the underlying tree.
 * @returns {Tree} The lazy tree.
 */
export function delay(thunk) {
	return new Lazy(thunk);
}

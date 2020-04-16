import {append, prepend} from '../../0-core';

/**
 * Base class for all implementations.
 */
export function Tree() {}

/**
 * For performance purposes, some of the operations are implemented lazily.
 * This method will force the (shallow) evaluation of this tree. This is an
 * implementation detail and need not be used by the user directly.
 *
 * @returns {Tree} The shallow evaluated tree.
 */
Tree.prototype.force = function () {
	return this;
};

/**
 * Returns a tree that contains a prefix of this tree's values left-to-right list.
 * The prefix is defined by containing all values for which the
 * input predicate evaluates to `false` on the measure
 * of the prefix ending with that value. The input predicate must be monotone
 * (`false` then `true`).
 *
 * @example
 * // returns 'ab'
 * import { from } from '@aureooms/js-fingertree' ;
 * import { Measures : { SIZE } } from '@aureooms/js-measure' ;
 * let tree = from( SIZE , 'abc' ) ;
 * tree = tree.takeUntil( measure => measure > 2 ) ;
 * [ ...tree ].join('') ;
 *
 * @param {Function} predicate The input measure predicate (monotone).
 *
 * @returns {Tree} The output tree.
 */
Tree.prototype.takeUntil = function (predicate) {
	return this.split(predicate)[0];
};

/**
 * Returns a tree that contains a suffix of this tree's values left-to-right
 * list. The suffix is defined by containing all values for which the input
 * predicate evaluates to `true` on the measure of the prefix ending with that
 * value. The input predicate must be monotone (`false` then `true`).
 *
 * @example
 * // returns 'c'
 * import { from } from '@aureooms/js-fingertree' ;
 * import { Measures : { SIZE } } from '@aureooms/js-measure' ;
 * let tree = from( SIZE , 'abc' ) ;
 * tree = tree.dropUntil( measure => measure > 2 ) ;
 * [ ...tree ].join('') ;
 *
 * @param {Function} predicate The input measure predicate (monotone).
 *
 * @returns {Tree} The output tree.
 */
Tree.prototype.dropUntil = function (predicate) {
	return this.split(predicate)[1];
};

/**
 * Returns a tree that contains all values of this tree in-order followed by
 * all values of the input iterable in-order.
 *
 * @example
 * // returns 'abc123'
 * import { from } from '@aureooms/js-fingertree' ;
 * import { Measures : { SIZE } } from '@aureooms/js-measure' ;
 * let tree = from( SIZE , 'abc' ).append('123') ;
 * [ ...tree ].join('') ;
 *
 * @param {Iterable} iterable The input iterable.
 *
 * @returns {Tree} The output tree.
 */
Tree.prototype.append = function (iterable) {
	return append(this, iterable);
};

/**
 * Returns a tree that contains all values of the input iterable in-order
 * followed by all values of this tree in-order.
 *
 * @example
 * // returns '123abc'
 * import { from } from '@aureooms/js-fingertree' ;
 * import { Measures : { SIZE } } from '@aureooms/js-measure' ;
 * let tree = from( SIZE , 'abc' ).prepend('123') ;
 * [ ...tree ].join('') ;
 *
 * @param {Iterable} iterable The input iterable.
 *
 * @returns {Tree} The output tree.
 */
Tree.prototype.prepend = function (iterable) {
	return prepend(this, iterable);
};

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = Tree;

var _core = require('../../0-core');

/**
 * Base class for all implementations.
 */
function Tree() {}

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
  return (0, _core.append)(this, iterable);
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
  return (0, _core.prepend)(this, iterable);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8zLXRyZWUvYmFzZS9UcmVlLmpzIl0sIm5hbWVzIjpbIlRyZWUiLCJwcm90b3R5cGUiLCJmb3JjZSIsInRha2VVbnRpbCIsInByZWRpY2F0ZSIsInNwbGl0IiwiZHJvcFVudGlsIiwiYXBwZW5kIiwiaXRlcmFibGUiLCJwcmVwZW5kIl0sIm1hcHBpbmdzIjoiOzs7OztRQUtnQkEsSSxHQUFBQSxJOztBQUxoQjs7QUFFQTs7O0FBR08sU0FBU0EsSUFBVCxHQUFrQixDQUFHOztBQUU1Qjs7Ozs7OztBQU9BQSxLQUFLQyxTQUFMLENBQWVDLEtBQWYsR0FBdUIsWUFBYTtBQUNuQyxTQUFPLElBQVA7QUFDQSxDQUZEOztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBRixLQUFLQyxTQUFMLENBQWVFLFNBQWYsR0FBMkIsVUFBV0MsU0FBWCxFQUF1QjtBQUNqRCxTQUFPLEtBQUtDLEtBQUwsQ0FBWUQsU0FBWixFQUF3QixDQUF4QixDQUFQO0FBQ0EsQ0FGRDs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBSixLQUFLQyxTQUFMLENBQWVLLFNBQWYsR0FBMkIsVUFBV0YsU0FBWCxFQUF1QjtBQUNqRCxTQUFPLEtBQUtDLEtBQUwsQ0FBWUQsU0FBWixFQUF3QixDQUF4QixDQUFQO0FBQ0EsQ0FGRDs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUFKLEtBQUtDLFNBQUwsQ0FBZU0sTUFBZixHQUF3QixVQUFXQyxRQUFYLEVBQXNCO0FBQzdDLFNBQU8sa0JBQVEsSUFBUixFQUFlQSxRQUFmLENBQVA7QUFDQSxDQUZEOztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQVIsS0FBS0MsU0FBTCxDQUFlUSxPQUFmLEdBQXlCLFVBQVdELFFBQVgsRUFBc0I7QUFDOUMsU0FBTyxtQkFBUyxJQUFULEVBQWdCQSxRQUFoQixDQUFQO0FBQ0EsQ0FGRCIsImZpbGUiOiJUcmVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXBwZW5kICwgcHJlcGVuZCB9IGZyb20gJy4uLy4uLzAtY29yZScgO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBpbXBsZW1lbnRhdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUcmVlICggKSB7IH1cblxuLyoqXG4gKiBGb3IgcGVyZm9ybWFuY2UgcHVycG9zZXMsIHNvbWUgb2YgdGhlIG9wZXJhdGlvbnMgYXJlIGltcGxlbWVudGVkIGxhemlseS5cbiAqIFRoaXMgbWV0aG9kIHdpbGwgZm9yY2UgdGhlIChzaGFsbG93KSBldmFsdWF0aW9uIG9mIHRoaXMgdHJlZS4gVGhpcyBpcyBhblxuICogaW1wbGVtZW50YXRpb24gZGV0YWlsIGFuZCBuZWVkIG5vdCBiZSB1c2VkIGJ5IHRoZSB1c2VyIGRpcmVjdGx5LlxuICpcbiAqIEByZXR1cm5zIHtUcmVlfSBUaGUgc2hhbGxvdyBldmFsdWF0ZWQgdHJlZS5cbiAqL1xuVHJlZS5wcm90b3R5cGUuZm9yY2UgPSBmdW5jdGlvbiAoICkge1xuXHRyZXR1cm4gdGhpcyA7XG59IDtcblxuLyoqXG4gKiBSZXR1cm5zIGEgdHJlZSB0aGF0IGNvbnRhaW5zIGEgcHJlZml4IG9mIHRoaXMgdHJlZSdzIHZhbHVlcyBsZWZ0LXRvLXJpZ2h0IGxpc3QuXG4gKiBUaGUgcHJlZml4IGlzIGRlZmluZWQgYnkgY29udGFpbmluZyBhbGwgdmFsdWVzIGZvciB3aGljaCB0aGVcbiAqIGlucHV0IHByZWRpY2F0ZSBldmFsdWF0ZXMgdG8gYGZhbHNlYCBvbiB0aGUgbWVhc3VyZVxuICogb2YgdGhlIHByZWZpeCBlbmRpbmcgd2l0aCB0aGF0IHZhbHVlLiBUaGUgaW5wdXQgcHJlZGljYXRlIG11c3QgYmUgbW9ub3RvbmVcbiAqIChgZmFsc2VgIHRoZW4gYHRydWVgKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gcmV0dXJucyAnYWInXG4gKiBpbXBvcnQgeyBmcm9tIH0gZnJvbSAnQGF1cmVvb21zL2pzLWZpbmdlcnRyZWUnIDtcbiAqIGltcG9ydCB7IE1lYXN1cmVzIDogeyBTSVpFIH0gfSBmcm9tICdAYXVyZW9vbXMvanMtbWVhc3VyZScgO1xuICogbGV0IHRyZWUgPSBmcm9tKCBTSVpFICwgJ2FiYycgKSA7XG4gKiB0cmVlID0gdHJlZS50YWtlVW50aWwoIG1lYXN1cmUgPT4gbWVhc3VyZSA+IDIgKSA7XG4gKiBbIC4uLnRyZWUgXS5qb2luKCcnKSA7XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBpbnB1dCBtZWFzdXJlIHByZWRpY2F0ZSAobW9ub3RvbmUpLlxuICpcbiAqIEByZXR1cm5zIHtUcmVlfSBUaGUgb3V0cHV0IHRyZWUuXG4gKi9cblRyZWUucHJvdG90eXBlLnRha2VVbnRpbCA9IGZ1bmN0aW9uICggcHJlZGljYXRlICkge1xuXHRyZXR1cm4gdGhpcy5zcGxpdCggcHJlZGljYXRlIClbMF0gO1xufSA7XG5cbi8qKlxuICogUmV0dXJucyBhIHRyZWUgdGhhdCBjb250YWlucyBhIHN1ZmZpeCBvZiB0aGlzIHRyZWUncyB2YWx1ZXMgbGVmdC10by1yaWdodFxuICogbGlzdC4gVGhlIHN1ZmZpeCBpcyBkZWZpbmVkIGJ5IGNvbnRhaW5pbmcgYWxsIHZhbHVlcyBmb3Igd2hpY2ggdGhlIGlucHV0XG4gKiBwcmVkaWNhdGUgZXZhbHVhdGVzIHRvIGB0cnVlYCBvbiB0aGUgbWVhc3VyZSBvZiB0aGUgcHJlZml4IGVuZGluZyB3aXRoIHRoYXRcbiAqIHZhbHVlLiBUaGUgaW5wdXQgcHJlZGljYXRlIG11c3QgYmUgbW9ub3RvbmUgKGBmYWxzZWAgdGhlbiBgdHJ1ZWApLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyByZXR1cm5zICdjJ1xuICogaW1wb3J0IHsgZnJvbSB9IGZyb20gJ0BhdXJlb29tcy9qcy1maW5nZXJ0cmVlJyA7XG4gKiBpbXBvcnQgeyBNZWFzdXJlcyA6IHsgU0laRSB9IH0gZnJvbSAnQGF1cmVvb21zL2pzLW1lYXN1cmUnIDtcbiAqIGxldCB0cmVlID0gZnJvbSggU0laRSAsICdhYmMnICkgO1xuICogdHJlZSA9IHRyZWUuZHJvcFVudGlsKCBtZWFzdXJlID0+IG1lYXN1cmUgPiAyICkgO1xuICogWyAuLi50cmVlIF0uam9pbignJykgO1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgaW5wdXQgbWVhc3VyZSBwcmVkaWNhdGUgKG1vbm90b25lKS5cbiAqXG4gKiBAcmV0dXJucyB7VHJlZX0gVGhlIG91dHB1dCB0cmVlLlxuICovXG5UcmVlLnByb3RvdHlwZS5kcm9wVW50aWwgPSBmdW5jdGlvbiAoIHByZWRpY2F0ZSApIHtcblx0cmV0dXJuIHRoaXMuc3BsaXQoIHByZWRpY2F0ZSApWzFdIDtcbn0gO1xuXG4vKipcbiAqIFJldHVybnMgYSB0cmVlIHRoYXQgY29udGFpbnMgYWxsIHZhbHVlcyBvZiB0aGlzIHRyZWUgaW4tb3JkZXIgZm9sbG93ZWQgYnlcbiAqIGFsbCB2YWx1ZXMgb2YgdGhlIGlucHV0IGl0ZXJhYmxlIGluLW9yZGVyLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyByZXR1cm5zICdhYmMxMjMnXG4gKiBpbXBvcnQgeyBmcm9tIH0gZnJvbSAnQGF1cmVvb21zL2pzLWZpbmdlcnRyZWUnIDtcbiAqIGltcG9ydCB7IE1lYXN1cmVzIDogeyBTSVpFIH0gfSBmcm9tICdAYXVyZW9vbXMvanMtbWVhc3VyZScgO1xuICogbGV0IHRyZWUgPSBmcm9tKCBTSVpFICwgJ2FiYycgKS5hcHBlbmQoJzEyMycpIDtcbiAqIFsgLi4udHJlZSBdLmpvaW4oJycpIDtcbiAqXG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSBpdGVyYWJsZSBUaGUgaW5wdXQgaXRlcmFibGUuXG4gKlxuICogQHJldHVybnMge1RyZWV9IFRoZSBvdXRwdXQgdHJlZS5cbiAqL1xuVHJlZS5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKCBpdGVyYWJsZSApIHtcblx0cmV0dXJuIGFwcGVuZCggdGhpcyAsIGl0ZXJhYmxlICkgO1xufSA7XG5cbi8qKlxuICogUmV0dXJucyBhIHRyZWUgdGhhdCBjb250YWlucyBhbGwgdmFsdWVzIG9mIHRoZSBpbnB1dCBpdGVyYWJsZSBpbi1vcmRlclxuICogZm9sbG93ZWQgYnkgYWxsIHZhbHVlcyBvZiB0aGlzIHRyZWUgaW4tb3JkZXIuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIHJldHVybnMgJzEyM2FiYydcbiAqIGltcG9ydCB7IGZyb20gfSBmcm9tICdAYXVyZW9vbXMvanMtZmluZ2VydHJlZScgO1xuICogaW1wb3J0IHsgTWVhc3VyZXMgOiB7IFNJWkUgfSB9IGZyb20gJ0BhdXJlb29tcy9qcy1tZWFzdXJlJyA7XG4gKiBsZXQgdHJlZSA9IGZyb20oIFNJWkUgLCAnYWJjJyApLnByZXBlbmQoJzEyMycpIDtcbiAqIFsgLi4udHJlZSBdLmpvaW4oJycpIDtcbiAqXG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSBpdGVyYWJsZSBUaGUgaW5wdXQgaXRlcmFibGUuXG4gKlxuICogQHJldHVybnMge1RyZWV9IFRoZSBvdXRwdXQgdHJlZS5cbiAqL1xuVHJlZS5wcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uICggaXRlcmFibGUgKSB7XG5cdHJldHVybiBwcmVwZW5kKCB0aGlzICwgaXRlcmFibGUgKSA7XG59IDtcbiJdfQ==
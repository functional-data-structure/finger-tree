"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = Tree;

var _core = require("../../0-core");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8zLXRyZWUvYmFzZS9UcmVlLmpzIl0sIm5hbWVzIjpbIlRyZWUiLCJwcm90b3R5cGUiLCJmb3JjZSIsInRha2VVbnRpbCIsInByZWRpY2F0ZSIsInNwbGl0IiwiZHJvcFVudGlsIiwiYXBwZW5kIiwiaXRlcmFibGUiLCJwcmVwZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7OztBQUdPLFNBQVNBLElBQVQsR0FBa0IsQ0FBRztBQUU1Qjs7Ozs7Ozs7O0FBT0FBLElBQUksQ0FBQ0MsU0FBTCxDQUFlQyxLQUFmLEdBQXVCLFlBQWE7QUFDbkMsU0FBTyxJQUFQO0FBQ0EsQ0FGRDtBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkFGLElBQUksQ0FBQ0MsU0FBTCxDQUFlRSxTQUFmLEdBQTJCLFVBQVdDLFNBQVgsRUFBdUI7QUFDakQsU0FBTyxLQUFLQyxLQUFMLENBQVlELFNBQVosRUFBd0IsQ0FBeEIsQ0FBUDtBQUNBLENBRkQ7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkFKLElBQUksQ0FBQ0MsU0FBTCxDQUFlSyxTQUFmLEdBQTJCLFVBQVdGLFNBQVgsRUFBdUI7QUFDakQsU0FBTyxLQUFLQyxLQUFMLENBQVlELFNBQVosRUFBd0IsQ0FBeEIsQ0FBUDtBQUNBLENBRkQ7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQUosSUFBSSxDQUFDQyxTQUFMLENBQWVNLE1BQWYsR0FBd0IsVUFBV0MsUUFBWCxFQUFzQjtBQUM3QyxTQUFPLGtCQUFRLElBQVIsRUFBZUEsUUFBZixDQUFQO0FBQ0EsQ0FGRDtBQUlBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWVBUixJQUFJLENBQUNDLFNBQUwsQ0FBZVEsT0FBZixHQUF5QixVQUFXRCxRQUFYLEVBQXNCO0FBQzlDLFNBQU8sbUJBQVMsSUFBVCxFQUFnQkEsUUFBaEIsQ0FBUDtBQUNBLENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHBlbmQgLCBwcmVwZW5kIH0gZnJvbSAnLi4vLi4vMC1jb3JlJyA7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYWxsIGltcGxlbWVudGF0aW9ucy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRyZWUgKCApIHsgfVxuXG4vKipcbiAqIEZvciBwZXJmb3JtYW5jZSBwdXJwb3Nlcywgc29tZSBvZiB0aGUgb3BlcmF0aW9ucyBhcmUgaW1wbGVtZW50ZWQgbGF6aWx5LlxuICogVGhpcyBtZXRob2Qgd2lsbCBmb3JjZSB0aGUgKHNoYWxsb3cpIGV2YWx1YXRpb24gb2YgdGhpcyB0cmVlLiBUaGlzIGlzIGFuXG4gKiBpbXBsZW1lbnRhdGlvbiBkZXRhaWwgYW5kIG5lZWQgbm90IGJlIHVzZWQgYnkgdGhlIHVzZXIgZGlyZWN0bHkuXG4gKlxuICogQHJldHVybnMge1RyZWV9IFRoZSBzaGFsbG93IGV2YWx1YXRlZCB0cmVlLlxuICovXG5UcmVlLnByb3RvdHlwZS5mb3JjZSA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzIDtcbn0gO1xuXG4vKipcbiAqIFJldHVybnMgYSB0cmVlIHRoYXQgY29udGFpbnMgYSBwcmVmaXggb2YgdGhpcyB0cmVlJ3MgdmFsdWVzIGxlZnQtdG8tcmlnaHQgbGlzdC5cbiAqIFRoZSBwcmVmaXggaXMgZGVmaW5lZCBieSBjb250YWluaW5nIGFsbCB2YWx1ZXMgZm9yIHdoaWNoIHRoZVxuICogaW5wdXQgcHJlZGljYXRlIGV2YWx1YXRlcyB0byBgZmFsc2VgIG9uIHRoZSBtZWFzdXJlXG4gKiBvZiB0aGUgcHJlZml4IGVuZGluZyB3aXRoIHRoYXQgdmFsdWUuIFRoZSBpbnB1dCBwcmVkaWNhdGUgbXVzdCBiZSBtb25vdG9uZVxuICogKGBmYWxzZWAgdGhlbiBgdHJ1ZWApLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyByZXR1cm5zICdhYidcbiAqIGltcG9ydCB7IGZyb20gfSBmcm9tICdAYXVyZW9vbXMvanMtZmluZ2VydHJlZScgO1xuICogaW1wb3J0IHsgTWVhc3VyZXMgOiB7IFNJWkUgfSB9IGZyb20gJ0BhdXJlb29tcy9qcy1tZWFzdXJlJyA7XG4gKiBsZXQgdHJlZSA9IGZyb20oIFNJWkUgLCAnYWJjJyApIDtcbiAqIHRyZWUgPSB0cmVlLnRha2VVbnRpbCggbWVhc3VyZSA9PiBtZWFzdXJlID4gMiApIDtcbiAqIFsgLi4udHJlZSBdLmpvaW4oJycpIDtcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGlucHV0IG1lYXN1cmUgcHJlZGljYXRlIChtb25vdG9uZSkuXG4gKlxuICogQHJldHVybnMge1RyZWV9IFRoZSBvdXRwdXQgdHJlZS5cbiAqL1xuVHJlZS5wcm90b3R5cGUudGFrZVVudGlsID0gZnVuY3Rpb24gKCBwcmVkaWNhdGUgKSB7XG5cdHJldHVybiB0aGlzLnNwbGl0KCBwcmVkaWNhdGUgKVswXSA7XG59IDtcblxuLyoqXG4gKiBSZXR1cm5zIGEgdHJlZSB0aGF0IGNvbnRhaW5zIGEgc3VmZml4IG9mIHRoaXMgdHJlZSdzIHZhbHVlcyBsZWZ0LXRvLXJpZ2h0XG4gKiBsaXN0LiBUaGUgc3VmZml4IGlzIGRlZmluZWQgYnkgY29udGFpbmluZyBhbGwgdmFsdWVzIGZvciB3aGljaCB0aGUgaW5wdXRcbiAqIHByZWRpY2F0ZSBldmFsdWF0ZXMgdG8gYHRydWVgIG9uIHRoZSBtZWFzdXJlIG9mIHRoZSBwcmVmaXggZW5kaW5nIHdpdGggdGhhdFxuICogdmFsdWUuIFRoZSBpbnB1dCBwcmVkaWNhdGUgbXVzdCBiZSBtb25vdG9uZSAoYGZhbHNlYCB0aGVuIGB0cnVlYCkuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIHJldHVybnMgJ2MnXG4gKiBpbXBvcnQgeyBmcm9tIH0gZnJvbSAnQGF1cmVvb21zL2pzLWZpbmdlcnRyZWUnIDtcbiAqIGltcG9ydCB7IE1lYXN1cmVzIDogeyBTSVpFIH0gfSBmcm9tICdAYXVyZW9vbXMvanMtbWVhc3VyZScgO1xuICogbGV0IHRyZWUgPSBmcm9tKCBTSVpFICwgJ2FiYycgKSA7XG4gKiB0cmVlID0gdHJlZS5kcm9wVW50aWwoIG1lYXN1cmUgPT4gbWVhc3VyZSA+IDIgKSA7XG4gKiBbIC4uLnRyZWUgXS5qb2luKCcnKSA7XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBpbnB1dCBtZWFzdXJlIHByZWRpY2F0ZSAobW9ub3RvbmUpLlxuICpcbiAqIEByZXR1cm5zIHtUcmVlfSBUaGUgb3V0cHV0IHRyZWUuXG4gKi9cblRyZWUucHJvdG90eXBlLmRyb3BVbnRpbCA9IGZ1bmN0aW9uICggcHJlZGljYXRlICkge1xuXHRyZXR1cm4gdGhpcy5zcGxpdCggcHJlZGljYXRlIClbMV0gO1xufSA7XG5cbi8qKlxuICogUmV0dXJucyBhIHRyZWUgdGhhdCBjb250YWlucyBhbGwgdmFsdWVzIG9mIHRoaXMgdHJlZSBpbi1vcmRlciBmb2xsb3dlZCBieVxuICogYWxsIHZhbHVlcyBvZiB0aGUgaW5wdXQgaXRlcmFibGUgaW4tb3JkZXIuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIHJldHVybnMgJ2FiYzEyMydcbiAqIGltcG9ydCB7IGZyb20gfSBmcm9tICdAYXVyZW9vbXMvanMtZmluZ2VydHJlZScgO1xuICogaW1wb3J0IHsgTWVhc3VyZXMgOiB7IFNJWkUgfSB9IGZyb20gJ0BhdXJlb29tcy9qcy1tZWFzdXJlJyA7XG4gKiBsZXQgdHJlZSA9IGZyb20oIFNJWkUgLCAnYWJjJyApLmFwcGVuZCgnMTIzJykgO1xuICogWyAuLi50cmVlIF0uam9pbignJykgO1xuICpcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGl0ZXJhYmxlIFRoZSBpbnB1dCBpdGVyYWJsZS5cbiAqXG4gKiBAcmV0dXJucyB7VHJlZX0gVGhlIG91dHB1dCB0cmVlLlxuICovXG5UcmVlLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoIGl0ZXJhYmxlICkge1xuXHRyZXR1cm4gYXBwZW5kKCB0aGlzICwgaXRlcmFibGUgKSA7XG59IDtcblxuLyoqXG4gKiBSZXR1cm5zIGEgdHJlZSB0aGF0IGNvbnRhaW5zIGFsbCB2YWx1ZXMgb2YgdGhlIGlucHV0IGl0ZXJhYmxlIGluLW9yZGVyXG4gKiBmb2xsb3dlZCBieSBhbGwgdmFsdWVzIG9mIHRoaXMgdHJlZSBpbi1vcmRlci5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gcmV0dXJucyAnMTIzYWJjJ1xuICogaW1wb3J0IHsgZnJvbSB9IGZyb20gJ0BhdXJlb29tcy9qcy1maW5nZXJ0cmVlJyA7XG4gKiBpbXBvcnQgeyBNZWFzdXJlcyA6IHsgU0laRSB9IH0gZnJvbSAnQGF1cmVvb21zL2pzLW1lYXN1cmUnIDtcbiAqIGxldCB0cmVlID0gZnJvbSggU0laRSAsICdhYmMnICkucHJlcGVuZCgnMTIzJykgO1xuICogWyAuLi50cmVlIF0uam9pbignJykgO1xuICpcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGl0ZXJhYmxlIFRoZSBpbnB1dCBpdGVyYWJsZS5cbiAqXG4gKiBAcmV0dXJucyB7VHJlZX0gVGhlIG91dHB1dCB0cmVlLlxuICovXG5UcmVlLnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24gKCBpdGVyYWJsZSApIHtcblx0cmV0dXJuIHByZXBlbmQoIHRoaXMgLCBpdGVyYWJsZSApIDtcbn0gO1xuIl19
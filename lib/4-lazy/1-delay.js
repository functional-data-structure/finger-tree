'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = delay;

var _ = require('.');

/**
 * Wraps a tree-returning function with a tree proxy that will shallow evaluate
 * as soon as a method is called on it.
 *
 * @param Function thunk The function that evaluates to the underlying tree.
 * @returns {Tree} The lazy tree.
 */
function delay(thunk) {
  return new _.Lazy(thunk);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy80LWxhenkvMS1kZWxheS5qcyJdLCJuYW1lcyI6WyJkZWxheSIsInRodW5rIl0sIm1hcHBpbmdzIjoiOzs7OztRQVNnQkEsSyxHQUFBQSxLOztBQVRoQjs7QUFFQTs7Ozs7OztBQU9PLFNBQVNBLEtBQVQsQ0FBaUJDLEtBQWpCLEVBQXlCO0FBQy9CLFNBQU8sV0FBVUEsS0FBVixDQUFQO0FBQ0EiLCJmaWxlIjoiMS1kZWxheS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExhenkgfSBmcm9tICcuJyA7XG5cbi8qKlxuICogV3JhcHMgYSB0cmVlLXJldHVybmluZyBmdW5jdGlvbiB3aXRoIGEgdHJlZSBwcm94eSB0aGF0IHdpbGwgc2hhbGxvdyBldmFsdWF0ZVxuICogYXMgc29vbiBhcyBhIG1ldGhvZCBpcyBjYWxsZWQgb24gaXQuXG4gKlxuICogQHBhcmFtIEZ1bmN0aW9uIHRodW5rIFRoZSBmdW5jdGlvbiB0aGF0IGV2YWx1YXRlcyB0byB0aGUgdW5kZXJseWluZyB0cmVlLlxuICogQHJldHVybnMge1RyZWV9IFRoZSBsYXp5IHRyZWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxheSAoIHRodW5rICkge1xuXHRyZXR1cm4gbmV3IExhenkoIHRodW5rICkgO1xufVxuIl19
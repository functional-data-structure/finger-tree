"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = delay;

var _ = require(".");

/**
 * Wraps a tree-returning function with a tree proxy that will shallow evaluate
 * as soon as a method is called on it.
 *
 * @param {Function} thunk The function that evaluates to the underlying tree.
 * @returns {Tree} The lazy tree.
 */
function delay(thunk) {
  return new _.Lazy(thunk);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy80LWxhenkvMS1kZWxheS5qcyJdLCJuYW1lcyI6WyJkZWxheSIsInRodW5rIiwiTGF6eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOzs7Ozs7O0FBT08sU0FBU0EsS0FBVCxDQUFpQkMsS0FBakIsRUFBeUI7QUFDL0IsU0FBTyxJQUFJQyxNQUFKLENBQVVELEtBQVYsQ0FBUDtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGF6eSB9IGZyb20gJy4nIDtcblxuLyoqXG4gKiBXcmFwcyBhIHRyZWUtcmV0dXJuaW5nIGZ1bmN0aW9uIHdpdGggYSB0cmVlIHByb3h5IHRoYXQgd2lsbCBzaGFsbG93IGV2YWx1YXRlXG4gKiBhcyBzb29uIGFzIGEgbWV0aG9kIGlzIGNhbGxlZCBvbiBpdC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0aHVuayBUaGUgZnVuY3Rpb24gdGhhdCBldmFsdWF0ZXMgdG8gdGhlIHVuZGVybHlpbmcgdHJlZS5cbiAqIEByZXR1cm5zIHtUcmVlfSBUaGUgbGF6eSB0cmVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsYXkgKCB0aHVuayApIHtcblx0cmV0dXJuIG5ldyBMYXp5KCB0aHVuayApIDtcbn1cbiJdfQ==
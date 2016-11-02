'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepR = deepR;

var _tree = require('../../3-tree');

var _lazy = require('../../4-lazy');

var _fast = require('../_fast');

/**
 * @param {Measure} M
 * @param {Digit} left
 * @param {FingerTree} middle
 * @param {Array} right
 */
function deepR(M, left, middle, right) {

  if (right.length === 0) {

    if (middle.empty()) return (0, _fast._from_digit)(M, left);

    return new _tree.Deep(M, left, (0, _lazy.delay)(function () {
      return middle.init();
    }), middle.last().digit());
  }

  return new _tree.Deep(M, left, middle, (0, _fast._digit)(right));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wLWNvcmUvc3BsaXQvZGVlcFIuanMiXSwibmFtZXMiOlsiZGVlcFIiLCJNIiwibGVmdCIsIm1pZGRsZSIsInJpZ2h0IiwibGVuZ3RoIiwiZW1wdHkiLCJpbml0IiwibGFzdCIsImRpZ2l0Il0sIm1hcHBpbmdzIjoiOzs7OztRQVVnQkEsSyxHQUFBQSxLOztBQVZoQjs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O0FBTU8sU0FBU0EsS0FBVCxDQUFpQkMsQ0FBakIsRUFBcUJDLElBQXJCLEVBQTRCQyxNQUE1QixFQUFxQ0MsS0FBckMsRUFBNkM7O0FBRW5ELE1BQUtBLE1BQU1DLE1BQU4sS0FBaUIsQ0FBdEIsRUFBMEI7O0FBRXpCLFFBQUtGLE9BQU9HLEtBQVAsRUFBTCxFQUF1QixPQUFPLHVCQUFhTCxDQUFiLEVBQWlCQyxJQUFqQixDQUFQOztBQUV2QixXQUFPLGVBQVVELENBQVYsRUFBY0MsSUFBZCxFQUFxQixpQkFBTztBQUFBLGFBQU9DLE9BQU9JLElBQVAsRUFBUDtBQUFBLEtBQVAsQ0FBckIsRUFBc0RKLE9BQU9LLElBQVAsR0FBZUMsS0FBZixFQUF0RCxDQUFQO0FBQ0E7O0FBRUQsU0FBTyxlQUFVUixDQUFWLEVBQWNDLElBQWQsRUFBcUJDLE1BQXJCLEVBQThCLGtCQUFRQyxLQUFSLENBQTlCLENBQVA7QUFFQSIsImZpbGUiOiJkZWVwUi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlZXAgfSBmcm9tICcuLi8uLi8zLXRyZWUnIDtcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAnLi4vLi4vNC1sYXp5JyA7XG5pbXBvcnQgeyBfZnJvbV9kaWdpdCAsIF9kaWdpdCB9IGZyb20gJy4uL19mYXN0JyA7XG5cbi8qKlxuICogQHBhcmFtIHtNZWFzdXJlfSBNXG4gKiBAcGFyYW0ge0RpZ2l0fSBsZWZ0XG4gKiBAcGFyYW0ge0ZpbmdlclRyZWV9IG1pZGRsZVxuICogQHBhcmFtIHtBcnJheX0gcmlnaHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBSICggTSAsIGxlZnQgLCBtaWRkbGUgLCByaWdodCApIHtcblxuXHRpZiAoIHJpZ2h0Lmxlbmd0aCA9PT0gMCApIHtcblxuXHRcdGlmICggbWlkZGxlLmVtcHR5KCApICkgcmV0dXJuIF9mcm9tX2RpZ2l0KCBNICwgbGVmdCApIDtcblxuXHRcdHJldHVybiBuZXcgRGVlcCggTSAsIGxlZnQgLCBkZWxheSggKCApID0+IG1pZGRsZS5pbml0KCApICkgLCBtaWRkbGUubGFzdCggKS5kaWdpdCggKSApIDtcblx0fVxuXG5cdHJldHVybiBuZXcgRGVlcCggTSAsIGxlZnQgLCBtaWRkbGUgLCBfZGlnaXQoIHJpZ2h0ICkgKSA7XG5cbn1cblxuIl19
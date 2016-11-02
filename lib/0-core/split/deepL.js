'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepL = deepL;

var _tree = require('../../3-tree');

var _lazy = require('../../4-lazy');

var _fast = require('../_fast');

/**
 * @param {Measure} M
 * @param {Array} left
 * @param {FingerTree} middle
 * @param {Digit} right
 */
function deepL(M, left, middle, right) {

  if (left.length === 0) {

    if (middle.empty()) return (0, _fast._from_digit)(M, right);

    return new _tree.Deep(M, middle.head().digit(), (0, _lazy.delay)(function () {
      return middle.tail();
    }), right);
  }

  return new _tree.Deep(M, (0, _fast._digit)(left), middle, right);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wLWNvcmUvc3BsaXQvZGVlcEwuanMiXSwibmFtZXMiOlsiZGVlcEwiLCJNIiwibGVmdCIsIm1pZGRsZSIsInJpZ2h0IiwibGVuZ3RoIiwiZW1wdHkiLCJoZWFkIiwiZGlnaXQiLCJ0YWlsIl0sIm1hcHBpbmdzIjoiOzs7OztRQVVnQkEsSyxHQUFBQSxLOztBQVZoQjs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O0FBTU8sU0FBU0EsS0FBVCxDQUFpQkMsQ0FBakIsRUFBcUJDLElBQXJCLEVBQTRCQyxNQUE1QixFQUFxQ0MsS0FBckMsRUFBNkM7O0FBRW5ELE1BQUtGLEtBQUtHLE1BQUwsS0FBZ0IsQ0FBckIsRUFBeUI7O0FBRXhCLFFBQUtGLE9BQU9HLEtBQVAsRUFBTCxFQUF1QixPQUFPLHVCQUFhTCxDQUFiLEVBQWlCRyxLQUFqQixDQUFQOztBQUV2QixXQUFPLGVBQVVILENBQVYsRUFBY0UsT0FBT0ksSUFBUCxHQUFlQyxLQUFmLEVBQWQsRUFBd0MsaUJBQU87QUFBQSxhQUFPTCxPQUFPTSxJQUFQLEVBQVA7QUFBQSxLQUFQLENBQXhDLEVBQXlFTCxLQUF6RSxDQUFQO0FBQ0E7O0FBRUQsU0FBTyxlQUFVSCxDQUFWLEVBQWMsa0JBQVFDLElBQVIsQ0FBZCxFQUErQkMsTUFBL0IsRUFBd0NDLEtBQXhDLENBQVA7QUFFQSIsImZpbGUiOiJkZWVwTC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlZXAgfSBmcm9tICcuLi8uLi8zLXRyZWUnIDtcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAnLi4vLi4vNC1sYXp5JyA7XG5pbXBvcnQgeyBfZnJvbV9kaWdpdCAsIF9kaWdpdCB9IGZyb20gJy4uL19mYXN0JyA7XG5cbi8qKlxuICogQHBhcmFtIHtNZWFzdXJlfSBNXG4gKiBAcGFyYW0ge0FycmF5fSBsZWZ0XG4gKiBAcGFyYW0ge0ZpbmdlclRyZWV9IG1pZGRsZVxuICogQHBhcmFtIHtEaWdpdH0gcmlnaHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBMICggTSAsIGxlZnQgLCBtaWRkbGUgLCByaWdodCApIHtcblxuXHRpZiAoIGxlZnQubGVuZ3RoID09PSAwICkge1xuXG5cdFx0aWYgKCBtaWRkbGUuZW1wdHkoICkgKSByZXR1cm4gX2Zyb21fZGlnaXQoIE0gLCByaWdodCApIDtcblxuXHRcdHJldHVybiBuZXcgRGVlcCggTSAsIG1pZGRsZS5oZWFkKCApLmRpZ2l0KCApICwgZGVsYXkoICggKSA9PiBtaWRkbGUudGFpbCggKSApICwgcmlnaHQgKSA7XG5cdH1cblxuXHRyZXR1cm4gbmV3IERlZXAoIE0gLCBfZGlnaXQoIGxlZnQgKSAsIG1pZGRsZSAsIHJpZ2h0ICkgO1xuXG59XG4iXX0=
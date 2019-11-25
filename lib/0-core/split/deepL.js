"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepL = deepL;

var _tree = require("../../3-tree");

var _lazy = require("../../4-lazy");

var _fast = require("../_fast");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wLWNvcmUvc3BsaXQvZGVlcEwuanMiXSwibmFtZXMiOlsiZGVlcEwiLCJNIiwibGVmdCIsIm1pZGRsZSIsInJpZ2h0IiwibGVuZ3RoIiwiZW1wdHkiLCJEZWVwIiwiaGVhZCIsImRpZ2l0IiwidGFpbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7QUFNTyxTQUFTQSxLQUFULENBQWlCQyxDQUFqQixFQUFxQkMsSUFBckIsRUFBNEJDLE1BQTVCLEVBQXFDQyxLQUFyQyxFQUE2QztBQUVuRCxNQUFLRixJQUFJLENBQUNHLE1BQUwsS0FBZ0IsQ0FBckIsRUFBeUI7QUFFeEIsUUFBS0YsTUFBTSxDQUFDRyxLQUFQLEVBQUwsRUFBdUIsT0FBTyx1QkFBYUwsQ0FBYixFQUFpQkcsS0FBakIsQ0FBUDtBQUV2QixXQUFPLElBQUlHLFVBQUosQ0FBVU4sQ0FBVixFQUFjRSxNQUFNLENBQUNLLElBQVAsR0FBZUMsS0FBZixFQUFkLEVBQXdDLGlCQUFPO0FBQUEsYUFBT04sTUFBTSxDQUFDTyxJQUFQLEVBQVA7QUFBQSxLQUFQLENBQXhDLEVBQXlFTixLQUF6RSxDQUFQO0FBQ0E7O0FBRUQsU0FBTyxJQUFJRyxVQUFKLENBQVVOLENBQVYsRUFBYyxrQkFBUUMsSUFBUixDQUFkLEVBQStCQyxNQUEvQixFQUF3Q0MsS0FBeEMsQ0FBUDtBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVlcCB9IGZyb20gJy4uLy4uLzMtdHJlZScgO1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICcuLi8uLi80LWxhenknIDtcbmltcG9ydCB7IF9mcm9tX2RpZ2l0ICwgX2RpZ2l0IH0gZnJvbSAnLi4vX2Zhc3QnIDtcblxuLyoqXG4gKiBAcGFyYW0ge01lYXN1cmV9IE1cbiAqIEBwYXJhbSB7QXJyYXl9IGxlZnRcbiAqIEBwYXJhbSB7RmluZ2VyVHJlZX0gbWlkZGxlXG4gKiBAcGFyYW0ge0RpZ2l0fSByaWdodFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcEwgKCBNICwgbGVmdCAsIG1pZGRsZSAsIHJpZ2h0ICkge1xuXG5cdGlmICggbGVmdC5sZW5ndGggPT09IDAgKSB7XG5cblx0XHRpZiAoIG1pZGRsZS5lbXB0eSggKSApIHJldHVybiBfZnJvbV9kaWdpdCggTSAsIHJpZ2h0ICkgO1xuXG5cdFx0cmV0dXJuIG5ldyBEZWVwKCBNICwgbWlkZGxlLmhlYWQoICkuZGlnaXQoICkgLCBkZWxheSggKCApID0+IG1pZGRsZS50YWlsKCApICkgLCByaWdodCApIDtcblx0fVxuXG5cdHJldHVybiBuZXcgRGVlcCggTSAsIF9kaWdpdCggbGVmdCApICwgbWlkZGxlICwgcmlnaHQgKSA7XG5cbn1cbiJdfQ==
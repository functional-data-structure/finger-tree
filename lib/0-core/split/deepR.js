"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepR = deepR;

var _tree = require("../../3-tree");

var _lazy = require("../../4-lazy");

var _fast = require("../_fast");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wLWNvcmUvc3BsaXQvZGVlcFIuanMiXSwibmFtZXMiOlsiZGVlcFIiLCJNIiwibGVmdCIsIm1pZGRsZSIsInJpZ2h0IiwibGVuZ3RoIiwiZW1wdHkiLCJEZWVwIiwiaW5pdCIsImxhc3QiLCJkaWdpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7QUFNTyxTQUFTQSxLQUFULENBQWlCQyxDQUFqQixFQUFxQkMsSUFBckIsRUFBNEJDLE1BQTVCLEVBQXFDQyxLQUFyQyxFQUE2QztBQUVuRCxNQUFLQSxLQUFLLENBQUNDLE1BQU4sS0FBaUIsQ0FBdEIsRUFBMEI7QUFFekIsUUFBS0YsTUFBTSxDQUFDRyxLQUFQLEVBQUwsRUFBdUIsT0FBTyx1QkFBYUwsQ0FBYixFQUFpQkMsSUFBakIsQ0FBUDtBQUV2QixXQUFPLElBQUlLLFVBQUosQ0FBVU4sQ0FBVixFQUFjQyxJQUFkLEVBQXFCLGlCQUFPO0FBQUEsYUFBT0MsTUFBTSxDQUFDSyxJQUFQLEVBQVA7QUFBQSxLQUFQLENBQXJCLEVBQXNETCxNQUFNLENBQUNNLElBQVAsR0FBZUMsS0FBZixFQUF0RCxDQUFQO0FBQ0E7O0FBRUQsU0FBTyxJQUFJSCxVQUFKLENBQVVOLENBQVYsRUFBY0MsSUFBZCxFQUFxQkMsTUFBckIsRUFBOEIsa0JBQVFDLEtBQVIsQ0FBOUIsQ0FBUDtBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVlcCB9IGZyb20gJy4uLy4uLzMtdHJlZScgO1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICcuLi8uLi80LWxhenknIDtcbmltcG9ydCB7IF9mcm9tX2RpZ2l0ICwgX2RpZ2l0IH0gZnJvbSAnLi4vX2Zhc3QnIDtcblxuLyoqXG4gKiBAcGFyYW0ge01lYXN1cmV9IE1cbiAqIEBwYXJhbSB7RGlnaXR9IGxlZnRcbiAqIEBwYXJhbSB7RmluZ2VyVHJlZX0gbWlkZGxlXG4gKiBAcGFyYW0ge0FycmF5fSByaWdodFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcFIgKCBNICwgbGVmdCAsIG1pZGRsZSAsIHJpZ2h0ICkge1xuXG5cdGlmICggcmlnaHQubGVuZ3RoID09PSAwICkge1xuXG5cdFx0aWYgKCBtaWRkbGUuZW1wdHkoICkgKSByZXR1cm4gX2Zyb21fZGlnaXQoIE0gLCBsZWZ0ICkgO1xuXG5cdFx0cmV0dXJuIG5ldyBEZWVwKCBNICwgbGVmdCAsIGRlbGF5KCAoICkgPT4gbWlkZGxlLmluaXQoICkgKSAsIG1pZGRsZS5sYXN0KCApLmRpZ2l0KCApICkgO1xuXHR9XG5cblx0cmV0dXJuIG5ldyBEZWVwKCBNICwgbGVmdCAsIG1pZGRsZSAsIF9kaWdpdCggcmlnaHQgKSApIDtcblxufVxuXG4iXX0=
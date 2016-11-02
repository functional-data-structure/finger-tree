'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deepR = deepR;

var _tree = require('../../3-tree');

var _lazy = require('../../4-lazy');

var _fast = require('../_fast');

/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wLWNvcmUvc3BsaXQvZGVlcFIuanMiXSwibmFtZXMiOlsiZGVlcFIiLCJNIiwibGVmdCIsIm1pZGRsZSIsInJpZ2h0IiwibGVuZ3RoIiwiZW1wdHkiLCJpbml0IiwibGFzdCIsImRpZ2l0Il0sIm1hcHBpbmdzIjoiOzs7OztRQVNnQkEsSyxHQUFBQSxLOztBQVRoQjs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7QUFLTyxTQUFTQSxLQUFULENBQWlCQyxDQUFqQixFQUFxQkMsSUFBckIsRUFBNEJDLE1BQTVCLEVBQXFDQyxLQUFyQyxFQUE2Qzs7QUFFbkQsS0FBS0EsTUFBTUMsTUFBTixLQUFpQixDQUF0QixFQUEwQjs7QUFFekIsTUFBS0YsT0FBT0csS0FBUCxFQUFMLEVBQXVCLE9BQU8sdUJBQWFMLENBQWIsRUFBaUJDLElBQWpCLENBQVA7O0FBRXZCLFNBQU8sZUFBVUQsQ0FBVixFQUFjQyxJQUFkLEVBQXFCLGlCQUFPO0FBQUEsVUFBT0MsT0FBT0ksSUFBUCxFQUFQO0FBQUEsR0FBUCxDQUFyQixFQUFzREosT0FBT0ssSUFBUCxHQUFlQyxLQUFmLEVBQXRELENBQVA7QUFDQTs7QUFFRCxRQUFPLGVBQVVSLENBQVYsRUFBY0MsSUFBZCxFQUFxQkMsTUFBckIsRUFBOEIsa0JBQVFDLEtBQVIsQ0FBOUIsQ0FBUDtBQUVBIiwiZmlsZSI6ImRlZXBSLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVlcCB9IGZyb20gJy4uLy4uLzMtdHJlZScgO1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICcuLi8uLi80LWxhenknIDtcbmltcG9ydCB7IF9mcm9tX2RpZ2l0ICwgX2RpZ2l0IH0gZnJvbSAnLi4vX2Zhc3QnIDtcblxuLyoqXG4gKiBAcGFyYW0ge0RpZ2l0fSBsZWZ0XG4gKiBAcGFyYW0ge0ZpbmdlclRyZWV9IG1pZGRsZVxuICogQHBhcmFtIHtBcnJheX0gcmlnaHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBSICggTSAsIGxlZnQgLCBtaWRkbGUgLCByaWdodCApIHtcblxuXHRpZiAoIHJpZ2h0Lmxlbmd0aCA9PT0gMCApIHtcblxuXHRcdGlmICggbWlkZGxlLmVtcHR5KCApICkgcmV0dXJuIF9mcm9tX2RpZ2l0KCBNICwgbGVmdCApIDtcblxuXHRcdHJldHVybiBuZXcgRGVlcCggTSAsIGxlZnQgLCBkZWxheSggKCApID0+IG1pZGRsZS5pbml0KCApICkgLCBtaWRkbGUubGFzdCggKS5kaWdpdCggKSApIDtcblx0fVxuXG5cdHJldHVybiBuZXcgRGVlcCggTSAsIGxlZnQgLCBtaWRkbGUgLCBfZGlnaXQoIHJpZ2h0ICkgKSA7XG5cbn1cblxuIl19
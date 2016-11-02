'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deepL = deepL;

var _tree = require('../../3-tree');

var _lazy = require('../../4-lazy');

var _fast = require('../_fast');

/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wLWNvcmUvc3BsaXQvZGVlcEwuanMiXSwibmFtZXMiOlsiZGVlcEwiLCJNIiwibGVmdCIsIm1pZGRsZSIsInJpZ2h0IiwibGVuZ3RoIiwiZW1wdHkiLCJoZWFkIiwiZGlnaXQiLCJ0YWlsIl0sIm1hcHBpbmdzIjoiOzs7OztRQVNnQkEsSyxHQUFBQSxLOztBQVRoQjs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7QUFLTyxTQUFTQSxLQUFULENBQWlCQyxDQUFqQixFQUFxQkMsSUFBckIsRUFBNEJDLE1BQTVCLEVBQXFDQyxLQUFyQyxFQUE2Qzs7QUFFbkQsS0FBS0YsS0FBS0csTUFBTCxLQUFnQixDQUFyQixFQUF5Qjs7QUFFeEIsTUFBS0YsT0FBT0csS0FBUCxFQUFMLEVBQXVCLE9BQU8sdUJBQWFMLENBQWIsRUFBaUJHLEtBQWpCLENBQVA7O0FBRXZCLFNBQU8sZUFBVUgsQ0FBVixFQUFjRSxPQUFPSSxJQUFQLEdBQWVDLEtBQWYsRUFBZCxFQUF3QyxpQkFBTztBQUFBLFVBQU9MLE9BQU9NLElBQVAsRUFBUDtBQUFBLEdBQVAsQ0FBeEMsRUFBeUVMLEtBQXpFLENBQVA7QUFDQTs7QUFFRCxRQUFPLGVBQVVILENBQVYsRUFBYyxrQkFBUUMsSUFBUixDQUFkLEVBQStCQyxNQUEvQixFQUF3Q0MsS0FBeEMsQ0FBUDtBQUVBIiwiZmlsZSI6ImRlZXBMLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVlcCB9IGZyb20gJy4uLy4uLzMtdHJlZScgO1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICcuLi8uLi80LWxhenknIDtcbmltcG9ydCB7IF9mcm9tX2RpZ2l0ICwgX2RpZ2l0IH0gZnJvbSAnLi4vX2Zhc3QnIDtcblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5fSBsZWZ0XG4gKiBAcGFyYW0ge0ZpbmdlclRyZWV9IG1pZGRsZVxuICogQHBhcmFtIHtEaWdpdH0gcmlnaHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBMICggTSAsIGxlZnQgLCBtaWRkbGUgLCByaWdodCApIHtcblxuXHRpZiAoIGxlZnQubGVuZ3RoID09PSAwICkge1xuXG5cdFx0aWYgKCBtaWRkbGUuZW1wdHkoICkgKSByZXR1cm4gX2Zyb21fZGlnaXQoIE0gLCByaWdodCApIDtcblxuXHRcdHJldHVybiBuZXcgRGVlcCggTSAsIG1pZGRsZS5oZWFkKCApLmRpZ2l0KCApICwgZGVsYXkoICggKSA9PiBtaWRkbGUudGFpbCggKSApICwgcmlnaHQgKSA7XG5cdH1cblxuXHRyZXR1cm4gbmV3IERlZXAoIE0gLCBfZGlnaXQoIGxlZnQgKSAsIG1pZGRsZSAsIHJpZ2h0ICkgO1xuXG59XG4iXX0=
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._prepend = _prepend;
function _prepend(tree, list) {

	var i = list.length;

	while (i--) {
		tree = tree.cons(list[i]);
	}return tree;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wLWNvcmUvX2Zhc3QvX3ByZXBlbmQuanMiXSwibmFtZXMiOlsiX3ByZXBlbmQiLCJ0cmVlIiwibGlzdCIsImkiLCJsZW5ndGgiLCJjb25zIl0sIm1hcHBpbmdzIjoiOzs7OztRQUFnQkEsUSxHQUFBQSxRO0FBQVQsU0FBU0EsUUFBVCxDQUFvQkMsSUFBcEIsRUFBMkJDLElBQTNCLEVBQWtDOztBQUV4QyxLQUFJQyxJQUFJRCxLQUFLRSxNQUFiOztBQUVBLFFBQVFELEdBQVI7QUFBY0YsU0FBT0EsS0FBS0ksSUFBTCxDQUFXSCxLQUFLQyxDQUFMLENBQVgsQ0FBUDtBQUFkLEVBRUEsT0FBT0YsSUFBUDtBQUVBIiwiZmlsZSI6Il9wcmVwZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIF9wcmVwZW5kICggdHJlZSAsIGxpc3QgKSB7XG5cblx0bGV0IGkgPSBsaXN0Lmxlbmd0aCA7XG5cblx0d2hpbGUgKCBpLS0gKSB0cmVlID0gdHJlZS5jb25zKCBsaXN0W2ldICkgO1xuXG5cdHJldHVybiB0cmVlIDtcblxufVxuIl19
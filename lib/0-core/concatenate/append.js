"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.append = append;

function append(tree, iterable) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = iterable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;
      tree = tree.push(value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return tree;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wLWNvcmUvY29uY2F0ZW5hdGUvYXBwZW5kLmpzIl0sIm5hbWVzIjpbImFwcGVuZCIsInRyZWUiLCJpdGVyYWJsZSIsInZhbHVlIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLFNBQVNBLE1BQVQsQ0FBa0JDLElBQWxCLEVBQXlCQyxRQUF6QixFQUFvQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUUxQyx5QkFBcUJBLFFBQXJCO0FBQUEsVUFBWUMsS0FBWjtBQUFnQ0YsTUFBQUEsSUFBSSxHQUFHQSxJQUFJLENBQUNHLElBQUwsQ0FBV0QsS0FBWCxDQUFQO0FBQWhDO0FBRjBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBSTFDLFNBQU9GLElBQVA7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhcHBlbmQgKCB0cmVlICwgaXRlcmFibGUgKSB7XG5cblx0Zm9yICggY29uc3QgdmFsdWUgb2YgaXRlcmFibGUgKSB0cmVlID0gdHJlZS5wdXNoKCB2YWx1ZSApIDtcblxuXHRyZXR1cm4gdHJlZSA7XG5cbn1cbiJdfQ==
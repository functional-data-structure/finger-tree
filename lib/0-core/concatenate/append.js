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
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return tree;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wLWNvcmUvY29uY2F0ZW5hdGUvYXBwZW5kLmpzIl0sIm5hbWVzIjpbImFwcGVuZCIsInRyZWUiLCJpdGVyYWJsZSIsInZhbHVlIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFBZ0JBLE0sR0FBQUEsTTtBQUFULFNBQVNBLE1BQVQsQ0FBa0JDLElBQWxCLEVBQXlCQyxRQUF6QixFQUFvQztBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFFMUMsdUJBQXFCQSxRQUFyQjtBQUFBLE9BQVlDLEtBQVo7QUFBZ0NGLFVBQU9BLEtBQUtHLElBQUwsQ0FBV0QsS0FBWCxDQUFQO0FBQWhDO0FBRjBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBSTFDLFFBQU9GLElBQVA7QUFFQSIsImZpbGUiOiJhcHBlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXBwZW5kICggdHJlZSAsIGl0ZXJhYmxlICkge1xuXG5cdGZvciAoIGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlICkgdHJlZSA9IHRyZWUucHVzaCggdmFsdWUgKSA7XG5cblx0cmV0dXJuIHRyZWUgO1xuXG59XG4iXX0=
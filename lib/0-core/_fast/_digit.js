"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._digit = _digit;

var _digit2 = require("../../1-digit");

function _digit(list) {
  switch (list.length) {
    case 1:
      return new _digit2.One(list[0]);

    case 2:
      return new _digit2.Two(list[0], list[1]);

    case 3:
      return new _digit2.Three(list[0], list[1], list[2]);
    // potential optimization by commenting out this section
    // and defaulting for case 3

    case 4:
      throw new Error('_digit(.) should never be called on length 4 lists since it is only called on results of splitDigit which outputs lists of length at most 3');

    default:
      throw new Error("cannot make digit for length ".concat(list.length));
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8wLWNvcmUvX2Zhc3QvX2RpZ2l0LmpzIl0sIm5hbWVzIjpbIl9kaWdpdCIsImxpc3QiLCJsZW5ndGgiLCJPbmUiLCJUd28iLCJUaHJlZSIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRU8sU0FBU0EsTUFBVCxDQUFrQkMsSUFBbEIsRUFBeUI7QUFFL0IsVUFBU0EsSUFBSSxDQUFDQyxNQUFkO0FBRUMsU0FBSyxDQUFMO0FBQVMsYUFBTyxJQUFJQyxXQUFKLENBQVNGLElBQUksQ0FBQyxDQUFELENBQWIsQ0FBUDs7QUFDVCxTQUFLLENBQUw7QUFBUyxhQUFPLElBQUlHLFdBQUosQ0FBU0gsSUFBSSxDQUFDLENBQUQsQ0FBYixFQUFtQkEsSUFBSSxDQUFDLENBQUQsQ0FBdkIsQ0FBUDs7QUFDVCxTQUFLLENBQUw7QUFBUyxhQUFPLElBQUlJLGFBQUosQ0FBV0osSUFBSSxDQUFDLENBQUQsQ0FBZixFQUFxQkEsSUFBSSxDQUFDLENBQUQsQ0FBekIsRUFBK0JBLElBQUksQ0FBQyxDQUFELENBQW5DLENBQVA7QUFDVDtBQUNBOztBQUNBLFNBQUssQ0FBTDtBQUFTLFlBQU0sSUFBSUssS0FBSixDQUFXLDZJQUFYLENBQU47O0FBQ1Q7QUFBUyxZQUFNLElBQUlBLEtBQUosd0NBQTJDTCxJQUFJLENBQUNDLE1BQWhELEVBQU47QUFSVjtBQVlBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25lICwgVHdvICwgVGhyZWUgfSBmcm9tICcuLi8uLi8xLWRpZ2l0JyA7XG5cbmV4cG9ydCBmdW5jdGlvbiBfZGlnaXQgKCBsaXN0ICkge1xuXG5cdHN3aXRjaCAoIGxpc3QubGVuZ3RoICkge1xuXG5cdFx0Y2FzZSAxIDogcmV0dXJuIG5ldyBPbmUoIGxpc3RbMF0gKSA7XG5cdFx0Y2FzZSAyIDogcmV0dXJuIG5ldyBUd28oIGxpc3RbMF0gLCBsaXN0WzFdICkgO1xuXHRcdGNhc2UgMyA6IHJldHVybiBuZXcgVGhyZWUoIGxpc3RbMF0gLCBsaXN0WzFdICwgbGlzdFsyXSApIDtcblx0XHQvLyBwb3RlbnRpYWwgb3B0aW1pemF0aW9uIGJ5IGNvbW1lbnRpbmcgb3V0IHRoaXMgc2VjdGlvblxuXHRcdC8vIGFuZCBkZWZhdWx0aW5nIGZvciBjYXNlIDNcblx0XHRjYXNlIDQgOiB0aHJvdyBuZXcgRXJyb3IoICdfZGlnaXQoLikgc2hvdWxkIG5ldmVyIGJlIGNhbGxlZCBvbiBsZW5ndGggNCBsaXN0cyBzaW5jZSBpdCBpcyBvbmx5IGNhbGxlZCBvbiByZXN1bHRzIG9mIHNwbGl0RGlnaXQgd2hpY2ggb3V0cHV0cyBsaXN0cyBvZiBsZW5ndGggYXQgbW9zdCAzJyApIDtcblx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoIGBjYW5ub3QgbWFrZSBkaWdpdCBmb3IgbGVuZ3RoICR7bGlzdC5sZW5ndGh9YCApIDtcblxuXHR9XG5cbn1cbiJdfQ==
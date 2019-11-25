"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Deep = Deep;

var _ = require(".");

var _base = require("../base");

var _core = require("../../0-core");

var _digit = require("../../1-digit");

var _lazy = require("../../4-lazy");

function Deep(M, left, middle, right) {
  this.M = M;
  this.left = left;
  this.middle = middle;
  this.right = right;
  this.v = null;
}

Deep.prototype = new _base.Tree();

Deep.prototype.measure = function () {
  if (this.v === null) {
    var M = this.M;
    this.v = M.plus(this.left.measure(M), M.plus(this.middle.measure(), this.right.measure(M)));
  }

  return this.v;
};

Deep.prototype.empty = function () {
  return false;
};

Deep.prototype.head = function () {
  return this.left.head();
};

Deep.prototype.last = function () {
  return this.right.last();
};

Deep.prototype.tail = function () {
  var _this = this;

  if (this.left instanceof _digit.One) {
    if (this.middle.empty()) {
      return (0, _core._from_digit)(this.M, this.right);
    }

    return new Deep(this.M, this.middle.head().digit(), (0, _lazy.delay)(function () {
      return _this.middle.tail();
    }), this.right);
  }

  return new Deep(this.M, this.left.tail(), this.middle, this.right);
};

Deep.prototype.init = function () {
  var _this2 = this;

  if (this.right instanceof _digit.One) {
    if (this.middle.empty()) {
      return (0, _core._from_digit)(this.M, this.left);
    }

    return new Deep(this.M, this.left, (0, _lazy.delay)(function () {
      return _this2.middle.init();
    }), this.middle.last().digit());
  }

  return new Deep(this.M, this.left, this.middle, this.right.init());
};

Deep.prototype.cons = function (value) {
  if (this.left instanceof _digit.Four) {
    return new Deep(this.M, new _digit.Two(value, this.left.head()), this.middle.cons(this.left.tail().node(this.M)), this.right);
  }

  return new Deep(this.M, this.left.cons(value), this.middle, this.right);
};

Deep.prototype.push = function (value) {
  if (this.right instanceof _digit.Four) {
    return new Deep(this.M, this.left, this.middle.push(this.right.init().node(this.M)), new _digit.Two(this.right.last(), value));
  }

  return new Deep(this.M, this.left, this.middle, this.right.push(value));
};

Deep.prototype.concat = function (other) {
  return (0, _core._app3)(this, other);
};

Deep.prototype[Symbol.iterator] =
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, node;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.delegateYield(this.left, "t0", 1);

        case 1:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = this.middle[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 12;
            break;
          }

          node = _step.value;
          return _context.delegateYield(node, "t1", 9);

        case 9:
          _iteratorNormalCompletion = true;
          _context.next = 6;
          break;

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t2 = _context["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context.t2;

        case 18:
          _context.prev = 18;
          _context.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 21:
          _context.prev = 21;

          if (!_didIteratorError) {
            _context.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return _context.finish(21);

        case 25:
          return _context.finish(18);

        case 26:
          return _context.delegateYield(this.right, "t3", 27);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this, [[4, 14, 18, 26], [19,, 21, 25]]);
});
/**
 * It is assumed that p(|this|) is true.
 */

Deep.prototype.splitTree = function (p, i) {
  var left = this.left,
      middle = this.middle,
      right = this.right,
      M = this.M; // see if the split point is inside the left tree

  var leftMeasure = M.plus(i, left.measure(M));

  if (p(leftMeasure)) {
    var _split = left.splitDigit(p, i, M);

    return new _core.Split((0, _core._from_small_list)(M, _split.left), _split.middle, (0, _core._deepL)(M, _split.right, middle, right));
  } // see if the split point is inside the middle tree


  var midMeasure = M.plus(leftMeasure, middle.measure());

  if (p(midMeasure)) {
    var midSplit = middle.splitTree(p, leftMeasure); // midsplit.middle is a Node since middle is a Tree ( Node a )

    var _split2 = midSplit.middle.digit().splitDigit(p, M.plus(leftMeasure, midSplit.left.measure()), M);

    return new _core.Split((0, _core._deepR)(M, left, midSplit.left, _split2.left), _split2.middle, (0, _core._deepL)(M, _split2.right, midSplit.right, right));
  } // the split point is in the right tree


  var split = right.splitDigit(p, midMeasure, M);
  return new _core.Split((0, _core._deepR)(M, left, middle, split.left), split.middle, (0, _core._from_small_list)(M, split.right));
};

Deep.prototype.split = function (p) {
  if (p(this.measure())) {
    var split = this.splitTree(p, this.M.zero());
    return [split.left, split.right.cons(split.middle)];
  }

  return [this, new _.Empty(this.M)];
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8zLXRyZWUvaW1wbGVtZW50YXRpb25zLzItRGVlcC5qcyJdLCJuYW1lcyI6WyJEZWVwIiwiTSIsImxlZnQiLCJtaWRkbGUiLCJyaWdodCIsInYiLCJwcm90b3R5cGUiLCJUcmVlIiwibWVhc3VyZSIsInBsdXMiLCJlbXB0eSIsImhlYWQiLCJsYXN0IiwidGFpbCIsIk9uZSIsImRpZ2l0IiwiaW5pdCIsImNvbnMiLCJ2YWx1ZSIsIkZvdXIiLCJUd28iLCJub2RlIiwicHVzaCIsImNvbmNhdCIsIm90aGVyIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJzcGxpdFRyZWUiLCJwIiwiaSIsImxlZnRNZWFzdXJlIiwic3BsaXQiLCJzcGxpdERpZ2l0IiwiU3BsaXQiLCJtaWRNZWFzdXJlIiwibWlkU3BsaXQiLCJ6ZXJvIiwiRW1wdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFTyxTQUFTQSxJQUFULENBQWdCQyxDQUFoQixFQUFvQkMsSUFBcEIsRUFBMkJDLE1BQTNCLEVBQW9DQyxLQUFwQyxFQUE0QztBQUNsRCxPQUFLSCxDQUFMLEdBQVNBLENBQVQ7QUFDQSxPQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxPQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxPQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxPQUFLQyxDQUFMLEdBQVMsSUFBVDtBQUNBOztBQUVETCxJQUFJLENBQUNNLFNBQUwsR0FBaUIsSUFBSUMsVUFBSixFQUFqQjs7QUFFQVAsSUFBSSxDQUFDTSxTQUFMLENBQWVFLE9BQWYsR0FBeUIsWUFBYTtBQUVyQyxNQUFLLEtBQUtILENBQUwsS0FBVyxJQUFoQixFQUF1QjtBQUV0QixRQUFNSixDQUFDLEdBQUcsS0FBS0EsQ0FBZjtBQUVBLFNBQUtJLENBQUwsR0FBU0osQ0FBQyxDQUFDUSxJQUFGLENBQ1IsS0FBS1AsSUFBTCxDQUFVTSxPQUFWLENBQW1CUCxDQUFuQixDQURRLEVB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LENBQWV5QixLQUFmLEdBQXVCLFVBQVdILENBQVgsRUFBZTtBQUVyQyxNQUFLQSxDQUFDLENBQUUsS0FBS3BCLE9BQUwsRUFBRixDQUFOLEVBQTRCO0FBQzNCLFFBQU11QixLQUFLLEdBQUcsS0FBS0osU0FBTCxDQUFnQkMsQ0FBaEIsRUFBb0IsS0FBSzNCLENBQUwsQ0FBT21DLElBQVAsRUFBcEIsQ0FBZDtBQUNBLFdBQU8sQ0FBRUwsS0FBSyxDQUFDN0IsSUFBUixFQUFlNkIsS0FBSyxDQUFDM0IsS0FBTixDQUFZYSxJQUFaLENBQWtCYyxLQUFLLENBQUM1QixNQUF4QixDQUFmLENBQVA7QUFDQTs7QUFFRCxTQUFPLENBQUUsSUFBRixFQUFTLElBQUlrQyxPQUFKLENBQVcsS0FBS3BDLENBQWhCLENBQVQsQ0FBUDtBQUVBLENBVEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbXB0eSB9IGZyb20gJy4nIDtcbmltcG9ydCB7IFRyZWUgfSBmcm9tICcuLi9iYXNlJyA7XG5pbXBvcnQgeyBfYXBwMyAsIF9mcm9tX2RpZ2l0ICwgX2Zyb21fc21hbGxfbGlzdCAsIF9kZWVwTCAsIF9kZWVwUiAsIFNwbGl0IH0gZnJvbSAnLi4vLi4vMC1jb3JlJyA7XG5pbXBvcnQgeyBPbmUgLCBUd28gLCBGb3VyIH0gZnJvbSAnLi4vLi4vMS1kaWdpdCcgO1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICcuLi8uLi80LWxhenknIDtcblxuZXhwb3J0IGZ1bmN0aW9uIERlZXAgKCBNICwgbGVmdCAsIG1pZGRsZSAsIHJpZ2h0ICkge1xuXHR0aGlzLk0gPSBNIDtcblx0dGhpcy5sZWZ0ID0gbGVmdCA7XG5cdHRoaXMubWlkZGxlID0gbWlkZGxlIDtcblx0dGhpcy5yaWdodCA9IHJpZ2h0IDtcblx0dGhpcy52ID0gbnVsbCA7XG59XG5cbkRlZXAucHJvdG90eXBlID0gbmV3IFRyZWUoICkgO1xuXG5EZWVwLnByb3RvdHlwZS5tZWFzdXJlID0gZnVuY3Rpb24gKCApIHtcblxuXHRpZiAoIHRoaXMudiA9PT0gbnVsbCApIHtcblxuXHRcdGNvbnN0IE0gPSB0aGlzLk0gO1xuXG5cdFx0dGhpcy52ID0gTS5wbHVzKFxuXHRcdFx0dGhpcy5sZWZ0Lm1lYXN1cmUoIE0gKSAsXG5cdFx0XHRNLnBsdXMoXG5cdFx0XHRcdHRoaXMubWlkZGxlLm1lYXN1cmUoICkgLFxuXHRcdFx0XHR0aGlzLnJpZ2h0Lm1lYXN1cmUoIE0gKVxuXHRcdFx0KVxuXHRcdCkgO1xuXG5cdH1cblxuXHRyZXR1cm4gdGhpcy52IDtcblxufSA7XG5cbkRlZXAucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIGZhbHNlIDtcbn0gO1xuXG5EZWVwLnByb3RvdHlwZS5oZWFkID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIHRoaXMubGVmdC5oZWFkKCApIDtcbn0gO1xuXG5EZWVwLnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIHRoaXMucmlnaHQubGFzdCggKSA7XG59IDtcblxuRGVlcC5wcm90b3R5cGUudGFpbCA9IGZ1bmN0aW9uICggKSB7XG5cblx0aWYgKCB0aGlzLmxlZnQgaW5zdGFuY2VvZiBPbmUgKSB7XG5cblx0XHRpZiAoIHRoaXMubWlkZGxlLmVtcHR5KCApICkge1xuXHRcdFx0cmV0dXJuIF9mcm9tX2RpZ2l0KCB0aGlzLk0gLCB0aGlzLnJpZ2h0ICkgO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgRGVlcCggdGhpcy5NICwgdGhpcy5taWRkbGUuaGVhZCggKS5kaWdpdCggKSAsIGRlbGF5KCAoICkgPT4gdGhpcy5taWRkbGUudGFpbCggKSApICwgdGhpcy5yaWdodCApIDtcblxuXHR9XG5cblx0cmV0dXJuIG5ldyBEZWVwKCB0aGlzLk0gLCB0aGlzLmxlZnQudGFpbCggKSAsIHRoaXMubWlkZGxlICwgdGhpcy5yaWdodCApIDtcblxufSA7XG5cbkRlZXAucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoICkge1xuXG5cdGlmICggdGhpcy5yaWdodCBpbnN0YW5jZW9mIE9uZSApIHtcblxuXHRcdGlmICggdGhpcy5taWRkbGUuZW1wdHkoICkgKSB7XG5cdFx0XHRyZXR1cm4gX2Zyb21fZGlnaXQoIHRoaXMuTSAsIHRoaXMubGVmdCApIDtcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IERlZXAoIHRoaXMuTSAsIHRoaXMubGVmdCAsIGRlbGF5KCAoICkgPT4gdGhpcy5taWRkbGUuaW5pdCggKSApICwgdGhpcy5taWRkbGUubGFzdCggKS5kaWdpdCggKSApIDtcblxuXHR9XG5cblx0cmV0dXJuIG5ldyBEZWVwKCB0aGlzLk0gLCB0aGlzLmxlZnQgLCB0aGlzLm1pZGRsZSAsIHRoaXMucmlnaHQuaW5pdCggKSApIDtcblxufSA7XG5EZWVwLnByb3RvdHlwZS5jb25zID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRpZiAoIHRoaXMubGVmdCBpbnN0YW5jZW9mIEZvdXIgKSB7XG5cblx0XHRyZXR1cm4gbmV3IERlZXAoXG5cdFx0XHR0aGlzLk0gLFxuXHRcdFx0bmV3IFR3byggdmFsdWUgLCB0aGlzLmxlZnQuaGVhZCggKSApICxcblx0XHRcdHRoaXMubWlkZGxlLmNvbnMoIHRoaXMubGVmdC50YWlsKCApLm5vZGUoIHRoaXMuTSApICkgLFxuXHRcdFx0dGhpcy5yaWdodFxuXHRcdCkgO1xuXG5cdH1cblxuXHRyZXR1cm4gbmV3IERlZXAoIHRoaXMuTSAsIHRoaXMubGVmdC5jb25zKCB2YWx1ZSApICwgdGhpcy5taWRkbGUgLCB0aGlzLnJpZ2h0ICkgO1xuXG59IDtcbkRlZXAucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdGlmICggdGhpcy5yaWdodCBpbnN0YW5jZW9mIEZvdXIgKSB7XG5cblx0XHRyZXR1cm4gbmV3IERlZXAoXG5cdFx0XHR0aGlzLk0gLFxuXHRcdFx0dGhpcy5sZWZ0ICxcblx0XHRcdHRoaXMubWlkZGxlLnB1c2goIHRoaXMucmlnaHQuaW5pdCggKS5ub2RlKCB0aGlzLk0gKSApICxcblx0XHRcdG5ldyBUd28oIHRoaXMucmlnaHQubGFzdCggKSAsIHZhbHVlIClcblx0XHQpIDtcblxuXHR9XG5cblx0cmV0dXJuIG5ldyBEZWVwKCB0aGlzLk0gLCB0aGlzLmxlZnQgLCB0aGlzLm1pZGRsZSAsIHRoaXMucmlnaHQucHVzaCggdmFsdWUgKSApIDtcblxufSA7XG5EZWVwLnByb3RvdHlwZS5jb25jYXQgPSBmdW5jdGlvbiAoIG90aGVyICkge1xuXG5cdHJldHVybiBfYXBwMyggdGhpcyAsIG90aGVyICkgO1xuXG59IDtcblxuRGVlcC5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKiAoICkge1xuXG5cdHlpZWxkKiB0aGlzLmxlZnQgO1xuXHRmb3IgKCBjb25zdCBub2RlIG9mIHRoaXMubWlkZGxlICkgeWllbGQqIG5vZGUgO1xuXHR5aWVsZCogdGhpcy5yaWdodCA7XG5cbn0gO1xuXG4vKipcbiAqIEl0IGlzIGFzc3VtZWQgdGhhdCBwKHx0aGlzfCkgaXMgdHJ1ZS5cbiAqL1xuRGVlcC5wcm90b3R5cGUuc3BsaXRUcmVlID0gZnVuY3Rpb24gKCBwICwgaSApIHtcblxuXHRjb25zdCB7IGxlZnQgLCBtaWRkbGUgLCByaWdodCAsIE0gfSA9IHRoaXMgO1xuXG5cdC8vIHNlZSBpZiB0aGUgc3BsaXQgcG9pbnQgaXMgaW5zaWRlIHRoZSBsZWZ0IHRyZWVcblx0Y29uc3QgbGVmdE1lYXN1cmUgPSBNLnBsdXMoIGkgLCBsZWZ0Lm1lYXN1cmUoIE0gKSApIDtcblx0aWYgKCBwKCBsZWZ0TWVhc3VyZSApICkge1xuXHRcdGNvbnN0IHNwbGl0ID0gbGVmdC5zcGxpdERpZ2l0KCBwICwgaSAsIE0gKSA7XG5cdFx0cmV0dXJuIG5ldyBTcGxpdChcblx0XHRcdF9mcm9tX3NtYWxsX2xpc3QoIE0gLCBzcGxpdC5sZWZ0ICkgLFxuXHRcdFx0c3BsaXQubWlkZGxlICxcblx0XHRcdF9kZWVwTCggTSAsIHNwbGl0LnJpZ2h0ICwgbWlkZGxlICwgcmlnaHQgKVxuXHRcdCkgO1xuXHR9XG5cblx0Ly8gc2VlIGlmIHRoZSBzcGxpdCBwb2ludCBpcyBpbnNpZGUgdGhlIG1pZGRsZSB0cmVlXG5cdGNvbnN0IG1pZE1lYXN1cmUgPSBNLnBsdXMoIGxlZnRNZWFzdXJlICwgbWlkZGxlLm1lYXN1cmUoICkgKSA7XG5cblx0aWYgKCBwKCBtaWRNZWFzdXJlICkgKSB7XG5cdFx0Y29uc3QgbWlkU3BsaXQgPSBtaWRkbGUuc3BsaXRUcmVlKCBwICwgbGVmdE1lYXN1cmUgKSA7XG5cdFx0Ly8gbWlkc3BsaXQubWlkZGxlIGlzIGEgTm9kZSBzaW5jZSBtaWRkbGUgaXMgYSBUcmVlICggTm9kZSBhIClcblx0XHRjb25zdCBzcGxpdCA9IG1pZFNwbGl0Lm1pZGRsZS5kaWdpdCggKS5zcGxpdERpZ2l0KCBwICwgTS5wbHVzKCBsZWZ0TWVhc3VyZSAsIG1pZFNwbGl0LmxlZnQubWVhc3VyZSggKSApICwgTSApIDtcblx0XHRyZXR1cm4gbmV3IFNwbGl0KFxuXHRcdFx0X2RlZXBSKCBNICwgbGVmdCAsIG1pZFNwbGl0LmxlZnQsIHNwbGl0LmxlZnQgKSAsXG5cdFx0XHRzcGxpdC5taWRkbGUgLFxuXHRcdFx0X2RlZXBMKCBNICwgc3BsaXQucmlnaHQgLCBtaWRTcGxpdC5yaWdodCAsIHJpZ2h0IClcblx0XHQpIDtcblx0fVxuXG5cdC8vIHRoZSBzcGxpdCBwb2ludCBpcyBpbiB0aGUgcmlnaHQgdHJlZVxuXHRjb25zdCBzcGxpdCA9IHJpZ2h0LnNwbGl0RGlnaXQoIHAgLCBtaWRNZWFzdXJlICwgTSApIDtcblx0cmV0dXJuIG5ldyBTcGxpdChcblx0XHRfZGVlcFIoIE0gLCBsZWZ0ICwgbWlkZGxlICwgc3BsaXQubGVmdCApICxcblx0XHRzcGxpdC5taWRkbGUgLFxuXHRcdF9mcm9tX3NtYWxsX2xpc3QoIE0gLCBzcGxpdC5yaWdodCApXG5cdCkgO1xufSA7XG5cbkRlZXAucHJvdG90eXBlLnNwbGl0ID0gZnVuY3Rpb24gKCBwICkge1xuXG5cdGlmICggcCggdGhpcy5tZWFzdXJlKCApICkgKSB7XG5cdFx0Y29uc3Qgc3BsaXQgPSB0aGlzLnNwbGl0VHJlZSggcCAsIHRoaXMuTS56ZXJvKCApICkgO1xuXHRcdHJldHVybiBbIHNwbGl0LmxlZnQgLCBzcGxpdC5yaWdodC5jb25zKCBzcGxpdC5taWRkbGUgKSBdIDtcblx0fVxuXG5cdHJldHVybiBbIHRoaXMgLCBuZXcgRW1wdHkoIHRoaXMuTSApIF0gO1xuXG59IDtcbiJdfQ==
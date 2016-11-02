'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Deep = Deep;

var _ = require('.');

var _base = require('../base');

var _core = require('../../0-core');

var _digit = require('../../1-digit');

var _lazy = require('../../4-lazy');

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

Deep.prototype[Symbol.iterator] = regeneratorRuntime.mark(function _callee() {
	var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, node;

	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					return _context.delegateYield(this.left, 't0', 1);

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
					return _context.delegateYield(node, 't1', 9);

				case 9:
					_iteratorNormalCompletion = true;
					_context.next = 6;
					break;

				case 12:
					_context.next = 18;
					break;

				case 14:
					_context.prev = 14;
					_context.t2 = _context['catch'](4);
					_didIteratorError = true;
					_iteratorError = _context.t2;

				case 18:
					_context.prev = 18;
					_context.prev = 19;

					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
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
					return _context.delegateYield(this.right, 't3', 27);

				case 27:
				case 'end':
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
	    M = this.M;

	// see if the split point is inside the left tree

	var leftMeasure = M.plus(i, left.measure(M));
	if (p(leftMeasure)) {
		var _split = left.splitDigit(p, i, M);
		return new _core.Split((0, _core._from_small_list)(M, _split.left), _split.middle, (0, _core._deepL)(M, _split.right, middle, right));
	}

	// see if the split point is inside the middle tree
	var midMeasure = M.plus(leftMeasure, middle.measure());

	if (p(midMeasure)) {
		var midSplit = middle.splitTree(p, leftMeasure);
		// midsplit.middle is a Node since middle is a Tree ( Node a )
		var _split2 = midSplit.middle.digit().splitDigit(p, M.plus(leftMeasure, midSplit.left.measure()), M);
		return new _core.Split((0, _core._deepR)(M, left, midSplit.left, _split2.left), _split2.middle, (0, _core._deepL)(M, _split2.right, midSplit.right, right));
	}

	// the split point is in the right tree
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8zLXRyZWUvaW1wbGVtZW50YXRpb25zLzItRGVlcC5qcyJdLCJuYW1lcyI6WyJEZWVwIiwiTSIsImxlZnQiLCJtaWRkbGUiLCJyaWdodCIsInYiLCJwcm90b3R5cGUiLCJtZWFzdXJlIiwicGx1cyIsImVtcHR5IiwiaGVhZCIsImxhc3QiLCJ0YWlsIiwiZGlnaXQiLCJpbml0IiwiY29ucyIsInZhbHVlIiwibm9kZSIsInB1c2giLCJjb25jYXQiLCJvdGhlciIsIlN5bWJvbCIsIml0ZXJhdG9yIiwic3BsaXRUcmVlIiwicCIsImkiLCJsZWZ0TWVhc3VyZSIsInNwbGl0Iiwic3BsaXREaWdpdCIsIm1pZE1lYXN1cmUiLCJtaWRTcGxpdCIsInplcm8iXSwibWFwcGluZ3MiOiI7Ozs7O1FBTWdCQSxJLEdBQUFBLEk7O0FBTmhCOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVPLFNBQVNBLElBQVQsQ0FBZ0JDLENBQWhCLEVBQW9CQyxJQUFwQixFQUEyQkMsTUFBM0IsRUFBb0NDLEtBQXBDLEVBQTRDO0FBQ2xELE1BQUtILENBQUwsR0FBU0EsQ0FBVDtBQUNBLE1BQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLE1BQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLE1BQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLE1BQUtDLENBQUwsR0FBUyxJQUFUO0FBQ0E7O0FBRURMLEtBQUtNLFNBQUwsR0FBaUIsZ0JBQWpCOztBQUVBTixLQUFLTSxTQUFMLENBQWVDLE9BQWYsR0FBeUIsWUFBYTs7QUFFckMsS0FBSyxLQUFLRixDQUFMLEtBQVcsSUFBaEIsRUFBdUI7O0FBRXRCLE1BQU1KLElBQUksS0FBS0EsQ0FBZjs7QUFFQSxPQUFLSSxDQUFMLEdBQVNKLEVBQUVPLElBQUYsQ0FDUixLQUFLTixJQUFMLENBQVVLLE9BQVYsQ0FBbUJOLENBQW5CLENBRFEsRUFFUkEsRUFBRU8sSUFBRixDQUNDLEtBQUtMLE1BQUwsQ0FBWUksT0FBWixFQURELEVBRUMs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T0FBZCxFQUF0QixDQUF6QyxFQUE0Rk4sQ0FBNUYsQ0FBZDtBQUNBLFNBQU8sZ0JBQ04sa0JBQVFBLENBQVIsRUFBWUMsSUFBWixFQUFtQjRCLFNBQVM1QixJQUE1QixFQUFrQ3lCLFFBQU16QixJQUF4QyxDQURNLEVBRU55QixRQUFNeEIsTUFGQSxFQUdOLGtCQUFRRixDQUFSLEVBQVkwQixRQUFNdkIsS0FBbEIsRUFBMEIwQixTQUFTMUIsS0FBbkMsRUFBMkNBLEtBQTNDLENBSE0sQ0FBUDtBQUtBOztBQUVEO0FBQ0EsS0FBTXVCLFFBQVF2QixNQUFNd0IsVUFBTixDQUFrQkosQ0FBbEIsRUFBc0JLLFVBQXRCLEVBQW1DNUIsQ0FBbkMsQ0FBZDtBQUNBLFFBQU8sZ0JBQ04sa0JBQVFBLENBQVIsRUFBWUMsSUFBWixFQUFtQkMsTUFBbkIsRUFBNEJ3QixNQUFNekIsSUFBbEMsQ0FETSxFQUVOeUIsTUFBTXhCLE1BRkEsRUFHTiw0QkFBa0JGLENBQWxCLEVBQXNCMEIsTUFBTXZCLEtBQTVCLENBSE0sQ0FBUDtBQUtBLENBcENEOztBQXNDQUosS0FBS00sU0FBTCxDQUFlcUIsS0FBZixHQUF1QixVQUFXSCxDQUFYLEVBQWU7O0FBRXJDLEtBQUtBLEVBQUcsS0FBS2pCLE9BQUwsRUFBSCxDQUFMLEVBQTRCO0FBQzNCLE1BQU1vQixRQUFRLEtBQUtKLFNBQUwsQ0FBZ0JDLENBQWhCLEVBQW9CLEtBQUt2QixDQUFMLENBQU84QixJQUFQLEVBQXBCLENBQWQ7QUFDQSxTQUFPLENBQUVKLE1BQU16QixJQUFSLEVBQWV5QixNQUFNdkIsS0FBTixDQUFZVyxJQUFaLENBQWtCWSxNQUFNeEIsTUFBeEIsQ0FBZixDQUFQO0FBQ0E7O0FBRUQsUUFBTyxDQUFFLElBQUYsRUFBUyxZQUFXLEtBQUtGLENBQWhCLENBQVQsQ0FBUDtBQUVBLENBVEQiLCJmaWxlIjoiMi1EZWVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW1wdHkgfSBmcm9tICcuJyA7XG5pbXBvcnQgeyBUcmVlIH0gZnJvbSAnLi4vYmFzZScgO1xuaW1wb3J0IHsgX2FwcDMgLCBfZnJvbV9kaWdpdCAsIF9mcm9tX3NtYWxsX2xpc3QgLCBfZGVlcEwgLCBfZGVlcFIgLCBTcGxpdCB9IGZyb20gJy4uLy4uLzAtY29yZScgO1xuaW1wb3J0IHsgT25lICwgVHdvICwgRm91ciB9IGZyb20gJy4uLy4uLzEtZGlnaXQnIDtcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAnLi4vLi4vNC1sYXp5JyA7XG5cbmV4cG9ydCBmdW5jdGlvbiBEZWVwICggTSAsIGxlZnQgLCBtaWRkbGUgLCByaWdodCApIHtcblx0dGhpcy5NID0gTSA7XG5cdHRoaXMubGVmdCA9IGxlZnQgO1xuXHR0aGlzLm1pZGRsZSA9IG1pZGRsZSA7XG5cdHRoaXMucmlnaHQgPSByaWdodCA7XG5cdHRoaXMudiA9IG51bGwgO1xufVxuXG5EZWVwLnByb3RvdHlwZSA9IG5ldyBUcmVlKCApIDtcblxuRGVlcC5wcm90b3R5cGUubWVhc3VyZSA9IGZ1bmN0aW9uICggKSB7XG5cblx0aWYgKCB0aGlzLnYgPT09IG51bGwgKSB7XG5cblx0XHRjb25zdCBNID0gdGhpcy5NIDtcblxuXHRcdHRoaXMudiA9IE0ucGx1cyhcblx0XHRcdHRoaXMubGVmdC5tZWFzdXJlKCBNICkgLFxuXHRcdFx0TS5wbHVzKFxuXHRcdFx0XHR0aGlzLm1pZGRsZS5tZWFzdXJlKCApICxcblx0XHRcdFx0dGhpcy5yaWdodC5tZWFzdXJlKCBNIClcblx0XHRcdClcblx0XHQpIDtcblxuXHR9XG5cblx0cmV0dXJuIHRoaXMudiA7XG5cbn0gO1xuXG5EZWVwLnByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiBmYWxzZSA7XG59IDtcblxuRGVlcC5wcm90b3R5cGUuaGVhZCA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzLmxlZnQuaGVhZCggKSA7XG59IDtcblxuRGVlcC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzLnJpZ2h0Lmxhc3QoICkgO1xufSA7XG5cbkRlZXAucHJvdG90eXBlLnRhaWwgPSBmdW5jdGlvbiAoICkge1xuXG5cdGlmICggdGhpcy5sZWZ0IGluc3RhbmNlb2YgT25lICkge1xuXG5cdFx0aWYgKCB0aGlzLm1pZGRsZS5lbXB0eSggKSApIHtcblx0XHRcdHJldHVybiBfZnJvbV9kaWdpdCggdGhpcy5NICwgdGhpcy5yaWdodCApIDtcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IERlZXAoIHRoaXMuTSAsIHRoaXMubWlkZGxlLmhlYWQoICkuZGlnaXQoICkgLCBkZWxheSggKCApID0+IHRoaXMubWlkZGxlLnRhaWwoICkgKSAsIHRoaXMucmlnaHQgKSA7XG5cblx0fVxuXG5cdHJldHVybiBuZXcgRGVlcCggdGhpcy5NICwgdGhpcy5sZWZ0LnRhaWwoICkgLCB0aGlzLm1pZGRsZSAsIHRoaXMucmlnaHQgKSA7XG5cbn0gO1xuXG5EZWVwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCApIHtcblxuXHRpZiAoIHRoaXMucmlnaHQgaW5zdGFuY2VvZiBPbmUgKSB7XG5cblx0XHRpZiAoIHRoaXMubWlkZGxlLmVtcHR5KCApICkge1xuXHRcdFx0cmV0dXJuIF9mcm9tX2RpZ2l0KCB0aGlzLk0gLCB0aGlzLmxlZnQgKSA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ldyBEZWVwKCB0aGlzLk0gLCB0aGlzLmxlZnQgLCBkZWxheSggKCApID0+IHRoaXMubWlkZGxlLmluaXQoICkgKSAsIHRoaXMubWlkZGxlLmxhc3QoICkuZGlnaXQoICkgKSA7XG5cblx0fVxuXG5cdHJldHVybiBuZXcgRGVlcCggdGhpcy5NICwgdGhpcy5sZWZ0ICwgdGhpcy5taWRkbGUgLCB0aGlzLnJpZ2h0LmluaXQoICkgKSA7XG5cbn0gO1xuRGVlcC5wcm90b3R5cGUuY29ucyA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0aWYgKCB0aGlzLmxlZnQgaW5zdGFuY2VvZiBGb3VyICkge1xuXG5cdFx0cmV0dXJuIG5ldyBEZWVwKFxuXHRcdFx0dGhpcy5NICxcblx0XHRcdG5ldyBUd28oIHZhbHVlICwgdGhpcy5sZWZ0LmhlYWQoICkgKSAsXG5cdFx0XHR0aGlzLm1pZGRsZS5jb25zKCB0aGlzLmxlZnQudGFpbCggKS5ub2RlKCB0aGlzLk0gKSApICxcblx0XHRcdHRoaXMucmlnaHRcblx0XHQpIDtcblxuXHR9XG5cblx0cmV0dXJuIG5ldyBEZWVwKCB0aGlzLk0gLCB0aGlzLmxlZnQuY29ucyggdmFsdWUgKSAsIHRoaXMubWlkZGxlICwgdGhpcy5yaWdodCApIDtcblxufSA7XG5EZWVwLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRpZiAoIHRoaXMucmlnaHQgaW5zdGFuY2VvZiBGb3VyICkge1xuXG5cdFx0cmV0dXJuIG5ldyBEZWVwKFxuXHRcdFx0dGhpcy5NICxcblx0XHRcdHRoaXMubGVmdCAsXG5cdFx0XHR0aGlzLm1pZGRsZS5wdXNoKCB0aGlzLnJpZ2h0LmluaXQoICkubm9kZSggdGhpcy5NICkgKSAsXG5cdFx0XHRuZXcgVHdvKCB0aGlzLnJpZ2h0Lmxhc3QoICkgLCB2YWx1ZSApXG5cdFx0KSA7XG5cblx0fVxuXG5cdHJldHVybiBuZXcgRGVlcCggdGhpcy5NICwgdGhpcy5sZWZ0ICwgdGhpcy5taWRkbGUgLCB0aGlzLnJpZ2h0LnB1c2goIHZhbHVlICkgKSA7XG5cbn0gO1xuRGVlcC5wcm90b3R5cGUuY29uY2F0ID0gZnVuY3Rpb24gKCBvdGhlciApIHtcblxuXHRyZXR1cm4gX2FwcDMoIHRoaXMgLCBvdGhlciApIDtcblxufSA7XG5cbkRlZXAucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiogKCApIHtcblxuXHR5aWVsZCogdGhpcy5sZWZ0IDtcblx0Zm9yICggY29uc3Qgbm9kZSBvZiB0aGlzLm1pZGRsZSApIHlpZWxkKiBub2RlIDtcblx0eWllbGQqIHRoaXMucmlnaHQgO1xuXG59IDtcblxuLyoqXG4gKiBJdCBpcyBhc3N1bWVkIHRoYXQgcCh8dGhpc3wpIGlzIHRydWUuXG4gKi9cbkRlZXAucHJvdG90eXBlLnNwbGl0VHJlZSA9IGZ1bmN0aW9uICggcCAsIGkgKSB7XG5cblx0Y29uc3QgeyBsZWZ0ICwgbWlkZGxlICwgcmlnaHQgLCBNIH0gPSB0aGlzIDtcblxuXHQvLyBzZWUgaWYgdGhlIHNwbGl0IHBvaW50IGlzIGluc2lkZSB0aGUgbGVmdCB0cmVlXG5cdGNvbnN0IGxlZnRNZWFzdXJlID0gTS5wbHVzKCBpICwgbGVmdC5tZWFzdXJlKCBNICkgKSA7XG5cdGlmICggcCggbGVmdE1lYXN1cmUgKSApIHtcblx0XHRjb25zdCBzcGxpdCA9IGxlZnQuc3BsaXREaWdpdCggcCAsIGkgLCBNICkgO1xuXHRcdHJldHVybiBuZXcgU3BsaXQoXG5cdFx0XHRfZnJvbV9zbWFsbF9saXN0KCBNICwgc3BsaXQubGVmdCApICxcblx0XHRcdHNwbGl0Lm1pZGRsZSAsXG5cdFx0XHRfZGVlcEwoIE0gLCBzcGxpdC5yaWdodCAsIG1pZGRsZSAsIHJpZ2h0IClcblx0XHQpIDtcblx0fVxuXG5cdC8vIHNlZSBpZiB0aGUgc3BsaXQgcG9pbnQgaXMgaW5zaWRlIHRoZSBtaWRkbGUgdHJlZVxuXHRjb25zdCBtaWRNZWFzdXJlID0gTS5wbHVzKCBsZWZ0TWVhc3VyZSAsIG1pZGRsZS5tZWFzdXJlKCApICkgO1xuXG5cdGlmICggcCggbWlkTWVhc3VyZSApICkge1xuXHRcdGNvbnN0IG1pZFNwbGl0ID0gbWlkZGxlLnNwbGl0VHJlZSggcCAsIGxlZnRNZWFzdXJlICkgO1xuXHRcdC8vIG1pZHNwbGl0Lm1pZGRsZSBpcyBhIE5vZGUgc2luY2UgbWlkZGxlIGlzIGEgVHJlZSAoIE5vZGUgYSApXG5cdFx0Y29uc3Qgc3BsaXQgPSBtaWRTcGxpdC5taWRkbGUuZGlnaXQoICkuc3BsaXREaWdpdCggcCAsIE0ucGx1cyggbGVmdE1lYXN1cmUgLCBtaWRTcGxpdC5sZWZ0Lm1lYXN1cmUoICkgKSAsIE0gKSA7XG5cdFx0cmV0dXJuIG5ldyBTcGxpdChcblx0XHRcdF9kZWVwUiggTSAsIGxlZnQgLCBtaWRTcGxpdC5sZWZ0LCBzcGxpdC5sZWZ0ICkgLFxuXHRcdFx0c3BsaXQubWlkZGxlICxcblx0XHRcdF9kZWVwTCggTSAsIHNwbGl0LnJpZ2h0ICwgbWlkU3BsaXQucmlnaHQgLCByaWdodCApXG5cdFx0KSA7XG5cdH1cblxuXHQvLyB0aGUgc3BsaXQgcG9pbnQgaXMgaW4gdGhlIHJpZ2h0IHRyZWVcblx0Y29uc3Qgc3BsaXQgPSByaWdodC5zcGxpdERpZ2l0KCBwICwgbWlkTWVhc3VyZSAsIE0gKSA7XG5cdHJldHVybiBuZXcgU3BsaXQoXG5cdFx0X2RlZXBSKCBNICwgbGVmdCAsIG1pZGRsZSAsIHNwbGl0LmxlZnQgKSAsXG5cdFx0c3BsaXQubWlkZGxlICxcblx0XHRfZnJvbV9zbWFsbF9saXN0KCBNICwgc3BsaXQucmlnaHQgKVxuXHQpIDtcbn0gO1xuXG5EZWVwLnByb3RvdHlwZS5zcGxpdCA9IGZ1bmN0aW9uICggcCApIHtcblxuXHRpZiAoIHAoIHRoaXMubWVhc3VyZSggKSApICkge1xuXHRcdGNvbnN0IHNwbGl0ID0gdGhpcy5zcGxpdFRyZWUoIHAgLCB0aGlzLk0uemVybyggKSApIDtcblx0XHRyZXR1cm4gWyBzcGxpdC5sZWZ0ICwgc3BsaXQucmlnaHQuY29ucyggc3BsaXQubWlkZGxlICkgXSA7XG5cdH1cblxuXHRyZXR1cm4gWyB0aGlzICwgbmV3IEVtcHR5KCB0aGlzLk0gKSBdIDtcblxufSA7XG4iXX0=
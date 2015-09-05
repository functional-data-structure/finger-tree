"use strict";

var _bind = Function.prototype.bind;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {

		/* js/src/FingerTree.js */
		/*
  Finger tree implementation and application examples.
  A finger tree is a purely functional data structure used in
  efficiently implementing other functional data structures. A
  finger tree gives amortized constant time access to the "fingers"
  (leaves) of the tree, where data is stored, and the internal
  nodes are labeled in some way as to provide the functionality of
  the particular data structure being implemented.
  More information on Wikipedia: http://goo.gl/ppH2nE
  "Finger trees: a simple general-purpose data structure": http://goo.gl/jX4DeL
  */

		/*
  # data Node a = Node2 a a | Node3 a a a
  # data Digit a = One a | Two a a | Three a a a | Four a a a a
  # data FingerTree a = Empty
  #                   | Single a
  #                   | Deep (Digit a) (FingerTree (Node a)) (Digit a)
  */

		//const One = function ( a ) {
		//	this.a = a ;
		//} ;
		//
		//const Two = function ( a , b ) {
		//	this.a = a ;
		//	this.b = b ;
		//} ;
		//
		//const Three = function ( a , b , c ) {
		//	this.a = a ;
		//	this.b = b ;
		//	this.c = c ;
		//} ;
		//
		//const Four = function ( a , b , c , d ) {
		//	this.a = a ;
		//	this.b = b ;
		//	this.c = c ;
		//	this.d = d ;
		//} ;
		//
		//const Node2 = function ( a , b ) {
		//	this.a = a ;
		//	this.b = b ;
		//} ;
		//
		//Node2.prototype[Symbol.iterator] = function* ( ) {
		//	yield this.a ;
		//	yield this.b ;
		//} ;

		var Node3 = function Node3(a, b, c) {
			this.a = a;
			this.b = b;
			this.c = c;
		};

		Node3.prototype[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
			return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						context$3$0.next = 2;
						return this.a;

					case 2:
						context$3$0.next = 4;
						return this.b;

					case 4:
						context$3$0.next = 6;
						return this.c;

					case 6:
					case "end":
						return context$3$0.stop();
				}
			}, callee$2$0, this);
		});

		var FingerTree = function FingerTree(measure) {
			return new Empty(measure);
		};

		var Empty = function Empty(measure) {
			this.measure = measure;
		};

		Empty.prototype.empty = function () {
			return true;
		};
		Empty.prototype.head = Empty.prototype.last = function () {
			return undefined;
		};
		Empty.prototype.tail = Empty.prototype.init = function () {
			return this;
		};

		Empty.prototype.push = Empty.prototype.unshift = function (value) {
			return new Single(this.measure, value);
		};

		Empty.prototype[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
			return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						return context$3$0.delegateYield([], "t0", 1);

					case 1:
					case "end":
						return context$3$0.stop();
				}
			}, callee$2$0, this);
		});

		var Single = function Single(measure, element) {
			this.measure = measure;
			this.element = element;
		};

		Single.prototype.empty = function () {
			return false;
		};
		Single.prototype.head = Single.prototype.last = function () {
			return this.element;
		};
		Single.prototype.tail = Single.prototype.init = function () {
			return new Empty(this.measure);
		};

		Single.prototype.unshift = function (value) {
			return new Deep(this.measure, [value], new Empty(this.measure), [this.element]);
		};

		Single.prototype.push = function (value) {
			return new Deep(this.measure, [this.element], new Empty(this.measure), [value]);
		};

		Single.prototype[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
			return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						context$3$0.next = 2;
						return this.element;

					case 2:
					case "end":
						return context$3$0.stop();
				}
			}, callee$2$0, this);
		});

		var Deep = function Deep(measure, left, middle, right) {
			this.measure = measure;
			this.left = left;
			this.middle = middle;
			this.right = right;
		};

		Deep.prototype.empty = function () {
			return false;
		};
		Deep.prototype.head = function () {
			return this.left[0];
		};
		Deep.prototype.last = function () {
			return this.right[this.right.length - 1];
		};

		Deep.prototype.tail = function () {

			if (this.left.length === 1) {

				if (this.middle.empty()) {
					return FingerTree.from_iterable(this.measure, this.right);
				}

				return new Deep(this.measure, [].concat(_toConsumableArray(this.middle.head())), this.middle.tail(), this.right);
			}

			return new Deep(this.measure, this.left.slice(1), this.middle, this.right);
		};

		Deep.prototype.init = function () {

			if (this.right.length === 1) {

				if (this.middle.empty()) {
					return FingerTree.from_iterable(this.measure, this.left);
				}

				return new Deep(this.measure, this.left, this.middle.init(), [].concat(_toConsumableArray(this.middle.last())));
			}

			return new Deep(this.measure, this.left, this.middle, this.right.slice(0, this.right.length - 1));
		};

		Deep.prototype.unshift = function (value) {

			if (this.left.length === 4) {

				return new Deep(this.measure, [value, this.left[0]], this.middle.unshift(new (_bind.apply(Node3, [null].concat(_toConsumableArray(this.left.slice(1)))))()), this.right);
			}

			return new Deep(this.measure, [value].concat(this.left), this.middle, this.right);
		};

		Deep.prototype.push = function (value) {

			if (this.right.length === 4) {

				return new Deep(this.measure, this.left, this.middle.push(new (_bind.apply(Node3, [null].concat(_toConsumableArray(this.right.slice(0, 3)))))()), [this.right[3], value]);
			}

			return new Deep(this.measure, this.left, this.middle, this.right.concat([value]));
		};

		Deep.prototype[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
			var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, m;

			return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						return context$3$0.delegateYield(this.left, "t0", 1);

					case 1:
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						context$3$0.prev = 4;
						_iterator = this.middle[Symbol.iterator]();

					case 6:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							context$3$0.next = 12;
							break;
						}

						m = _step.value;
						return context$3$0.delegateYield(m, "t1", 9);

					case 9:
						_iteratorNormalCompletion = true;
						context$3$0.next = 6;
						break;

					case 12:
						context$3$0.next = 18;
						break;

					case 14:
						context$3$0.prev = 14;
						context$3$0.t2 = context$3$0["catch"](4);
						_didIteratorError = true;
						_iteratorError = context$3$0.t2;

					case 18:
						context$3$0.prev = 18;
						context$3$0.prev = 19;

						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}

					case 21:
						context$3$0.prev = 21;

						if (!_didIteratorError) {
							context$3$0.next = 24;
							break;
						}

						throw _iteratorError;

					case 24:
						return context$3$0.finish(21);

					case 25:
						return context$3$0.finish(18);

					case 26:
						return context$3$0.delegateYield(this.right, "t3", 27);

					case 27:
					case "end":
						return context$3$0.stop();
				}
			}, callee$2$0, this, [[4, 14, 18, 26], [19,, 21, 25]]);
		});

		FingerTree.from_iterable = function (measure, iterable) {

			var tree = new Empty(measure);

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = iterable[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var value = _step2.value;
					tree = tree.push(value);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
						_iterator2["return"]();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return tree;
		};

		exports.FingerTree = FingerTree;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("aureooms-js-fingertree", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["fingertree"] = {});
	} else console.error("unable to detect type of module to define for aureooms-js-fingertree");
})();
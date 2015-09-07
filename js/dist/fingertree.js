'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {
		var marked2$0 = [chain, map, reversed].map(regeneratorRuntime.mark);

		/* js/src/core */
		/* js/src/core/concatenate */
		/* js/src/core/concatenate/app3.js */
		var app3 = function app3(A, list, B) {

			if (A instanceof Empty) return extendleft(B, list);
			if (B instanceof Empty) return extend(A, list);

			if (A instanceof Single) return extendleft(B, list).unshift(A.head());
			if (B instanceof Single) return extend(A, list).push(B.last());

			return new Deep(A.measure, A.left, app3(A.middle, nodes(A.measure, [].concat(_toConsumableArray(chain(A.right, list, B.left)))), B.middle), B.right);
		};

		/* js/src/core/concatenate/digit.js */

		function digit(list) {

			switch (list.length) {

				case 1:
					return new One(list[0]);
				case 2:
					return new Two(list[0], list[1]);
				case 3:
					return new Three(list[0], list[1], list[2]);
				case 4:
					throw new Error('digit(.) should never be called on length 4 lists since it is only called on results of splitDigit which outputs lists of length at most 3');
				default:
					throw new Error('cannot make digit for length ' + list.length);

			}
		}

		/* js/src/core/concatenate/extend.js */
		function extend(tree, list) {

			return reduce(push, list, tree);
		}

		/* js/src/core/concatenate/extendleft.js */
		function extendleft(tree, list) {

			return reduce(unshift, reversed(list), tree);
		}

		/* js/src/core/concatenate/from_iterable.js */
		function from_iterable(measure, iterable) {

			return reduce(push, iterable, new Empty(measure));
		}

		/* js/src/core/concatenate/nodes.js */
		function nodes(M, list) {

			switch (list.length) {

				case 2:
					return [node2(M, list[0], list[1])];
				case 3:
					return [node3(M, list[0], list[1], list[2])];
				case 4:
					return [node2(M, list[0], list[1]), node2(M, list[2], list[3])];
				default:
					return [node3(M, list[0], list[1], list[2])].concat(nodes(M, list.slice(3)));

			}
		}

		/* js/src/core/concatenate/push.js */
		function push(T, x) {
			return T.push(x);
		}

		/* js/src/core/concatenate/unshift.js */
		function unshift(T, x) {
			return T.unshift(x);
		}

		/* js/src/core/empty */
		/* js/src/core/empty/1-EmptyGenerator.js */

		var EmptyGenerator = (function () {
			function EmptyGenerator() {
				_classCallCheck(this, EmptyGenerator);
			}

			/* js/src/core/empty/2-EMPTY.js */

			_createClass(EmptyGenerator, [{
				key: 'next',
				value: function next() {

					return { done: true };
				}
			}]);

			return EmptyGenerator;
		})();

		var EMPTY = new EmptyGenerator();

		/* js/src/core/itertools */
		/* js/src/core/itertools/chain.js */
		function chain() {
			var _iteratorNormalCompletion,
			    _didIteratorError,
			    _iteratorError,
			    _len,
			    iterables,
			    _key,
			    _iterator,
			    _step,
			    iterable,
			    args$3$0 = arguments;

			return regeneratorRuntime.wrap(function chain$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						context$3$0.prev = 3;

						for (_len = args$3$0.length, iterables = Array(_len), _key = 0; _key < _len; _key++) {
							iterables[_key] = args$3$0[_key];
						}

						_iterator = iterables[Symbol.iterator]();

					case 6:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							context$3$0.next = 12;
							break;
						}

						iterable = _step.value;
						return context$3$0.delegateYield(iterable, 't0', 9);

					case 9:
						_iteratorNormalCompletion = true;
						context$3$0.next = 6;
						break;

					case 12:
						context$3$0.next = 18;
						break;

					case 14:
						context$3$0.prev = 14;
						context$3$0.t1 = context$3$0['catch'](3);
						_didIteratorError = true;
						_iteratorError = context$3$0.t1;

					case 18:
						context$3$0.prev = 18;
						context$3$0.prev = 19;

						if (!_iteratorNormalCompletion && _iterator['return']) {
							_iterator['return']();
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
					case 'end':
						return context$3$0.stop();
				}
			}, marked2$0[0], this, [[3, 14, 18, 26], [19,, 21, 25]]);
		}

		/* js/src/core/itertools/map.js */
		function map(callable, iterable) {
			var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, value;

			return regeneratorRuntime.wrap(function map$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						_iteratorNormalCompletion2 = true;
						_didIteratorError2 = false;
						_iteratorError2 = undefined;
						context$3$0.prev = 3;
						_iterator2 = iterable[Symbol.iterator]();

					case 5:
						if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
							context$3$0.next = 12;
							break;
						}

						value = _step2.value;
						context$3$0.next = 9;
						return callable(value);

					case 9:
						_iteratorNormalCompletion2 = true;
						context$3$0.next = 5;
						break;

					case 12:
						context$3$0.next = 18;
						break;

					case 14:
						context$3$0.prev = 14;
						context$3$0.t0 = context$3$0['catch'](3);
						_didIteratorError2 = true;
						_iteratorError2 = context$3$0.t0;

					case 18:
						context$3$0.prev = 18;
						context$3$0.prev = 19;

						if (!_iteratorNormalCompletion2 && _iterator2['return']) {
							_iterator2['return']();
						}

					case 21:
						context$3$0.prev = 21;

						if (!_didIteratorError2) {
							context$3$0.next = 24;
							break;
						}

						throw _iteratorError2;

					case 24:
						return context$3$0.finish(21);

					case 25:
						return context$3$0.finish(18);

					case 26:
					case 'end':
						return context$3$0.stop();
				}
			}, marked2$0[1], this, [[3, 14, 18, 26], [19,, 21, 25]]);
		}

		/* js/src/core/itertools/reduce.js */
		function reduce(callable, iterable, initial) {

			var accumulator = initial;

			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = iterable[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var value = _step3.value;
					accumulator = callable(accumulator, value);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3['return']) {
						_iterator3['return']();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return accumulator;
		}

		/* js/src/core/itertools/reversed.js */
		function reversed(list) {
			var i;
			return regeneratorRuntime.wrap(function reversed$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						i = list.length;

					case 1:
						if (! i--) {
							context$3$0.next = 6;
							break;
						}

						context$3$0.next = 4;
						return list[i];

					case 4:
						context$3$0.next = 1;
						break;

					case 6:
					case 'end':
						return context$3$0.stop();
				}
			}, marked2$0[2], this);
		}

		/* js/src/core/measure */
		/* js/src/core/measure/Measured.js */

		var Measured = function Measured(measure, element) {
			_classCallCheck(this, Measured);

			this.element = element;
			this.v = measure.measure(element);
		}

		/* js/src/core/measure/cache.js */

		;

		var CachedMeasure = (function () {
			function CachedMeasure(M) {
				_classCallCheck(this, CachedMeasure);

				this.M = M;
			}

			_createClass(CachedMeasure, [{
				key: 'zero',
				value: function zero() {
					return this.M.zero();
				}
			}, {
				key: 'plus',
				value: function plus(a, b) {
					return this.M.plus(a, b);
				}
			}, {
				key: 'measure',
				value: function measure(measured) {
					return measured.v;
				}
			}]);

			return CachedMeasure;
		})();

		function cache(M) {

			return M instanceof CachedMeasure ? M : new CachedMeasure(M);
		}

		/* js/src/core/measure/measure.js */

		function measure(M, list) {

			return reduce(M.plus.bind(M), map(M.measure.bind(M), list), M.zero());
		}

		/* js/src/core/split */
		/* js/src/core/split/Split.js */

		var Split = function Split(left, middle, right) {
			_classCallCheck(this, Split);

			this.left = left;
			this.middle = middle;
			this.right = right;
		}

		/* js/src/core/split/deepL.js */
		/**
  * @param {Array} left
  * @param {FingerTree} middle
  * @param {Digit} right
  */
		;

		function deepL(M, left, middle, right) {

			if (left.length === 0) {

				if (middle.empty()) return from_iterable(M, right);

				return new Deep(M, middle.head().digit(), middle.tail(), right);
			}

			return new Deep(M, digit(left), middle, right);
		}

		/* js/src/core/split/deepR.js */
		/**
  * @param {Digit} left
  * @param {FingerTree} middle
  * @param {Array} right
  */
		function deepR(M, left, middle, right) {

			if (right.length === 0) {

				if (middle.empty()) return from_iterable(M, left);

				return new Deep(M, left, middle.init(), middle.last().digit());
			}

			return new Deep(M, left, middle, digit(right));
		}

		/* js/src/digit */
		/* js/src/digit/1-One.js */

		var One = (function () {
			function One(a) {
				_classCallCheck(this, One);

				this.a = a;
			}

			/* js/src/digit/2-Two.js */

			_createClass(One, [{
				key: Symbol.iterator,
				value: regeneratorRuntime.mark(function value() {
					return regeneratorRuntime.wrap(function value$(context$4$0) {
						while (1) switch (context$4$0.prev = context$4$0.next) {
							case 0:
								context$4$0.next = 2;
								return this.a;

							case 2:
							case 'end':
								return context$4$0.stop();
						}
					}, value, this);
				})
			}, {
				key: 'head',
				value: function head() {
					return this.a;
				}
			}, {
				key: 'last',
				value: function last() {
					return this.a;
				}
			}, {
				key: 'init',
				value: function init() {
					throw new Error("cannot call init on digit One");
				}
			}, {
				key: 'tail',
				value: function tail() {
					throw new Error("cannot call tail on digit One");
				}
			}, {
				key: 'push',
				value: function push(value) {
					return new Two(this.a, value);
				}
			}, {
				key: 'unshift',
				value: function unshift(value) {
					return new Two(value, this.a);
				}
			}, {
				key: 'node',
				value: function node(measure) {
					throw new Error("cannot convert One to node");
				}

				/**
     * It is assumed that p(|this|) is true.
     */
			}, {
				key: 'splitDigit',
				value: function splitDigit(p, i, M) {
					return new Split([], this.a, []);
				}
			}, {
				key: 'length',
				get: function get() {
					return 1;
				}
			}]);

			return One;
		})();

		var Two = (function () {
			function Two(a, b) {
				_classCallCheck(this, Two);

				this.a = a;
				this.b = b;
			}

			/* js/src/digit/3-Three.js */

			_createClass(Two, [{
				key: Symbol.iterator,
				value: regeneratorRuntime.mark(function value() {
					return regeneratorRuntime.wrap(function value$(context$4$0) {
						while (1) switch (context$4$0.prev = context$4$0.next) {
							case 0:
								context$4$0.next = 2;
								return this.a;

							case 2:
								context$4$0.next = 4;
								return this.b;

							case 4:
							case 'end':
								return context$4$0.stop();
						}
					}, value, this);
				})
			}, {
				key: 'head',
				value: function head() {
					return this.a;
				}
			}, {
				key: 'last',
				value: function last() {
					return this.b;
				}
			}, {
				key: 'init',
				value: function init() {
					return new One(this.a);
				}
			}, {
				key: 'tail',
				value: function tail() {
					return new One(this.b);
				}
			}, {
				key: 'push',
				value: function push(value) {
					return new Three(this.a, this.b, value);
				}
			}, {
				key: 'unshift',
				value: function unshift(value) {
					return new Three(value, this.a, this.b);
				}
			}, {
				key: 'node',
				value: function node(measure) {
					throw new Error("Two should never be converted to Node2 with current implementation");
				}

				/**
     * It is assumed that p(|this|) is true.
     */
			}, {
				key: 'splitDigit',
				value: function splitDigit(p, i, M) {
					i = M.plus(i, this.a.v);
					if (p(i)) return new Split([], this.a, [this.b]);
					return new Split([this.a], this.b, []);
				}
			}, {
				key: 'length',
				get: function get() {
					return 2;
				}
			}]);

			return Two;
		})();

		var Three = (function () {
			function Three(a, b, c) {
				_classCallCheck(this, Three);

				this.a = a;
				this.b = b;
				this.c = c;
			}

			/* js/src/digit/4-Four.js */

			_createClass(Three, [{
				key: Symbol.iterator,
				value: regeneratorRuntime.mark(function value() {
					return regeneratorRuntime.wrap(function value$(context$4$0) {
						while (1) switch (context$4$0.prev = context$4$0.next) {
							case 0:
								context$4$0.next = 2;
								return this.a;

							case 2:
								context$4$0.next = 4;
								return this.b;

							case 4:
								context$4$0.next = 6;
								return this.c;

							case 6:
							case 'end':
								return context$4$0.stop();
						}
					}, value, this);
				})
			}, {
				key: 'head',
				value: function head() {
					return this.a;
				}
			}, {
				key: 'last',
				value: function last() {
					return this.c;
				}
			}, {
				key: 'init',
				value: function init() {
					return new Two(this.a, this.b);
				}
			}, {
				key: 'tail',
				value: function tail() {
					return new Two(this.b, this.c);
				}
			}, {
				key: 'push',
				value: function push(value) {
					return new Four(this.a, this.b, this.c, value);
				}
			}, {
				key: 'unshift',
				value: function unshift(value) {
					return new Four(value, this.a, this.b, this.c);
				}
			}, {
				key: 'node',
				value: function node(measure) {
					return node3(measure, this.a, this.b, this.c);
				}

				/**
     * It is assumed that p(|this|) is true.
     */
			}, {
				key: 'splitDigit',
				value: function splitDigit(p, i, M) {
					i = M.plus(i, this.a.v);
					if (p(i)) return new Split([], this.a, [this.b, this.c]);
					i = M.plus(i, this.b.v);
					if (p(i)) return new Split([this.a], this.b, [this.c]);
					return new Split([this.a, this.b], this.c, []);
				}
			}, {
				key: 'length',
				get: function get() {
					return 3;
				}
			}]);

			return Three;
		})();

		var Four = (function () {
			function Four(a, b, c, d) {
				_classCallCheck(this, Four);

				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
			}

			/* js/src/node */
			/* js/src/node/Node2.js */

			_createClass(Four, [{
				key: Symbol.iterator,
				value: regeneratorRuntime.mark(function value() {
					return regeneratorRuntime.wrap(function value$(context$4$0) {
						while (1) switch (context$4$0.prev = context$4$0.next) {
							case 0:
								context$4$0.next = 2;
								return this.a;

							case 2:
								context$4$0.next = 4;
								return this.b;

							case 4:
								context$4$0.next = 6;
								return this.c;

							case 6:
								context$4$0.next = 8;
								return this.d;

							case 8:
							case 'end':
								return context$4$0.stop();
						}
					}, value, this);
				})
			}, {
				key: 'head',
				value: function head() {
					return this.a;
				}
			}, {
				key: 'last',
				value: function last() {
					return this.d;
				}
			}, {
				key: 'init',
				value: function init() {
					return new Three(this.a, this.b, this.c);
				}
			}, {
				key: 'tail',
				value: function tail() {
					return new Three(this.b, this.c, this.d);
				}
			}, {
				key: 'push',
				value: function push(value) {
					throw new Error("cannot push digit Four");
				}
			}, {
				key: 'unshift',
				value: function unshift(value) {
					throw new Error("cannot unshift digit Four");
				}
			}, {
				key: 'node',
				value: function node(measure) {
					throw new Error("cannot convert Four to node");
				}

				/**
     * It is assumed that p(|this|) is true.
     */
			}, {
				key: 'splitDigit',
				value: function splitDigit(p, i, M) {
					i = M.plus(i, this.a.v);
					if (p(i)) return new Split([], this.a, [this.b, this.c, this.d]);
					i = M.plus(i, this.b.v);
					if (p(i)) return new Split([this.a], this.b, [this.c, this.d]);
					i = M.plus(i, this.c.v);
					if (p(i)) return new Split([this.a, this.b], this.c, [this.d]);
					return new Split([this.a, this.b, this.c], this.d, []);
				}
			}, {
				key: 'length',
				get: function get() {
					return 4;
				}
			}]);

			return Four;
		})();

		var Node2 = (function () {
			function Node2(v, a, b) {
				_classCallCheck(this, Node2);

				this.v = v;
				this.a = a;
				this.b = b;
			}

			_createClass(Node2, [{
				key: Symbol.iterator,
				value: regeneratorRuntime.mark(function value() {
					return regeneratorRuntime.wrap(function value$(context$4$0) {
						while (1) switch (context$4$0.prev = context$4$0.next) {
							case 0:
								context$4$0.next = 2;
								return this.a;

							case 2:
								context$4$0.next = 4;
								return this.b;

							case 4:
							case 'end':
								return context$4$0.stop();
						}
					}, value, this);
				})
			}, {
				key: 'digit',
				value: function digit() {
					return new Two(this.a, this.b);
				}
			}, {
				key: 'head',
				value: function head() {
					throw new Error("trying to call head of Node2");
				}
			}, {
				key: 'last',
				value: function last() {
					throw new Error("trying to call last of Node2");
				}
			}, {
				key: 'init',
				value: function init() {
					throw new Error("trying to call init of Node2");
				}
			}, {
				key: 'tail',
				value: function tail() {
					throw new Error("trying to call tail of Node2");
				}
			}, {
				key: 'push',
				value: function push(value) {
					throw new Error("trying to call push of Node2");
				}
			}, {
				key: 'unshift',
				value: function unshift(value) {
					throw new Error("trying to call unshift of Node2");
				}
			}, {
				key: 'length',
				get: function get() {
					throw new Error("trying to call length of Node2");
				}
			}]);

			return Node2;
		})();

		function node2(M, a, b) {

			return new Node2(measure(M, [a, b]), a, b);
		}

		/* js/src/node/Node3.js */

		var Node3 = (function () {
			function Node3(v, a, b, c) {
				_classCallCheck(this, Node3);

				this.v = v;
				this.a = a;
				this.b = b;
				this.c = c;
			}

			_createClass(Node3, [{
				key: Symbol.iterator,
				value: regeneratorRuntime.mark(function value() {
					return regeneratorRuntime.wrap(function value$(context$4$0) {
						while (1) switch (context$4$0.prev = context$4$0.next) {
							case 0:
								context$4$0.next = 2;
								return this.a;

							case 2:
								context$4$0.next = 4;
								return this.b;

							case 4:
								context$4$0.next = 6;
								return this.c;

							case 6:
							case 'end':
								return context$4$0.stop();
						}
					}, value, this);
				})
			}, {
				key: 'digit',
				value: function digit() {
					return new Three(this.a, this.b, this.c);
				}
			}, {
				key: 'head',
				value: function head() {
					throw new Error("trying to call head of Node3");
				}
			}, {
				key: 'last',
				value: function last() {
					throw new Error("trying to call last of Node3");
				}
			}, {
				key: 'init',
				value: function init() {
					throw new Error("trying to call init of Node3");
				}
			}, {
				key: 'tail',
				value: function tail() {
					throw new Error("trying to call tail of Node3");
				}
			}, {
				key: 'push',
				value: function push(value) {
					throw new Error("trying to call push of Node3");
				}
			}, {
				key: 'unshift',
				value: function unshift(value) {
					throw new Error("trying to call unshift of Node3");
				}
			}, {
				key: 'length',
				get: function get() {
					throw new Error("trying to call length of Node3");
				}
			}]);

			return Node3;
		})();

		function node3(M, a, b, c) {

			return new Node3(measure(M, [a, b, c]), a, b, c);
		}

		/* js/src/tree */
		/* js/src/tree/0-sugar */
		/* js/src/tree/0-sugar/Tree.js */

		var Tree = (function () {
			function Tree() {
				_classCallCheck(this, Tree);
			}

			/* js/src/tree/1-base */
			/* js/src/tree/1-base/0-Empty.js */

			_createClass(Tree, [{
				key: 'takeUntil',
				value: function takeUntil(p) {
					return this.split(p)[0];
				}
			}, {
				key: 'dropUntil',
				value: function dropUntil(p) {
					return this.split(p)[1];
				}
			}, {
				key: 'extend',
				value: function extend(iterable) {
					return reduce(push, iterable, this);
				}
			}, {
				key: 'extendleft',
				value: function extendleft(iterable) {
					return reduce(unshift, reversed([].concat(_toConsumableArray(iterable))), this);
				}
			}]);

			return Tree;
		})();

		var Empty = (function (_Tree) {
			_inherits(Empty, _Tree);

			function Empty(measure) {
				_classCallCheck(this, Empty);

				_get(Object.getPrototypeOf(Empty.prototype), 'constructor', this).call(this);
				this.measure = measure;
				this.v = measure.zero();
			}

			/* js/src/tree/1-base/1-Single.js */

			_createClass(Empty, [{
				key: 'empty',
				value: function empty() {
					return true;
				}
			}, {
				key: 'head',
				value: function head() {
					throw new Error("cannot call head on Empty");
				}
			}, {
				key: 'last',
				value: function last() {
					throw new Error("cannot call last on Empty");
				}
			}, {
				key: 'tail',
				value: function tail() {
					return this;
				}
			}, {
				key: 'init',
				value: function init() {
					return this;
				}
			}, {
				key: 'push',
				value: function push(value) {
					return new Single(this.measure, value);
				}
			}, {
				key: 'unshift',
				value: function unshift(value) {
					return new Single(this.measure, value);
				}
			}, {
				key: 'concat',
				value: function concat(other) {
					return other;
				}
			}, {
				key: Symbol.iterator,
				value: function value() {
					return EMPTY;
				}

				/**
     * It is assumed that p(|this|) is true.
     */
			}, {
				key: 'splitTree',
				value: function splitTree(p, i) {
					throw new Error("splitTree not implemented in Empty");
				}
			}, {
				key: 'split',
				value: function split(p) {
					return [this, this];
				}
			}]);

			return Empty;
		})(Tree);

		var Single = (function (_Tree2) {
			_inherits(Single, _Tree2);

			function Single(measure, element) {
				_classCallCheck(this, Single);

				_get(Object.getPrototypeOf(Single.prototype), 'constructor', this).call(this);
				this.measure = measure;
				this.element = element;
				this.v = measure.measure(element);
			}

			/* js/src/tree/1-base/2-Deep.js */

			_createClass(Single, [{
				key: 'empty',
				value: function empty() {
					return false;
				}
			}, {
				key: 'head',
				value: function head() {
					return this.element;
				}
			}, {
				key: 'last',
				value: function last() {
					return this.element;
				}
			}, {
				key: 'tail',
				value: function tail() {
					return new Empty(this.measure);
				}
			}, {
				key: 'init',
				value: function init() {
					return new Empty(this.measure);
				}
			}, {
				key: 'unshift',
				value: function unshift(value) {
					return new Deep(this.measure, new One(value), new Empty(this.measure), new One(this.element));
				}
			}, {
				key: 'push',
				value: function push(value) {
					return new Deep(this.measure, new One(this.element), new Empty(this.measure), new One(value));
				}
			}, {
				key: 'concat',
				value: function concat(other) {
					return other.unshift(this.element);
				}
			}, {
				key: Symbol.iterator,
				value: regeneratorRuntime.mark(function value() {
					return regeneratorRuntime.wrap(function value$(context$4$0) {
						while (1) switch (context$4$0.prev = context$4$0.next) {
							case 0:
								context$4$0.next = 2;
								return this.element;

							case 2:
							case 'end':
								return context$4$0.stop();
						}
					}, value, this);
				})

				/**
     * It is assumed that p(|this|) is true.
     */
			}, {
				key: 'splitTree',
				value: function splitTree(p, i) {
					return new Split(new Empty(this.measure), this.element, new Empty(this.measure));
				}
			}, {
				key: 'split',
				value: function split(p) {
					return p(this.v) ? [new Empty(this.measure), this] : [this, new Empty(this.measure)];
				}
			}]);

			return Single;
		})(Tree);

		var Deep = (function (_Tree3) {
			_inherits(Deep, _Tree3);

			function Deep(M, left, middle, right) {
				_classCallCheck(this, Deep);

				_get(Object.getPrototypeOf(Deep.prototype), 'constructor', this).call(this);
				this.measure = M;
				this.left = left;
				this.middle = middle;
				this.right = right;
				this.v = M.plus(measure(M, this.left), M.plus(this.middle.v, measure(M, this.right)));
			}

			/* js/src/tree/2-api */
			/* js/src/tree/2-api/FingerTree.js */

			_createClass(Deep, [{
				key: 'empty',
				value: function empty() {
					return false;
				}
			}, {
				key: 'head',
				value: function head() {
					return this.left.head();
				}
			}, {
				key: 'last',
				value: function last() {
					return this.right.last();
				}
			}, {
				key: 'tail',
				value: function tail() {

					if (this.left.length === 1) {

						if (this.middle.empty()) {
							return from_iterable(this.measure, this.right);
						}

						return new Deep(this.measure, this.middle.head().digit(), this.middle.tail(), this.right);
					}

					return new Deep(this.measure, this.left.tail(), this.middle, this.right);
				}
			}, {
				key: 'init',
				value: function init() {

					if (this.right.length === 1) {

						if (this.middle.empty()) {
							return from_iterable(this.measure, this.left);
						}

						return new Deep(this.measure, this.left, this.middle.init(), this.middle.last().digit());
					}

					return new Deep(this.measure, this.left, this.middle, this.right.init());
				}
			}, {
				key: 'unshift',
				value: function unshift(value) {

					if (this.left.length === 4) {

						return new Deep(this.measure, new Two(value, this.left.head()), this.middle.unshift(this.left.tail().node(this.measure)), this.right);
					}

					return new Deep(this.measure, this.left.unshift(value), this.middle, this.right);
				}
			}, {
				key: 'push',
				value: function push(value) {

					if (this.right.length === 4) {

						return new Deep(this.measure, this.left, this.middle.push(this.right.init().node(this.measure)), new Two(this.right.last(), value));
					}

					return new Deep(this.measure, this.left, this.middle, this.right.push(value));
				}
			}, {
				key: 'concat',
				value: function concat(other) {

					return app3(this, [], other);
				}
			}, {
				key: Symbol.iterator,
				value: regeneratorRuntime.mark(function value() {
					var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, node;

					return regeneratorRuntime.wrap(function value$(context$4$0) {
						while (1) switch (context$4$0.prev = context$4$0.next) {
							case 0:
								return context$4$0.delegateYield(this.left, 't0', 1);

							case 1:
								_iteratorNormalCompletion4 = true;
								_didIteratorError4 = false;
								_iteratorError4 = undefined;
								context$4$0.prev = 4;
								_iterator4 = this.middle[Symbol.iterator]();

							case 6:
								if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
									context$4$0.next = 12;
									break;
								}

								node = _step4.value;
								return context$4$0.delegateYield(node, 't1', 9);

							case 9:
								_iteratorNormalCompletion4 = true;
								context$4$0.next = 6;
								break;

							case 12:
								context$4$0.next = 18;
								break;

							case 14:
								context$4$0.prev = 14;
								context$4$0.t2 = context$4$0['catch'](4);
								_didIteratorError4 = true;
								_iteratorError4 = context$4$0.t2;

							case 18:
								context$4$0.prev = 18;
								context$4$0.prev = 19;

								if (!_iteratorNormalCompletion4 && _iterator4['return']) {
									_iterator4['return']();
								}

							case 21:
								context$4$0.prev = 21;

								if (!_didIteratorError4) {
									context$4$0.next = 24;
									break;
								}

								throw _iteratorError4;

							case 24:
								return context$4$0.finish(21);

							case 25:
								return context$4$0.finish(18);

							case 26:
								return context$4$0.delegateYield(this.right, 't3', 27);

							case 27:
							case 'end':
								return context$4$0.stop();
						}
					}, value, this, [[4, 14, 18, 26], [19,, 21, 25]]);
				})

				/**
     * It is assumed that p(|this|) is true.
     */
			}, {
				key: 'splitTree',
				value: function splitTree(p, i) {
					var left = this.left;
					var middle = this.middle;
					var right = this.right;
					var M = this.measure;

					// see if the split point is inside the left tree
					var leftMeasure = M.plus(i, measure(M, left));
					if (p(leftMeasure)) {
						var _split = left.splitDigit(p, i, M);
						return new Split(from_iterable(M, _split.left), _split.middle, deepL(M, _split.right, middle, right));
					}

					// see if the split point is inside the middle tree
					var midMeasure = M.plus(leftMeasure, middle.v);

					if (p(midMeasure)) {
						var midSplit = middle.splitTree(p, leftMeasure);
						// midsplit.middle is a Node since middle is a Tree ( Node a )
						var _split2 = midSplit.middle.digit().splitDigit(p, M.plus(leftMeasure, midSplit.left.v), M);
						return new Split(deepR(M, left, midSplit.left, _split2.left), _split2.middle, deepL(M, _split2.right, midSplit.right, right));
					}

					// the split point is in the right tree
					var split = right.splitDigit(p, midMeasure, M);
					return new Split(deepR(M, left, middle, split.left), split.middle, from_iterable(M, split.right));
				}
			}, {
				key: 'split',
				value: function split(p) {

					if (p(this.v)) {
						var split = this.splitTree(p, this.measure.zero());
						return [split.left, split.right.unshift(split.middle)];
					}

					return [this, new Empty(this.measure)];
				}
			}]);

			return Deep;
		})(Tree);

		var FingerTree = (function (_Tree4) {
			_inherits(FingerTree, _Tree4);

			function FingerTree(measure) {
				var T = arguments.length <= 1 || arguments[1] === undefined ? new Empty(cache(measure)) : arguments[1];
				return (function () {
					_classCallCheck(this, FingerTree);

					_get(Object.getPrototypeOf(FingerTree.prototype), 'constructor', this).call(this);
					this.M = measure;
					this.T = T;
				}).apply(this, arguments);
			}

			_createClass(FingerTree, [{
				key: 'measure',
				value: function measure() {
					return this.T.v;
				}
			}, {
				key: 'empty',
				value: function empty() {
					return this.T.empty();
				}
			}, {
				key: 'head',
				value: function head() {
					return this.T.head().element;
				}
			}, {
				key: 'last',
				value: function last() {
					return this.T.last().element;
				}
			}, {
				key: 'tail',
				value: function tail() {
					return new FingerTree(this.M, this.T.tail());
				}
			}, {
				key: 'init',
				value: function init() {
					return new FingerTree(this.M, this.T.init());
				}
			}, {
				key: 'push',
				value: function push(value) {
					return new FingerTree(this.M, this.T.push(new Measured(this.M, value)));
				}
			}, {
				key: 'unshift',
				value: function unshift(value) {
					return new FingerTree(this.M, this.T.unshift(new Measured(this.M, value)));
				}
			}, {
				key: 'concat',
				value: function concat(other) {
					return new FingerTree(this.M, this.T.concat(other.T));
				}
			}, {
				key: Symbol.iterator,
				value: regeneratorRuntime.mark(function value() {
					var _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, measured;

					return regeneratorRuntime.wrap(function value$(context$4$0) {
						while (1) switch (context$4$0.prev = context$4$0.next) {
							case 0:
								_iteratorNormalCompletion5 = true;
								_didIteratorError5 = false;
								_iteratorError5 = undefined;
								context$4$0.prev = 3;
								_iterator5 = this.T[Symbol.iterator]();

							case 5:
								if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
									context$4$0.next = 12;
									break;
								}

								measured = _step5.value;
								context$4$0.next = 9;
								return measured.element;

							case 9:
								_iteratorNormalCompletion5 = true;
								context$4$0.next = 5;
								break;

							case 12:
								context$4$0.next = 18;
								break;

							case 14:
								context$4$0.prev = 14;
								context$4$0.t0 = context$4$0['catch'](3);
								_didIteratorError5 = true;
								_iteratorError5 = context$4$0.t0;

							case 18:
								context$4$0.prev = 18;
								context$4$0.prev = 19;

								if (!_iteratorNormalCompletion5 && _iterator5['return']) {
									_iterator5['return']();
								}

							case 21:
								context$4$0.prev = 21;

								if (!_didIteratorError5) {
									context$4$0.next = 24;
									break;
								}

								throw _iteratorError5;

							case 24:
								return context$4$0.finish(21);

							case 25:
								return context$4$0.finish(18);

							case 26:
							case 'end':
								return context$4$0.stop();
						}
					}, value, this, [[3, 14, 18, 26], [19,, 21, 25]]);
				})
			}, {
				key: 'splitTree',
				value: function splitTree(p, i) {
					var _T$splitTree = this.T.splitTree(p, i);

					var left = _T$splitTree.left;
					var middle = _T$splitTree.middle;
					var right = _T$splitTree.right;

					return new Split(new FingerTree(this.M, left), middle.element, new FingerTree(this.M, right));
				}
			}, {
				key: 'split',
				value: function split(p) {
					var _T$split = this.T.split(p);

					var _T$split2 = _slicedToArray(_T$split, 2);

					var left = _T$split2[0];
					var right = _T$split2[1];

					return [new FingerTree(this.M, left), new FingerTree(this.M, right)];
				}
			}], [{
				key: 'from_iterable',
				value: function from_iterable(measure, iterable) {

					return new FingerTree(measure).extend(iterable);
				}
			}]);

			return FingerTree;
		})(Tree);

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
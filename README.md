[@aureooms/js-fingertree](http://aureooms.github.io/js-fingertree)
==

<img src="https://cdn.rawgit.com/aureooms/js-fingertree/master/media/sketch.svg" width="864">

Finger trees for JavaScript.
See [docs](http://aureooms.github.io/js-fingertree).
Parent is [@aureooms/js-persistent](https://github.com/aureooms/js-persistent).

    data FingerTree x = Empty
                      | Single x
                      | Deep ( Digit x ) ( FingerTree ( Node x ) ) ( Digit x )

[![License](https://img.shields.io/github/license/aureooms/js-fingertree.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-fingertree/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/@aureooms/js-fingertree.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-fingertree)
[![Build Status](https://img.shields.io/travis/aureooms/js-fingertree.svg?style=flat)](https://travis-ci.org/aureooms/js-fingertree)
[![Coverage Status](https://img.shields.io/coveralls/aureooms/js-fingertree.svg?style=flat)](https://coveralls.io/r/aureooms/js-fingertree)
[![Dependencies Status](https://img.shields.io/david/aureooms/js-fingertree.svg?style=flat)](https://david-dm.org/aureooms/js-fingertree#info=dependencies)
[![devDependencies Status](https://img.shields.io/david/dev/aureooms/js-fingertree.svg?style=flat)](https://david-dm.org/aureooms/js-fingertree#info=devDependencies)
[![Code Climate](https://img.shields.io/codeclimate/github/aureooms/js-fingertree.svg?style=flat)](https://codeclimate.com/github/aureooms/js-fingertree)
[![NPM downloads per month](https://img.shields.io/npm/dm/@aureooms/js-fingertree.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-fingertree)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-fingertree.svg?style=flat)](https://github.com/aureooms/js-fingertree/issues)
[![Documentation](https://aureooms.github.io/js-fingertree/badge.svg)](https://aureooms.github.io/js-fingertree/source.html)


## API reference

The data structure is
[fully persistent](https://en.wikipedia.org/wiki/Persistent_data_structure#Fully_persistent):
All methods are pure functions that do not modify their object. 

The code needs a ES2015+ polyfill to work (`regeneratorRuntime`), for example
[babel-polyfill](https://babeljs.io/docs/usage/polyfill).
```js
import 'babel-polyfill' ;
```

### Definition of a `Tree`

    data Tree x = Empty
                | Single x
                | Deep ( Digit x ) ( Tree ( Node x ) ) ( Digit x )

### Definition of a `Measure`

    Measure = (
      plus = ( x , x ) -> m
      measure = x -> m
      zero = ( ) => m
    )

### Example of a `Measure`

The following measure will record the position of each element inside the tree
as if it was an `Array`:

```js
const counter = {
  plus : ( x , y ) => x + y ,
  measure : x => 1 ,
  zero : ( ) => 0 ,
} ;
```

### How to `import`

No surprises here:

```js
import { from , empty } from '@aureooms/js-fingertree' ;
```

### `from(Measure, Iterable) -> Tree`

Create a fingertree from a measure object and an iterable.

```js
let tree = from( counter , 'abc' ) ;
```

### `Tree#measure() -> m`

Returns the measure of the tree.

```js
if ( tree.measure() > 1 ) ...
```

### `Tree#empty() -> Boolean`

Returns `true` if the tree is empty, `false` otherwise.

```js
return tree.empty() ? 'empty' : 'not empty' ;
```

### `Tree#head() -> x`

Returns the left-most value in the tree.

```js
let head = tree.head() ; // 'a'
```

### `Tree#last() -> x`

Returns the right-most value in the tree.

```js
let last = tree.last() ; // 'b'
```

### `Tree#push(x) -> Tree`

Returns a new tree with an additional value as the new right-most value.

```js
tree = tree.cons('k');
```

### `Tree#cons(x) -> Tree`

Returns a new tree with an additional value as the new left-most value.

```js
tree = tree.cons('g');
```

### `Tree#init() -> Tree`

Returns a new tree without the right-most element.

```js
while ( ! tree.empty() ) tree = tree.init() ;
```

### `Tree#tail() -> Tree`

Returns a new tree without the left-most element.

```js
while ( ! tree.empty() ) tree = tree.tail() ;
```

### `Tree#append(Iterable) -> Tree`

Equivalent to applying `push` to each value of the iterable in order.

```js
tree.append( 'www' ) ;
```

### `Tree#prepend(Iterable) -> Tree`

Equivalent to applying `cons` to each value of the iterable in reverse order.

```js
tree.prepend( 'xyz' ) ;
```

### `Tree#concat(Tree) -> Tree`

Returns the concatenation of two trees.

```js
tree = tree.concat( tree );
```

### `Tree[Symbol.iterator]() -> Iterable`

Returns an iterator on the values of the tree in left-to-right order.

```js
for ( const x of tree ) console.log( x ) ;
```

### `Tree#splitTree(Function, m) -> [ Tree , x , Tree ]`

Split the tree into a left tree, a middle value, and a right tree according to
a predicate on the measure of the tree __increased by a constant `c`__. The
predicate must be monotone, false then true, on prefixes of the values in
left-to-right order. The middle value `x` is the item for which the predicate
switches from false to true.

```js
let [ left , right ] = tree.split( measure => measure > 1 , 1 ) ;
```

### `Tree#split(Function) -> [ Tree , Tree ]`

Split the tree into a left tree and a right tree according to a predicate on
the measure of the tree. The predicate must be monotone, false then true, on
prefixes of the values in left-to-right order. The left-most value of the right
tree is the item for which the predicate switches from false to true.

```js
let [ left , right ] = tree.split( measure => measure > 2 ) ;
```

### `Tree#takeUntil(Function) -> Tree`

Returns the left tree of `Tree#split`.

```js
let left = tree.takeUntil( measure => measure > 2 ) ;
```

### `Tree#dropUntil(Function) -> Tree`

Returns the right tree of `Tree#split`.

```js
let right = tree.dropUntil( measure => measure > 2 ) ;
```

## References

  - [Hinze and Paterson](http://staff.city.ac.uk/~ross/papers/FingerTree.pdf)
  - [An (incomplete) implementation in Python](https://github.com/kachayev/fn.py/blob/master/fn/immutable/finger.py)
  - [A (buggy) previous JavaScript implementation](https://github.com/qiao/fingertree.js)
  - [A coffeescript implementation](https://github.com/zot/Leisure/blob/master/src/lib/fingertree.coffee)

:cactus: [@aureooms/js-fingertree](https://aureooms.github.io/js-fingertree)
==

<p align="center">
<img src="https://cdn.rawgit.com/aureooms/js-fingertree/main/media/sketch.svg" width="400">
</p>

Finger trees for JavaScript.
See [docs](https://aureooms.github.io/js-fingertree).
Parent is [@aureooms/js-persistent](https://github.com/aureooms/js-persistent).

    data FingerTree x = Empty
                      | Single x
                      | Deep ( Digit x ) ( FingerTree ( Node x ) ) ( Digit x )

[![License](https://img.shields.io/github/license/aureooms/js-fingertree.svg)](https://raw.githubusercontent.com/aureooms/js-fingertree/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@aureooms/js-fingertree.svg)](https://www.npmjs.org/package/@aureooms/js-fingertree)
[![Build](https://img.shields.io/travis/aureooms/js-fingertree/main.svg)](https://travis-ci.org/aureooms/js-fingertree/branches)
[![Dependencies](https://img.shields.io/david/aureooms/js-fingertree.svg)](https://david-dm.org/aureooms/js-fingertree)
[![Dev dependencies](https://img.shields.io/david/dev/aureooms/js-fingertree.svg)](https://david-dm.org/aureooms/js-fingertree?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-fingertree.svg)](https://github.com/aureooms/js-fingertree/issues)
[![Downloads](https://img.shields.io/npm/dm/@aureooms/js-fingertree.svg)](https://www.npmjs.org/package/@aureooms/js-fingertree)

[![Code issues](https://img.shields.io/codeclimate/issues/aureooms/js-fingertree.svg)](https://codeclimate.com/github/aureooms/js-fingertree/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/aureooms/js-fingertree.svg)](https://codeclimate.com/github/aureooms/js-fingertree/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/aureooms/js-fingertree/main.svg)](https://codecov.io/gh/aureooms/js-fingertree)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/aureooms/js-fingertree.svg)](https://codeclimate.com/github/aureooms/js-fingertree/trends/technical_debt)
[![Documentation](https://aureooms.github.io/js-fingertree/badge.svg)](https://aureooms.github.io/js-fingertree/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@aureooms/js-fingertree)](https://bundlephobia.com/result?p=@aureooms/js-fingertree)


<!-- vim-markdown-toc GFM -->

* [:woman_teacher: API reference](#woman_teacher-api-reference)
  * [:cactus: Definition of a `Tree`](#cactus-definition-of-a-tree)
  * [:straight_ruler: Definition of a `Measure`](#straight_ruler-definition-of-a-measure)
    * [Example of a `Measure`](#example-of-a-measure)
  * [:package: How to `import`](#package-how-to-import)
  * [:baby: How to create a `Tree`](#baby-how-to-create-a-tree)
    * [`empty(Measure) -> Tree`](#emptymeasure---tree)
    * [`from(Measure, Iterable) -> Tree`](#frommeasure-iterable---tree)
  * [:question: Predicates](#question-predicates)
    * [`Tree#measure() -> m`](#treemeasure---m)
    * [`Tree#empty() -> Boolean`](#treeempty---boolean)
  * [:salt: Add values](#salt-add-values)
    * [`Tree#push(x) -> Tree`](#treepushx---tree)
    * [`Tree#cons(x) -> Tree`](#treeconsx---tree)
    * [`Tree#append(Iterable) -> Tree`](#treeappenditerable---tree)
    * [`Tree#prepend(Iterable) -> Tree`](#treeprependiterable---tree)
  * [:pizza: Slice](#pizza-slice)
    * [`Tree#head() -> x`](#treehead---x)
    * [`Tree#last() -> x`](#treelast---x)
    * [`Tree#init() -> Tree`](#treeinit---tree)
    * [`Tree#tail() -> Tree`](#treetail---tree)
  * [:last_quarter_moon: Merge](#last_quarter_moon-merge)
    * [`Tree#concat(Tree) -> Tree`](#treeconcattree---tree)
  * [:broken_heart: Split](#broken_heart-split)
    * [`Tree#splitTree(Function, m) -> [ Tree , x , Tree ]`](#treesplittreefunction-m----tree--x--tree-)
    * [`Tree#split(Function) -> [ Tree , Tree ]`](#treesplitfunction----tree--tree-)
    * [`Tree#takeUntil(Function) -> Tree`](#treetakeuntilfunction---tree)
    * [`Tree#dropUntil(Function) -> Tree`](#treedropuntilfunction---tree)
  * [:flying_saucer: Visit](#flying_saucer-visit)
    * [`TreeSymbol.iterator -> Iterable`](#treesymboliterator---iterable)
* [:scroll: References](#scroll-references)
* [:link: Links](#link-links)

<!-- vim-markdown-toc -->

## :woman_teacher: API reference

The data structure is
[fully persistent](https://en.wikipedia.org/wiki/Persistent_data_structure#Fully_persistent):
All methods are pure functions that do not modify their object. 

> The [parent project](https://github.com/aureooms/js-persistent) shows how
> specialized persistent data structures can be build on top of those methods.


### :cactus: Definition of a `Tree`

    data Tree x = Empty
                | Single x
                | Deep ( Digit x ) ( Tree ( Node x ) ) ( Digit x )


### :straight_ruler: Definition of a `Measure`

    Measure = (
      plus = ( x , x ) -> m
      measure = x -> m
      zero = ( ) => m
    )

#### Example of a `Measure`

The following measure will compute the size of each subtree.

```js
const counter = {
  plus : ( x , y ) => x + y ,
  measure : x => 1 ,
  zero : ( ) => 0 ,
} ;
```

See also
[@aureooms/js-measure](https://aureooms.github.io/js-measure/file/src/1-api/1-Measures.js.html)
for more examples of measures and see
[@aureooms/js-persistent](https://github.com/aureooms/js-persistent)
for examples of data structures that can be build on top of this abstraction.


### :package: How to `import`

> :warning: The code requires `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

First, require the polyfill at the entry point of your application:
```js
require( 'regenerator-runtime/runtime' ) ;
// or
import 'regenerator-runtime/runtime.js' ;
```

Then require what you need from the exported object, for instance the two main
API functions `from` and `empty`:

```js
const { from , empty } = require( '@aureooms/js-fingertree' ) ;
// or
import { from , empty } from '@aureooms/js-fingertree' ;
```


### :baby: How to create a `Tree`

#### `empty(Measure) -> Tree`

Create an empty tree from [a measure object](#example-of-a-measure).

```js
let tree = empty( counter ) ;
```

#### `from(Measure, Iterable) -> Tree`

Create a tree from a measure object and an iterable.

```js
let tree = from( counter , 'abc' ) ;
```


### :question: Predicates

#### `Tree#measure() -> m`

Returns the measure of the tree.

```js
if ( tree.measure() > 1 ) ...
```

#### `Tree#empty() -> Boolean`

Returns `true` if the tree is empty, `false` otherwise.

```js
return tree.empty() ? 'empty' : 'not empty' ;
```


### :salt: Add values

#### `Tree#push(x) -> Tree`

Returns a new tree with an additional value as the new right-most value.

```js
tree = tree.push('k');
```

#### `Tree#cons(x) -> Tree`

Returns a new tree with an additional value as the new left-most value.

```js
tree = tree.cons('g');
```

#### `Tree#append(Iterable) -> Tree`

Equivalent to applying `push` to each value of the iterable in order.

```js
tree.append( 'www' ) ;
```

#### `Tree#prepend(Iterable) -> Tree`

Equivalent to applying `cons` to each value of the iterable in reverse order.

```js
tree.prepend( 'xyz' ) ;
```


### :pizza: Slice

#### `Tree#head() -> x`

Returns the left-most value in the tree.

```js
let head = tree.head() ; // 'a'
```

#### `Tree#last() -> x`

Returns the right-most value in the tree.

```js
let last = tree.last() ; // 'b'
```

#### `Tree#init() -> Tree`

Returns a new tree without the right-most value.

```js
while ( ! tree.empty() ) tree = tree.init() ;
```

#### `Tree#tail() -> Tree`

Returns a new tree without the left-most value.

```js
while ( ! tree.empty() ) tree = tree.tail() ;
```


### :last_quarter_moon: Merge

#### `Tree#concat(Tree) -> Tree`

Returns the concatenation of two trees.

```js
tree = tree.concat( tree );
```


### :broken_heart: Split

The following methods allow you to efficiently split a tree at the value
where the measure crosses a given threshold.

#### `Tree#splitTree(Function, m) -> [ Tree , x , Tree ]`

Split the tree into a left tree, a middle value, and a right tree according to
a predicate on the measure of the tree __increased by a constant measure `m`__.
The predicate must be monotone, false then true, on prefixes of the values in
left-to-right order. The middle value `x` is the value for which the predicate
switches from false to true.

```js
let [ left , middle , right ] = tree.splitTree( measure => measure > 1 , 1 ) ;
```

#### `Tree#split(Function) -> [ Tree , Tree ]`

Split the tree into a left tree and a right tree according to a predicate on
the measure of the tree. The predicate must be monotone, false then true, on
prefixes of the values in left-to-right order. The left-most value of the right
tree is the value for which the predicate switches from false to true.

```js
let [ left , right ] = tree.split( measure => measure > 2 ) ;
```

#### `Tree#takeUntil(Function) -> Tree`

Returns the left tree of `Tree#split`.

```js
let left = tree.takeUntil( measure => measure > 2 ) ;
```

#### `Tree#dropUntil(Function) -> Tree`

Returns the right tree of `Tree#split`.

```js
let right = tree.dropUntil( measure => measure > 2 ) ;
```


### :flying_saucer: Visit

#### `Tree[Symbol.iterator]() -> Iterable`

Returns an iterator on the values of the tree in left-to-right order.

```js
for ( const x of tree ) console.log( x ) ;
```


## :scroll: References

  - [*Finger trees: a simple general-purpose data structure* -- Hinze and Paterson](http://staff.city.ac.uk/~ross/papers/FingerTree.pdf)

## :link: Links

  - [A coffeescript implementation with ZLIB licensing](https://github.com/zot/Leisure/blob/master/src/lib/fingertree.coffee) (:white_check_mark: the implementation appears to be correct)
  - [An implementation in Python](https://github.com/kachayev/fn.py/blob/master/fn/immutable/finger.py) (:warning: the implementation is missing [splitting functionality](#broken_heart-split))
  - [A JavaScript implementation with MIT licensing](https://github.com/qiao/fingertree.js) (:rotating_light: [the implementation is incorrect](https://github.com/qiao/fingertree.js/issues/7))

[js-fingertree](http://aureooms.github.io/js-fingertree)
==

Finger trees code bricks for JavaScript. Parent is [aureooms/js-persistent](https://github.com/aureooms/js-persistent).

```js
data FingerTree a = Empty
                  | Single a
                  | Deep ( Digit a ) ( FingerTree ( Node a ) ) ( Digit a )
```

[![NPM license](http://img.shields.io/npm/l/aureooms-js-fingertree.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-fingertree/master/LICENSE)
[![NPM version](http://img.shields.io/npm/v/aureooms-js-fingertree.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-fingertree)
[![Bower version](http://img.shields.io/bower/v/aureooms-js-fingertree.svg?style=flat)](http://bower.io/search/?q=aureooms-js-fingertree)
[![Build Status](http://img.shields.io/travis/aureooms/js-fingertree.svg?style=flat)](https://travis-ci.org/aureooms/js-fingertree)
[![Coverage Status](http://img.shields.io/coveralls/aureooms/js-fingertree.svg?style=flat)](https://coveralls.io/r/aureooms/js-fingertree)
[![Dependencies Status](http://img.shields.io/david/aureooms/js-fingertree.svg?style=flat)](https://david-dm.org/aureooms/js-fingertree#info=dependencies)
[![devDependencies Status](http://img.shields.io/david/dev/aureooms/js-fingertree.svg?style=flat)](https://david-dm.org/aureooms/js-fingertree#info=devDependencies)
[![Code Climate](http://img.shields.io/codeclimate/github/aureooms/js-fingertree.svg?style=flat)](https://codeclimate.com/github/aureooms/js-fingertree)
[![NPM downloads per month](http://img.shields.io/npm/dm/aureooms-js-fingertree.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-fingertree)
[![GitHub issues](http://img.shields.io/github/issues/aureooms/js-fingertree.svg?style=flat)](https://github.com/aureooms/js-fingertree/issues)
[![Inline docs](http://inch-ci.org/github/aureooms/js-fingertree.svg?branch=master&style=shields)](http://inch-ci.org/github/aureooms/js-fingertree)

Can be managed through [jspm](https://github.com/jspm/jspm-cli),
[duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower),
[ender](https://github.com/ender-js/Ender),
[jam](https://github.com/caolan/jam),
[spm](https://github.com/spmjs/spm),
and [npm](https://github.com/npm/npm).

## Install

### jspm
```terminal
jspm install github:aureooms/js-fingertree
# or
jspm install npm:aureooms-js-fingertree
```
### duo
No install step needed for duo!

### component
```terminal
component install aureooms/js-fingertree
```

### bower
```terminal
bower install aureooms-js-fingertree
```

### ender
```terminal
ender add aureooms-js-fingertree
```

### jam
```terminal
jam install aureooms-js-fingertree
```

### spm
```terminal
spm install aureooms-js-fingertree --save
```

### npm
```terminal
npm install aureooms-js-fingertree --save
```

## Require
### jspm
```js
let fingertree = require( "github:aureooms/js-fingertree" ) ;
// or
import fingertree from 'aureooms-js-fingertree' ;
```
### duo
```js
let fingertree = require( "aureooms/js-fingertree" ) ;
```

### component, ender, spm, npm
```js
let fingertree = require( "aureooms-js-fingertree" ) ;
```

### bower
The script tag exposes the global variable `fingertree`.
```html
<script src="bower_components/aureooms-js-fingertree/js/dist/fingertree.min.js"></script>
```
Alternatively, you can use any tool mentioned [here](http://bower.io/docs/tools/).

### jam
```js
require( [ "aureooms-js-fingertree" ] , function ( fingertree ) { ... } ) ;
```

## Use

```js
const { empty , from_iterable } = fingertree ;

const { Measure : { COUNTER : COUNTER } } = require( 'aureooms-js-measure' ) ;

let t = from_iterable( COUNTER , 'abc' ) ;
// OR
// let t = empty( COUNTER ).append( 'abc' )
[ ...t ] ; // abc
t.head( ) ; // 'a'
t.last( ) ; // 'c'
[ ...t.init( ) ] ; // ab
[ ...t.tail( ) ] ; // bc
[ ...t.concat( t ) ] ; // abcabc
const _1 , _2 = t.split( gt( 1 ) ) ;
[ ..._1 ] ; // a
[ ..._2 ] ; // bc
[ ...t.append( 'def' ) ] ; // abcdef
[ ...t.prepend( 'def' ) ] ; // defabc
```

## Optimization of the code step by step

I will copy here the output of a benchmark run on my computer after each
optimization change together with a small explanation.

_**Note**: I did not check if the real issues were caused by generators, bound functions,
V8 optimization inhibitors, or anything else..._

### When the benchmark was added
> d903efb8d9011a44a5ff732c569b2ae33aa5b8f1

What the benchmark code does is, in order:

  - build an empty tree `T`
  - add 100000 elements to the beginning of `T`
  - remove those 100000 elements by popping the first element of `T` 100000 times
  - add 100000 elements to the end of `T`
  - split `T` at all 100000 positions, one after the other
  - remove the 100000 elements of `T` by popping the last element 100000 times

Here are the first running times I measured for this implementation. It is not
difficult to see that the implementation is not fast at all. 100000 elements is
not that much right?

```sh
$ node benchmark/tree.js
number of operations:  100000
cons: 8584ms
tail: 6841ms
push: 8581ms
split: 144243ms
init: 6896ms
```

However most of the motivation for those optimization steps came from applying
the same benchmark to
[another JavaScript implementation](https://github.com/qiao/fingertree.js)
(actually, I copied the benchmark from Joe's repository). This made it obvious
that my implementation was performing badly.

```sh
$ node ../fingertree.js/benchmark/benchmark.js
number of operations:  100000
cons: 155ms
tail: 221ms
push: 134ms
split: 1889ms
init: 141ms
```

### First implementation of lazy evaluation of subtrees
> f0ca58169a32140a8617625466f15489a3549124

A Deep instance posseses a subtree which in some cases is not accessed at all
during the whole lifetime of its parent. So why build it? The idea is to delay
the construction of the object, which might be expensive, to a later point in
time using a proxy: a finger tree look-alike object that will construct the
real subtree if needed.

Time measurements after applying lazy evaluation concepts:
```sh
$ node benchmark/tree.js
number of operations:  100000
cons: 8585ms
tail: 6812ms
push: 8113ms
split: 139449ms
init: 6777ms
```

Unfortunately there is no big performance improvement here but as you'll see
there are some nastier things to change.

### Unwrap values
> 19c8ca9298c98eef7e3f257257cb4e01adfe0edb

Before this change, each value was first wrapped in a unique-value-node-like
structure defined as:

```js
class Measured {

	constructor ( element , v ) {
		this.element = element ;
		this.v = v ;
	}

	measure ( ) {
		return this.v ;
	}

}
```

where `v` is the value returned by `Measure.measure( element )`. This wrapping
allowed to give the same interface to elements, nodes, digits and trees with
respect to computing measures. This approach has at least 2 problems:

  - It introduces one additional level of indirection by wrapping all values.
  - The way it was implemented here caches measures for all elements. This might not
    be a good thing in settings where measures are big objects. Moreover, this
    is in contradiction with the *lazy way* of functional programming
	paradigms.

However, there is a simpler way to solve the *common interface* problem. Indeed,
the elements contained in the digits of the root tree can be measured
with the Measure object left unchanged, and starting from the subtree of the
root level we just need a modified Measure object that uses the interface of
Node2 and Node3 to compute the node measures. Never will digits contain objects
of different types, so patching the Measure object this way suffices, there is
no need to give the same interface to nodes and elements.

Here are the measurements after the change:

```sh
$ node benchmark/tree.js
number of operations:  100000
cons: 8452ms
tail: 6930ms
push: 7983ms
split: 141338ms
init: 6657ms
```

Mostly noise for the moment. There must be something else to fix...

### Removing iterator loops and bindings for fixed size sequences
> 28f6ee08d33e2cb2b9d0e5cae69948a7013bc0b7

At some point I decided to use a better tool than intuition to progress:
profiling. This change is the first where I guided the pruning by looking at
the output of `node --prof benchmark/tree.js` using `node-tick-processor`
from the [tick](https://www.npmjs.com/package/tick) package.

Before this change, digit measures where computed using the idiom

```js
reduce( M.plus.bind( M ) , map( M.measure.bind( M ) , digit ) , M.zero( ) ) ;
```

However, since all four digit types are hard-coded has classes One, Two, Three
and Four we could as well give a custom implementation of the measure( ) method
to each digit type. For type Two for example, we have:

```js
class Two {

	...

	measure ( M ) {
		return M.plus( M.measure( this.a ) , M.measure( this.b ) ) ;
	}

	...

}
```

Here are the times:

```sh
$ node benchmark/tree.js
number of operations:  100000
cons: 350ms
tail: 493ms
push: 398ms
split: 25851ms
init: 442ms
```

A drastic improvement right? However, there seems to be a problem with the
split method...

### Removing loops: part II
> 5b0af102240b3f0cfda7001f6b108a9811594c7a

It turns out I didn't remove all occurences of this generic digit measurement
method. Here are the running times after removing occurences of this method
from `Deep.splitTree`.

```js
$ node benchmark/tree.js
number of operations:  100000
cons: 370ms
tail: 473ms
push: 293ms
split: 7563ms
init: 396ms
```

Better.

### Specialized procedures for small loops: part II
> 88592b2562bea585c868e036a04dd1687e91211c
> 726354a3bd0591d767fb658d206680a6a74d2fbb

These two commits introduce specialized procedures for building trees from
small lists and digits. These are really small trees, i.e. 0 to 4 elements, so
why use the generic `from_iterable` constructor?

```js
$ node benchmark/tree.js
number of operations:  100000
cons: 315ms
tail: 435ms
push: 249ms
split: 4834ms
init: 408ms
```

Here again a big improvement on the split method.

### Dropping some of the es6 syntax
> 295011e3293b3dd2fe1edc80bdf1a14ca6d4dcca

This is a big one. I started writing this library with es6 syntax in mind.
However, looking at the profiler output you will see:

```sh
$ node-tick-processor isolate-0x2af4cf0-v8.log | grep '3:24'
    146    2.3%    2.4%  LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
    278  100.0%          LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
      6  100.0%            LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
    165  100.0%          LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
     97   99.0%        LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
    127   98.4%          LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
    163  100.0%          LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
    146    2.3%  LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
    138  100.0%          LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
     58  100.0%          LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
    129  100.0%      LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
      3    2.3%    LazyCompile: *get /home/aureooms/sandbox/js-fingertree/js/dist/fingertree.js:3:24
```

I didn't analyze much but it has to do with the way classes are handled by
babel.

Ok so I just threw the es6 classes and replaced them with plain old prototypes.
Hereunder are the new running times:

```sh
$ node benchmark/tree.js
number of operations:  100000
cons: 83ms
tail: 196ms
push: 64ms
split: 1177ms
init: 148ms
```

Great!

### To be continued...

## References

  - [Hinze and Paterson](http://staff.city.ac.uk/~ross/papers/FingerTree.pdf)
  - [An (incomplete) implementation in Python](https://github.com/kachayev/fn.py/blob/master/fn/immutable/finger.py)
  - [A previous JavaScript implementation](https://github.com/qiao/fingertree.js)
  - [A coffeescript implementation](https://github.com/zot/Leisure/blob/master/src/lib/fingertree.coffee)

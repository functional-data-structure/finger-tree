# Optimization of the code step by step

I will copy here the output of a benchmark run on my computer after each
optimization change together with a small explanation.

_**Note**: I did not check if the real issues were caused by generators, bound functions,
V8 optimization inhibitors, or anything else..._

## When the benchmark was added
> d903efb8d9011a44a5ff732c569b2ae33aa5b8f1

What the benchmark code does is, in order:

  - build an empty tree `T`
  - add 100000 values to the beginning of `T`
  - remove those 100000 values by popping the first value of `T` 100000 times
  - add 100000 values to the end of `T`
  - split `T` at all 100000 positions, one after the other
  - remove the 100000 values of `T` by popping the last value 100000 times

Here are the first running times I measured for this implementation. It is not
difficult to see that the implementation is not fast at all. 100000 values is
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

Most of the motivation for those optimization steps came from applying
the same benchmark to
[another JavaScript implementation](https://github.com/qiao/fingertree.js)
(actually, I initially copied the benchmark from Joe's repository).
This made it obvious that my implementation was performing badly.

```sh
$ node ../fingertree.js/benchmark/benchmark.js
number of operations:  100000
cons: 155ms
tail: 221ms
push: 134ms
split: 1889ms
init: 141ms
```

## First implementation of lazy evaluation of subtrees
> f0ca58169a32140a8617625466f15489a3549124

A Deep instance possesses a subtree which in some cases is not accessed at all
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

## Unwrap values
> 19c8ca9298c98eef7e3f257257cb4e01adfe0edb

Before this change, each value was first wrapped in a unique-value-node-like
structure defined as:

```js
class Measured {

	constructor ( value , v ) {
		this.value = value ;
		this.v = v ;
	}

	measure ( ) {
		return this.v ;
	}

}
```

where `v` is the measure returned by `Measure.measure( value )`. This wrapping
allowed to give the same interface to values, nodes, digits and trees with
respect to computing measures. This approach has at least 2 problems:

  - It introduces one additional level of indirection by wrapping all values.
  - The way it was implemented here caches measures for all values. This might not
    be a good thing in settings where measures are big objects. Moreover, this
    is in contradiction with the *lazy way* of functional programming paradigms.

However, there is a simpler way to solve the *common interface* problem. Indeed,
the values contained in the digits of the root tree can be measured
with the Measure object left unchanged, and starting from the subtree of the
root level we just need a modified Measure object that uses the interface of
Node2 and Node3 to compute the node measures. Never will digits contain objects
of different types, so patching the Measure object this way suffices, there is
no need to give the same interface to nodes and values.

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

## Removing iterator loops and bindings for fixed size sequences
> 28f6ee08d33e2cb2b9d0e5cae69948a7013bc0b7

At this point I decided to use a better tool than intuition to progress:
profiling. This change is the first where I guided the pruning by looking at
the output of `node --prof benchmark/tree.js` using `node --prof-process`.

Before this change, digit measures where computed using the idiom

```js
reduce( M.plus.bind( M ) , map( M.measure.bind( M ) , digit ) , M.zero( ) ) ;
```

However, since all four digit types are hard-coded has classes One, Two, Three
and Four we could as well give a custom implementation of the `measure( )` method
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

## Removing loops: part II
> 5b0af102240b3f0cfda7001f6b108a9811594c7a

It turns out I didn't remove all occurrences of this generic digit measurement
method. Here are the running times after removing occurrences of this method
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

## Specialized procedures for small loops: part II
> 88592b2562bea585c868e036a04dd1687e91211c
> 726354a3bd0591d767fb658d206680a6a74d2fbb

These two commits introduce specialized procedures for building trees from
small lists and digits. These are really small trees, i.e. 0 to 4 values, so
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

## Dropping some of the es6 syntax
> 295011e3293b3dd2fe1edc80bdf1a14ca6d4dcca

This is a big one. I started writing this library with es6 syntax in mind.
However, looking at the profiler output you will see:

```sh
$ node --prof-process (exa -snew isolate-*.log | tail -1) | grep '3:24'
    146    2.3%    2.4%  LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
    278  100.0%          LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
      6  100.0%            LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
    165  100.0%          LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
     97   99.0%        LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
    127   98.4%          LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
    163  100.0%          LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
    146    2.3%  LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
    138  100.0%          LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
     58  100.0%          LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
    129  100.0%      LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
      3    2.3%    LazyCompile: *get ~/sandbox/finger-tree/js/dist/fingertree.js:3:24
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

## To be continued...

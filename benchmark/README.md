# Benchmark

There are three different benchmarks. The main one is tree.js which benchmarks
finger trees operations. The two others are there for comparison.

## Finger trees benchmark (persistent data structure)

```sh
$ node benchmark/tree.js
number of operations:  100000
cons: 101ms
tail: 200ms
push: 76ms
split: 1281ms
init: 172ms
```

## Arrays benchmark (non-persistent)

```sh
$ node benchmark/array.js
number of operations:  100000
cons: 6994ms
tail: 34ms
push: 15ms
split: no time since you cannot splice an array more than once
init: 15ms
```

## Arrays benchmark using persistent operations (persistent)

It is clear that the copy operation is the most expensive (2 copies in split).

```sh
$ node benchmark/placebo.js
number of operations:  100000
cons: 27033ms
tail: 26686ms
push: 26821ms
split: 50553ms
init: 26891ms
```

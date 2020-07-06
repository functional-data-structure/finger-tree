# Benchmark

There are three different benchmarks. The main one is tree.js which benchmarks
finger trees operations. The two others are there for comparison.

> Run on a X1 Yoga 4th Gen. 
> CPU: Intel(R) Core(TM) i7-8665U CPU @ 1.90GHz.
> Memory: 2x 8192 MB 2133 MT/s LPDDR3 (Samsung)
> Linux: 5.7.6-arch1-1
> Node: v14.5.0

## Finger trees benchmark (persistent data structure)

```sh
$ node _benchmark/tree.js
number of operations: 100000
cons: 26.863ms
tail: 33.629ms
push: 18.745ms
init: 30.984ms
prepend: 30.342ms
append: 26.214ms
split: 398.124ms
concat: 57.936ms
total: 629ms
```

## Arrays benchmark (non-persistent)

```sh
$ node _benchmark/array.js
number of operations: 100000
cons: 833.49ms
tail: 864.188ms
push: 3.38ms
init: 1.897ms
split: no time since you cannot splice an array more than once
total: 1.703s
```

## Arrays benchmark using persistent operations (persistent)

It is clear that the copy operation is the most expensive (2 copies in split).

```sh
$ node _benchmark/placebo.js
number of operations: 100000
cons: 15.374s
tail: 15.541s
push: 17.310s
init: 18.797s
split: 42.298s
total: 1:49.325 (m:ss.mmm)
```

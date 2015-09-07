[js-fingertree](http://aureooms.github.io/js-fingertree)
==

Finger trees code bricks for JavaScript.

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

## References

  - [Hinze and Paterson](http://staff.city.ac.uk/~ross/papers/FingerTree.pdf)
  - [A previous JavaScript implementation](https://github.com/qiao/fingertree.js)
  - [A coffeescript implementation](https://github.com/zot/Leisure/blob/master/src/lib/fingertree.coffee)

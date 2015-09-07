
require( "../node_modules/aureooms-node-package/node_modules/babel-core/polyfill" ) ;
var FingerTree = require('..').FingerTree ;
var COUNTER = require( 'aureooms-js-measure' ).Measures.COUNTER ;

var t, i, len = 100000;

console.log('number of operations: ', len);

console.time('unshift');
t = FingerTree.from_iterable( COUNTER , []);
for (i = 0; i < len; ++i) {
  t = t.unshift(i);
}
console.timeEnd('unshift');

console.time('tail');
for (i = 0; i < len; ++i) {
  t = t.tail();
}
console.timeEnd('tail');

console.time('push');
t = FingerTree.from_iterable( COUNTER , []);
for (i = 0; i < len; ++i) {
  t = t.push(i);
}
console.timeEnd('push');

console.time('split');
for (i = 0; i < len; ++i) {
  t.split(function (m) {
    return m > i;
  });
}
console.timeEnd('split');

console.time('init');
for (i = 0; i < len; ++i) {
  t = t.init();
}
console.timeEnd('init');

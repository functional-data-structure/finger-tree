
require( "../node_modules/aureooms-node-package/node_modules/babel-core/polyfill" ) ;
var itertools = require( "../node_modules/aureooms-js-itertools" ) ;
var fingertree = require('..') ;
var empty = fingertree.empty ;
var from_iterable = fingertree.from_iterable ;
//var COUNTER = require( 'aureooms-js-measure' ).Measures.COUNTER ;
var COUNTER = {
	plus : function ( a , b ) { return a + b ; } ,
	measure : function ( x ) { return 1 ; } ,
	zero : function ( ) { return 0 ; } ,
} ;

var t, i, len = 100000;

var start = +new Date();

console.log('number of operations:', len);

console.time('total');
console.time('cons');
t = from_iterable( COUNTER , []);
for (i = 0; i < len; ++i) {
  t = t.cons(i);
}
console.timeEnd('cons');

console.time('tail');
for (i = 0; i < len; ++i) {
  t = t.tail();
}
console.timeEnd('tail');

console.time('push');
t = from_iterable( COUNTER , []);
for (i = 0; i < len; ++i) {
  t = t.push(i);
}
console.timeEnd('push');

console.time('init');
for (i = 0; i < len; ++i) {
  t = t.init();
}
console.timeEnd('init');

console.time('prepend');
t = empty( COUNTER ).prepend( itertools.range( len ) ) ;
console.timeEnd('prepend');
console.time('append');
t = empty( COUNTER ).append( itertools.range( len ) ) ;
console.timeEnd('append');

console.time('split');
for (i = 0; i < len; ++i) {
  t.split( function ( m ) { return m > i ; } ) ;
}
console.timeEnd('split');

var time = +new Date()-start;

var splits = [ ] ;
for (i = 0; i < len; ++i) {
  splits.push( t.split( function ( m ) { return m > i ; } ) ) ;
}

start = +new Date()-time;

console.time('concat');
for (i = 0; i < len; ++i) {
  t = splits[i][0].concat( splits[i][1] ) ;
}
console.timeEnd('concat');

splits.splice( 0 ) ;
console.log('total:', (+new Date()-start)+'ms' );

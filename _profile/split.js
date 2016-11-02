console.time('prepare');
require( 'babel-polyfill' ) ;
var ArgumentParser = require( 'argparse' ).ArgumentParser ;
var itertools = require( 'aureooms-js-itertools' ) ;
var empty = require('..').empty ;
var COUNTER = {
	plus : function ( a , b ) { return a + b ; } ,
	measure : function ( x ) { return 1 ; } ,
	zero : function ( ) { return 0 ; } ,
} ;

var parser = new ArgumentParser( ) ;
parser.addArgument( [ 'M' ] , { defaultValue : 1000 , nargs : '?' } ) ;
parser.addArgument( [ '-N' ] , { defaultValue : 1000 } ) ;
var args = parser.parseArgs( ) ;
var M = args.M ;
var N = args.N ;

console.log( 'number of operations:' , M * N ) ;

var t = empty( COUNTER ).append( itertools.range( M ) ) ;
console.timeEnd('prepare');

console.time('split');
for ( var k = 0 ; k < N ; ++k )
for ( var i = 0 ; i < M ; ++i )
t.split( function ( m ) { return m > i ; } ) ;
console.timeEnd('split');

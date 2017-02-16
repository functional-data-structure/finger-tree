console.time('prepare');
require( 'babel-polyfill' ) ;
var ArgumentParser = require( 'argparse' ).ArgumentParser ;
var itertools = require( '@aureooms/js-itertools' ) ;
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

var t = empty( COUNTER ) ;
console.timeEnd('prepare');

console.time( 'push' ) ;
for ( var k = 0 ; k < N ; ++k ) {
	var x = t ;
	for ( var i = 0 ; i < M ; ++i ) x = x.push( ) ;
}
console.timeEnd( 'push' ) ;


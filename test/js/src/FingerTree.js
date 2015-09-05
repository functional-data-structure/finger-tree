
var itertools = require( "aureooms-js-itertools" ) ;

var list = itertools.list ;
var chain = itertools.chain ;
var range = itertools.range ;
var reversed = itertools.reversed ;

var FingerTree = fingertree.FingerTree ;

test( "FingerTree" , function ( assert ) {

var T = FingerTree( ) ;

var N = 10 ;

list( range( N ) ).forEach ( function ( value ) { T = T.push( value ) ; } ) ;
list( range( N ) ).forEach ( function ( value ) { T = T.unshift( value ) ; } ) ;

assert.deepEqual( list( T ) , list( chain( [ reversed( range( N ) ) , range( N ) ] ) ) ) ;

var U = FingerTree.from_iterable( undefined , range( N ) ) ;

list( range( N ) ).forEach ( function ( ) {
	U = U.push( T.head( ) ) ;
	T = T.tail( ) ;
} ) ;

assert.deepEqual( list( U ) , list( chain( [ range( N ) , reversed( range( N ) ) ] ) ) ) ;
assert.deepEqual( list( T ) , list( range( N ) ) ) ;

} ) ;

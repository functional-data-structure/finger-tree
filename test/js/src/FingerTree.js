
var measure = require( "aureooms-js-measure" ) ;
var itertools = require( "aureooms-js-itertools" ) ;

var list = itertools.list ;
var chain = itertools.chain ;
var range = itertools.range ;
var reversed = itertools.reversed ;

var COUNTER = measure.Measures.COUNTER ;

var FingerTree = fingertree.FingerTree ;

test( "FingerTree" , function ( assert ) {

var T = new FingerTree( COUNTER ) ;

var N = 10 ;

list( range( N ) ).forEach ( function ( value ) { T = T.push( value ) ; } ) ;
list( range( N ) ).forEach ( function ( value ) { T = T.unshift( value ) ; } ) ;

assert.deepEqual( list( T ) , list( chain( [ reversed( range( N ) ) , range( N ) ] ) ) ) ;

var U = FingerTree.from_iterable( COUNTER , range( N ) ) ;

list( range( N ) ).forEach ( function ( ) {
	U = U.push( T.head( ) ) ;
	T = T.tail( ) ;
} ) ;

assert.deepEqual( list( U ) , list( chain( [ range( N ) , reversed( range( N ) ) ] ) ) ) ;
assert.deepEqual( list( T ) , list( range( N ) ) ) ;

assert.deepEqual( list( U.concat( T ) ) , list( chain( [ range( N ) , reversed( range( N ) ) , range( N ) ] ) ) ) ;

assert.equal( U.measure( ) , 2*N ) ;
assert.equal( U.tail( ).measure( ) , 2*N-1 ) ;
assert.equal( U.init( ).measure( ) , 2*N-1 ) ;

var M = 100 ;

var V1 = FingerTree.from_iterable( COUNTER , [ 0 ] ) ;
var V2 = FingerTree.from_iterable( COUNTER , range( 1 , M - 50 ) ) ;
var V3 = FingerTree.from_iterable( COUNTER , range( M - 50 , M - 1 ) ) ;
var V4 = FingerTree.from_iterable( COUNTER , [ M - 1 ] ) ;
var EMPTY = FingerTree.from_iterable( COUNTER , [ ] ) ;

var V = EMPTY
.concat( V1 )
.concat( EMPTY )
.concat( V2 )
.concat( EMPTY )
.concat( V3 )
.concat( EMPTY )
.concat( V4 )
.concat( EMPTY ) ;

assert.ok( EMPTY.empty( ) ) ;
assert.ok( !V.empty( ) ) ;
assert.ok( V1.tail( ).empty( ) ) ;
assert.ok( V1.init( ).empty( ) ) ;
assert.ok( V4.tail( ).empty( ) ) ;
assert.ok( V4.init( ).empty( ) ) ;
assert.ok( EMPTY.tail( ).empty( ) ) ;
assert.ok( EMPTY.init( ).empty( ) ) ;
assert.equal( V.measure( ) , M ) ;
assert.equal( V.head( ) , 0 ) ;
assert.equal( V.last( ) , M - 1 ) ;
assert.deepEqual( list( V1.concat( V4 ).init( ) ) , [ 0 ] ) ;
assert.deepEqual( list( V1.concat( V4 ).tail( ) ) , [ M - 1 ] ) ;
assert.deepEqual( list( V1.concat( V4 ).concat( V1 ) ) , [ 0 , M - 1 , 0 ] ) ;

for ( var i = 0 ; i <= M ; ++i ) {

	assert.deepEqual( list( V ) , list( range( i , M ) ) ) ;
	V = V.tail( ) ;

}

// CORNER CASES

var W , Z ;

assert.deepEqual( FingerTree.from_iterable( COUNTER , "xabcde" ).head( ) , 'x' ) ;
assert.deepEqual( FingerTree.from_iterable( COUNTER , "abcdex" ).last( ) , 'x' ) ;
assert.deepEqual( list( FingerTree.from_iterable( COUNTER , "abcdex" ).init( ) ) , [ 'a' , 'b' , 'c' , 'd' , 'e' ] ) ;
assert.deepEqual( list( FingerTree.from_iterable( COUNTER , "xabcde" ).tail( ) ) , [ 'a' , 'b' , 'c' , 'd' , 'e' ] ) ;

Z = FingerTree.from_iterable( COUNTER , "ex" ).extendleft( "abcd" ) ;

assert.deepEqual( list( Z.init( ) ) , [ 'a' , 'b' , 'c' , 'd' , 'e' ] ) ;

W = FingerTree.from_iterable( COUNTER , "de" ).extendleft( "xabc" ) ;
assert.deepEqual( list( W.tail( ) ) , [ 'a' , 'b' , 'c' , 'd' , 'e' ] ) ;

assert.deepEqual( list( W.concat( Z ) ) , list( "xabcdeabcdex" ) ) ;

// MAKE NAIVE nodes(.) FAIL

var F = new FingerTree( COUNTER ) ;
var G = new FingerTree( COUNTER ) ;

F = F.extend( range( 4 + 16 ) ) ;
G = G.extendleft( range( 4 + 16 ) ) ;

assert.equal( F.concat( G ).measure( ) , 40 , "make naive nodes(.) fail" ) ;

} ) ;

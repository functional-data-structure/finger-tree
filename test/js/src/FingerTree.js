
var measure = require( "aureooms-js-measure" ) ;
var itertools = require( "aureooms-js-itertools" ) ;
var predicate = require( "aureooms-js-predicate" ) ;

var gt = predicate.gt ;

var map = itertools.map ;
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

assert.deepEqual( list( T ) , list( chain( [ reversed( range( N ) ) , range( N ) ] ) ) , "check T 9..00..9" ) ;

var U = FingerTree.from_iterable( COUNTER , range( N ) ) ;

list( range( N ) ).forEach ( function ( ) {
	U = U.push( T.head( ) ) ;
	T = T.tail( ) ;
} ) ;

assert.deepEqual( list( U ) , list( chain( [ range( N ) , reversed( range( N ) ) ] ) ) , "check U 0..99..0" ) ;
assert.deepEqual( list( T ) , list( range( N ) ) , "check T 0..9" ) ;

assert.deepEqual( list( U.concat( T ) ) , list( chain( [ range( N ) , reversed( range( N ) ) , range( N ) ] ) ) , "concat U T 0..99..00..9" ) ;

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

// SPLIT

F = FingerTree.from_iterable( COUNTER , "abcdefgh" ) ;

assert.deepEqual( list( map( list , F.split( gt( 0 ) ) ) ) , [ list( "" ) , list( "abcdefgh" ) ] , "split " + 0 ) ;
assert.deepEqual( list( map( list , F.split( gt( 1 ) ) ) ) , [ list( "a" ) , list( "bcdefgh" ) ] , "split " + 1 ) ;
assert.deepEqual( list( map( list , F.split( gt( 2 ) ) ) ) , [ list( "ab" ) , list( "cdefgh" ) ] , "split " + 2 ) ;
assert.deepEqual( list( map( list , F.split( gt( 3 ) ) ) ) , [ list( "abc" ) , list( "defgh" ) ] , "split " + 3 ) ;
assert.deepEqual( list( map( list , F.split( gt( 4 ) ) ) ) , [ list( "abcd" ) , list( "efgh" ) ] , "split " + 4 ) ;
assert.deepEqual( list( map( list , F.split( gt( 5 ) ) ) ) , [ list( "abcde" ) , list( "fgh" ) ] , "split " + 5 ) ;
assert.deepEqual( list( map( list , F.split( gt( 6 ) ) ) ) , [ list( "abcdef" ) , list( "gh" ) ] , "split " + 6 ) ;
assert.deepEqual( list( map( list , F.split( gt( 7 ) ) ) ) , [ list( "abcdefg" ) , list( "h" ) ] , "split " + 7 ) ;
assert.deepEqual( list( map( list , F.split( gt( 8 ) ) ) ) , [ list( "abcdefgh" ) , list( "" ) ] , "split " + 8 ) ;

var split = F.splitTree( gt( 4 ) , COUNTER.zero( ) ) ;

assert.deepEqual( [ list( split.left ) , split.middle , list( split.right ) ] , [ list( "abcd" ) , "e" , list( "fgh" ) ] , "splitTree" ) ;

var _N = 1000 ;
var __N = _N / 2 | 0 ;
var J = FingerTree.from_iterable( COUNTER , range( _N ) ) ;
assert.deepEqual( list( map( list , J.split( gt( __N ) ) ) ) , [ list( range( __N ) ) , list( range( __N , _N ) ) ] , "split 1000" ) ;

assert.deepEqual( list ( J.takeUntil( gt( __N ) ) )  , list( range( __N ) ) , "takeUntil 1000" ) ;
assert.deepEqual( list ( J.dropUntil( gt( __N ) ) )  , list( range( __N , _N ) ) , "dropUntil 1000" ) ;

assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "" ).split( gt( 0 ) ) ) ) , [ [ ] , [ ] ] , "split empty" ) ;
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "a" ).split( gt( 0 ) ) ) ) , [ [ ] , [ "a" ] ] , "split single 0" ) ;
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "a" ).split( gt( 1 ) ) ) ) , [ [ "a" ] , [ ] ] , "split single 1" ) ;

// provoke split of digit One
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "a" ).extend( "bcde" ).split( gt( 0 ) ) ) ) , [ list( "" ) , list( "abcde" ) ] , "One.splitDigit 0" ) ;
// provoke split of digit Two
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "b" ).extend( "cde" ).extendleft( "a" ).split( gt( 0 ) ) ) ) , [ list( "" ) , list( "abcde" ) ] , "Two.splitDigit 0" ) ;
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "b" ).extend( "cde" ).extendleft( "a" ).split( gt( 1 ) ) ) ) , [ list( "a" ) , list( "bcde" ) ] , "Two.splitDigit 1" ) ;
// provoke split of digit Three
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "c" ).extend( "de" ).extendleft( "ab" ).split( gt( 0 ) ) ) ) , [ list( "" ) , list( "abcde" ) ] , "Three.splitDigit 0" ) ;
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "c" ).extend( "de" ).extendleft( "ab" ).split( gt( 1 ) ) ) ) , [ list( "a" ) , list( "bcde" ) ] , "Three.splitDigit 1" ) ;
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "c" ).extend( "de" ).extendleft( "ab" ).split( gt( 2 ) ) ) ) , [ list( "ab" ) , list( "cde" ) ] , "Three.splitDigit 2" ) ;
// provoke split of digit Four
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "d" ).extend( "e" ).extendleft( "abc" ).split( gt( 0 ) ) ) ) , [ list( "" ) , list( "abcde" ) ] , "Four.splitDigit 0" ) ;
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "d" ).extend( "e" ).extendleft( "abc" ).split( gt( 1 ) ) ) ) , [ list( "a" ) , list( "bcde" ) ] , "Four.splitDigit 1" ) ;
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "d" ).extend( "e" ).extendleft( "abc" ).split( gt( 2 ) ) ) ) , [ list( "ab" ) , list( "cde" ) ] , "Four.splitDigit 2" ) ;
assert.deepEqual( list( map( list , FingerTree.from_iterable( COUNTER , "d" ).extend( "e" ).extendleft( "abc" ).split( gt( 3 ) ) ) ) , [ list( "abc" ) , list( "de" ) ] , "Four.splitDigit 3" ) ;


// provoke head / last on digits
assert.equal( FingerTree.from_iterable( COUNTER , "x" ).extendleft( "a" ).head( ) , "a" , "One.head" ) ;
assert.equal( FingerTree.from_iterable( COUNTER , "a" ).extend( "x" ).last( ) , "x" , "One.last" ) ;
assert.equal( FingerTree.from_iterable( COUNTER , "x" ).extendleft( "ab" ).head( ) , "a" , "Two.head" ) ;
assert.equal( FingerTree.from_iterable( COUNTER , "a" ).extend( "bx" ).last( ) , "x" , "Two.last" ) ;
assert.equal( FingerTree.from_iterable( COUNTER , "x" ).extendleft( "abc" ).head( ) , "a" , "Three.head" ) ;
assert.equal( FingerTree.from_iterable( COUNTER , "a" ).extend( "bcx" ).last( ) , "x" , "Three.last" ) ;
assert.equal( FingerTree.from_iterable( COUNTER , "x" ).extendleft( "abcd" ).head( ) , "a" , "Four.head" ) ;
assert.equal( FingerTree.from_iterable( COUNTER , "a" ).extend( "bcdx" ).last( ) , "x" , "Four.last" ) ;
} ) ;

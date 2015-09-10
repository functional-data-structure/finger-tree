
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

var empty = fingertree.empty ;
var from_iterable = fingertree.from_iterable ;

test( "FingerTree" , function ( assert ) {

var T = empty( COUNTER ) ;

var N = 10 ;

list( range( N ) ).forEach ( function ( value ) { T = T.push( value ) ; } ) ;
list( range( N ) ).forEach ( function ( value ) { T = T.cons( value ) ; } ) ;

assert.deepEqual( list( T ) , list( chain( [ reversed( range( N ) ) , range( N ) ] ) ) , "check T 9..00..9" ) ;

var U = from_iterable( COUNTER , range( N ) ) ;

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

var V1 = from_iterable( COUNTER , [ 0 ] ) ;
var V2 = from_iterable( COUNTER , range( 1 , M - 50 ) ) ;
var V3 = from_iterable( COUNTER , range( M - 50 , M - 1 ) ) ;
var V4 = from_iterable( COUNTER , [ M - 1 ] ) ;
var EMPTY = from_iterable( COUNTER , [ ] ) ;

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

assert.deepEqual( from_iterable( COUNTER , "xabcde" ).head( ) , 'x' ) ;
assert.deepEqual( from_iterable( COUNTER , "abcdex" ).last( ) , 'x' ) ;
assert.deepEqual( list( from_iterable( COUNTER , "abcdex" ).init( ) ) , [ 'a' , 'b' , 'c' , 'd' , 'e' ] ) ;
assert.deepEqual( list( from_iterable( COUNTER , "xabcde" ).tail( ) ) , [ 'a' , 'b' , 'c' , 'd' , 'e' ] ) ;

Z = from_iterable( COUNTER , "ex" ).prepend( "abcd" ) ;

assert.deepEqual( list( Z.init( ) ) , [ 'a' , 'b' , 'c' , 'd' , 'e' ] ) ;

W = from_iterable( COUNTER , "de" ).prepend( "xabc" ) ;
assert.deepEqual( list( W.tail( ) ) , [ 'a' , 'b' , 'c' , 'd' , 'e' ] ) ;

assert.deepEqual( list( W.concat( Z ) ) , list( "xabcdeabcdex" ) ) ;

// MAKE NAIVE nodes(.) FAIL

var F = empty( COUNTER ) ;
var G = empty( COUNTER ) ;

F = F.append( range( 4 + 16 ) ) ;
G = G.prepend( range( 4 + 16 ) ) ;

assert.equal( F.concat( G ).measure( ) , 40 , "make naive nodes(.) fail" ) ;

// SPLIT

F = from_iterable( COUNTER , "abcdefgh" ) ;

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
var J = from_iterable( COUNTER , range( _N ) ) ;
assert.deepEqual( list( map( list , J.split( gt( __N ) ) ) ) , [ list( range( __N ) ) , list( range( __N , _N ) ) ] , "split 1000" ) ;

assert.deepEqual( list ( J.takeUntil( gt( __N ) ) )  , list( range( __N ) ) , "takeUntil 1000" ) ;
assert.deepEqual( list ( J.dropUntil( gt( __N ) ) )  , list( range( __N , _N ) ) , "dropUntil 1000" ) ;

assert.deepEqual( list( map( list , from_iterable( COUNTER , "" ).split( gt( 0 ) ) ) ) , [ [ ] , [ ] ] , "split empty" ) ;
assert.deepEqual( list( map( list , from_iterable( COUNTER , "a" ).split( gt( 0 ) ) ) ) , [ [ ] , [ "a" ] ] , "split single 0" ) ;
assert.deepEqual( list( map( list , from_iterable( COUNTER , "a" ).split( gt( 1 ) ) ) ) , [ [ "a" ] , [ ] ] , "split single 1" ) ;

// provoke split of digit One
assert.deepEqual( list( map( list , from_iterable( COUNTER , "a" ).append( "bcde" ).split( gt( 0 ) ) ) ) , [ list( "" ) , list( "abcde" ) ] , "One.splitDigit 0" ) ;
// provoke split of digit Two
assert.deepEqual( list( map( list , from_iterable( COUNTER , "b" ).append( "cde" ).prepend( "a" ).split( gt( 0 ) ) ) ) , [ list( "" ) , list( "abcde" ) ] , "Two.splitDigit 0" ) ;
assert.deepEqual( list( map( list , from_iterable( COUNTER , "b" ).append( "cde" ).prepend( "a" ).split( gt( 1 ) ) ) ) , [ list( "a" ) , list( "bcde" ) ] , "Two.splitDigit 1" ) ;
// provoke split of digit Three
assert.deepEqual( list( map( list , from_iterable( COUNTER , "c" ).append( "de" ).prepend( "ab" ).split( gt( 0 ) ) ) ) , [ list( "" ) , list( "abcde" ) ] , "Three.splitDigit 0" ) ;
assert.deepEqual( list( map( list , from_iterable( COUNTER , "c" ).append( "de" ).prepend( "ab" ).split( gt( 1 ) ) ) ) , [ list( "a" ) , list( "bcde" ) ] , "Three.splitDigit 1" ) ;
assert.deepEqual( list( map( list , from_iterable( COUNTER , "c" ).append( "de" ).prepend( "ab" ).split( gt( 2 ) ) ) ) , [ list( "ab" ) , list( "cde" ) ] , "Three.splitDigit 2" ) ;
// provoke split of digit Four
assert.deepEqual( list( map( list , from_iterable( COUNTER , "d" ).append( "e" ).prepend( "abc" ).split( gt( 0 ) ) ) ) , [ list( "" ) , list( "abcde" ) ] , "Four.splitDigit 0" ) ;
assert.deepEqual( list( map( list , from_iterable( COUNTER , "d" ).append( "e" ).prepend( "abc" ).split( gt( 1 ) ) ) ) , [ list( "a" ) , list( "bcde" ) ] , "Four.splitDigit 1" ) ;
assert.deepEqual( list( map( list , from_iterable( COUNTER , "d" ).append( "e" ).prepend( "abc" ).split( gt( 2 ) ) ) ) , [ list( "ab" ) , list( "cde" ) ] , "Four.splitDigit 2" ) ;
assert.deepEqual( list( map( list , from_iterable( COUNTER , "d" ).append( "e" ).prepend( "abc" ).split( gt( 3 ) ) ) ) , [ list( "abc" ) , list( "de" ) ] , "Four.splitDigit 3" ) ;


// provoke head / last on digits
assert.equal( from_iterable( COUNTER , "x" ).prepend( "a" ).head( ) , "a" , "One.head" ) ;
assert.equal( from_iterable( COUNTER , "a" ).append( "x" ).last( ) , "x" , "One.last" ) ;
assert.equal( from_iterable( COUNTER , "x" ).prepend( "ab" ).head( ) , "a" , "Two.head" ) ;
assert.equal( from_iterable( COUNTER , "a" ).append( "bx" ).last( ) , "x" , "Two.last" ) ;
assert.equal( from_iterable( COUNTER , "x" ).prepend( "abc" ).head( ) , "a" , "Three.head" ) ;
assert.equal( from_iterable( COUNTER , "a" ).append( "bcx" ).last( ) , "x" , "Three.last" ) ;
assert.equal( from_iterable( COUNTER , "x" ).prepend( "abcd" ).head( ) , "a" , "Four.head" ) ;
assert.equal( from_iterable( COUNTER , "a" ).append( "bcdx" ).last( ) , "x" , "Four.last" ) ;

// provoke several corner cases
Z = from_iterable( COUNTER , range( 10000 ) ) ;

var x = Z.split( gt( 5000 ) ) ;

var Y = x[0].concat( x[1] ) ;

assert.deepEqual( list( Y ) , list( Z ) , "split then concat 10000 items" ) ;

// provoke _nodes optimisation

Y = empty( COUNTER ).cons( 0 ).push( 1 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 8 , 9 ] , "1+1" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 7 , 8 , 9 ] , "1+2" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ).cons( 6 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 6 , 7 , 8 , 9 ] , "1+3" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ).cons( 6 ).cons( 5 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 5 , 6 , 7 , 8 , 9 ] , "1+4" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 8 , 9 ] , "2+1" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 7 , 8 , 9 ] , "2+2" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ).cons( 6 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 6 , 7 , 8 , 9 ] , "2+3" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ).cons( 6 ).cons( 5 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 5 , 6 , 7 , 8 , 9 ] , "2+4" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ).push( 3 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 3 , 8 , 9 ] , "3+1" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ).push( 3 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 3 , 7 , 8 , 9 ] , "3+2" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ).push( 3 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ).cons( 6 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 3 , 6 , 7 , 8 , 9 ] , "3+3" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ).push( 3 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ).cons( 6 ).cons( 5 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 3 , 5 , 6 , 7 , 8 , 9 ] , "3+4" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ).push( 3 ).push( 4 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 3 , 4 , 8 , 9 ] , "4+1" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ).push( 3 ).push( 4 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 3 , 4 , 7 , 8 , 9 ] , "4+2" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ).push( 3 ).push( 4 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ).cons( 6 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 3 , 4 , 6 , 7 , 8 , 9 ] , "4+3" ) ;

Y = empty( COUNTER ).cons( 0 ).push( 1 ).push( 2 ).push( 3 ).push( 4 ) ;
Z = empty( COUNTER ).push( 9 ).cons( 8 ).cons( 7 ).cons( 6 ).cons( 5 ) ;
assert.deepEqual( list( Y.concat( Z ) ) , [ 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ] , "4+4" ) ;

// provoke app3 Deep + list + Single

Y = empty( COUNTER ).append( range( 12 ) ) ;
Z = empty( COUNTER ).prepend( range( 6 ) ) ;

assert.deepEqual( list( Y.concat( Z ) ) , list( chain( [ range( 12 ) , range( 6 ) ] ) ) , "D+l+S" ) ;
} ) ;

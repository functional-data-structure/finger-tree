/*
Finger tree implementation and application examples.
A finger tree is a purely functional data structure used in
efficiently implementing other functional data structures. A
finger tree gives amortized constant time access to the "fingers"
(leaves) of the tree, where data is stored, and the internal
nodes are labeled in some way as to provide the functionality of
the particular data structure being implemented.
More information on Wikipedia: http://goo.gl/ppH2nE
"Finger trees: a simple general-purpose data structure": http://goo.gl/jX4DeL
*/

/*
# data Node a = Node2 a a | Node3 a a a
# data Digit a = One a | Two a a | Three a a a | Four a a a a
# data FingerTree a = Empty
#                   | Single a
#                   | Deep (Digit a) (FingerTree (Node a)) (Digit a)
*/

//const One = function ( a ) {
//	this.a = a ;
//} ;
//
//const Two = function ( a , b ) {
//	this.a = a ;
//	this.b = b ;
//} ;
//
//const Three = function ( a , b , c ) {
//	this.a = a ;
//	this.b = b ;
//	this.c = c ;
//} ;
//
//const Four = function ( a , b , c , d ) {
//	this.a = a ;
//	this.b = b ;
//	this.c = c ;
//	this.d = d ;
//} ;
//
//const Node2 = function ( a , b ) {
//	this.a = a ;
//	this.b = b ;
//} ;
//
//Node2.prototype[Symbol.iterator] = function* ( ) {
//	yield this.a ;
//	yield this.b ;
//} ;

const Node3 = function ( a , b , c ) {
	this.a = a ;
	this.b = b ;
	this.c = c ;
} ;

Node3.prototype[Symbol.iterator] = function* ( ) {
	yield this.a ;
	yield this.b ;
	yield this.c ;
} ;

const FingerTree = function ( measure ) {
	return new Empty( measure ) ;
} ;

const Empty = function ( measure ) {
	this.measure = measure ;
} ;

Empty.prototype.empty = function ( ) { return true ; } ;
Empty.prototype.head =
Empty.prototype.last = function ( ) { return undefined ; } ;
Empty.prototype.tail =
Empty.prototype.init = function ( ) { return this ; } ;

Empty.prototype.push =
Empty.prototype.unshift = function ( value ) {
	return new Single( this.measure , value ) ;
} ;

Empty.prototype[Symbol.iterator] = function* ( ) { yield* [ ] ; } ;

const Single = function ( measure , element ) {
	this.measure = measure ;
	this.element = element ;
} ;

Single.prototype.empty = function ( ) { return false ; } ;
Single.prototype.head =
Single.prototype.last = function ( ) { return this.element ; } ;
Single.prototype.tail =
Single.prototype.init = function ( ) { return new Empty(this.measure) ; } ;

Single.prototype.unshift = function ( value ) {
	return new Deep( this.measure , [ value ] , new Empty(this.measure), [ this.element ] ) ;
} ;

Single.prototype.push = function ( value ) {
	return new Deep( this.measure , [ this.element ] , new Empty(this.measure) , [ value ] ) ;
} ;

Single.prototype[Symbol.iterator] = function* ( ) { yield this.element ; } ;

const Deep = function ( measure , left , middle , right ) {
	this.measure = measure ;
	this.left = left ;
	this.middle = middle ;
	this.right = right ;
} ;

Deep.prototype.empty = function ( ) { return false ; } ;
Deep.prototype.head = function ( ) { return this.left[0] ; } ;
Deep.prototype.last = function ( ) { return this.right[this.right.length-1] ; } ;

Deep.prototype.tail = function ( ) {

	if ( this.left.length === 1 ) {

		if ( this.middle.empty( ) ) {
			return FingerTree.from_iterable( this.measure , this.right ) ;
		}

		return new Deep( this.measure , [ ...this.middle.head( ) ] , this.middle.tail( ) , this.right ) ;

	}

	return new Deep( this.measure , this.left.slice( 1 ) , this.middle , this.right ) ;

} ;

Deep.prototype.init = function ( ) {

	if ( this.right.length === 1 ) {

		if ( this.middle.empty( ) ) {
			return FingerTree.from_iterable( this.measure , this.left ) ;
		}

		return new Deep(this.measure, this.left , this.middle.init( ) , [ ...this.middle.last( ) ] ) ;

	}

	return new Deep( this.measure , this.left , this.middle , this.right.slice( 0 , this.right.length - 1 ) ) ;

} ;

Deep.prototype.unshift = function ( value )  {

	if ( this.left.length === 4 ) {

		return new Deep(
			this.measure ,
			[ value , this.left[0] ] ,
			this.middle.unshift( new Node3( ...this.left.slice( 1 ) ) ) ,
			this.right
		) ;

	}

	return new Deep( this.measure , [ value ].concat( this.left ) , this.middle , this.right ) ;

} ;

Deep.prototype.push = function ( value ) {

	if ( this.right.length === 4 ) {

		return new Deep(
			this.measure ,
			this.left ,
			this.middle.push( new Node3(...this.right.slice( 0 , 3 ) ) ) ,
			[ this.right[3] , value ]
		) ;

	}

	return new Deep( this.measure , this.left , this.middle , this.right.concat( [ value ] ) ) ;

} ;

Deep.prototype[Symbol.iterator] = function* ( ) {

	yield* this.left ;
	for ( const m of this.middle ) yield* m ;
	yield* this.right ;

} ;

FingerTree.from_iterable = function ( measure , iterable ) {

	let tree = new Empty( measure ) ;

	for ( const value of iterable ) tree = tree.push( value ) ;

	return tree ;

} ;

exports.FingerTree = FingerTree ;

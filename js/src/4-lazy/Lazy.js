function Lazy ( thunk ) {
	this.tree = null ;
	this.thunk = thunk ;
}

Lazy.prototype = new Tree( ) ;

Lazy.prototype.force = function ( ) {
	if ( this.tree === null ) {
		this.tree = this.thunk( ) ;
		this.thunk = null ;
	}
	return this.tree ;
} ;

Lazy.prototype.empty = function ( ) {
	return this.force( ).empty( ) ;
} ;

Lazy.prototype.measure = function ( ) {
	return this.force( ).measure( ) ;
} ;

Lazy.prototype.head = function ( ) {
	return this.force( ).head( ) ;
} ;

Lazy.prototype.last = function ( ) {
	return this.force( ).last( ) ;
} ;

Lazy.prototype.cons = function ( value ) {
	return this.force( ).cons( value ) ;
} ;

Lazy.prototype.push = function ( value ) {
	return this.force( ).push( value ) ;
} ;

Lazy.prototype.tail = function ( ) {
	return this.force( ).tail( ) ;
} ;

Lazy.prototype.init = function ( ) {
	return this.force( ).init( ) ;
} ;

Lazy.prototype.splitTree = function ( p , i ) {
	return this.force( ).splitTree( p , i ) ;
} ;

Lazy.prototype.split = function ( p ) {
	return this.force( ).split( p ) ;
} ;

Lazy.prototype.concat = function ( other ) {
	return this.force( ).concat( other ) ;
} ;

Lazy.prototype[Symbol.iterator] = function ( ) {
	return this.force( )[Symbol.iterator]( ) ;
} ;

function Three ( a , b , c ) {
	this.a = a ;
	this.b = b ;
	this.c = c ;
	this.v = null ;
}

Three.prototype[Symbol.iterator] = function ( ) {
//Three.prototype[Symbol.iterator] = function* ( ) {
	//yield this.a ; yield this.b ; yield this.c ;
	//return [ this.a , this.b , this.c ][Symbol.iterator] ;
	return _h( _c( this.a , _c( this.b , _l( this.c ) ) ) ) ;
} ;

Three.prototype.measure = function ( M ) {
	if ( this.v === null ) this.v = M.plus(
		M.measure( this.a ) ,
		M.plus(
			M.measure( this.b ) ,
			M.measure( this.c )
		)
	) ;
	return this.v ;
} ;

Three.prototype.head = function ( ) {
	return this.a ;
} ;

Three.prototype.last = function ( ) {
	return this.c ;
} ;

Three.prototype.init = function ( ) {
	return new Two( this.a , this.b ) ;
} ;

Three.prototype.tail = function ( ) {
	return new Two( this.b , this.c ) ;
} ;

Three.prototype.push = function ( value ) {
	return new Four( this.a , this.b , this.c , value ) ;
} ;

Three.prototype.cons = function ( value ) {
	return new Four( value , this.a , this.b , this.c ) ;
} ;

Three.prototype.node = function ( M ) {
	return node3( M , this.a , this.b , this.c ) ;
} ;

/**
 * It is assumed that p(|this|) is true.
 */
Three.prototype.splitDigit = function ( p , i , M ) {
	i = M.plus( i , M.measure( this.a ) ) ;
	if ( p( i ) ) return new Split( [ ] , this.a , [ this.b , this.c ] ) ;
	i = M.plus( i , M.measure( this.b ) ) ;
	if ( p( i ) ) return new Split( [ this.a ] , this.b , [ this.c ] ) ;
	return new Split( [ this.a , this.b ] , this.c , [ ] ) ;
} ;

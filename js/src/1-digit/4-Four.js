function Four ( a , b , c , d ) {
	this.a = a ;
	this.b = b ;
	this.c = c ;
	this.d = d ;
}

Four.prototype[Symbol.iterator] = function* ( ) {
	yield this.a ;
	yield this.b ;
	yield this.c ;
	yield this.d ;
} ;

Four.prototype.measure = function ( M ) {
	return M.plus(
		M.measure( this.a ) ,
		M.plus(
			M.measure( this.b ) ,
			M.plus(
				M.measure( this.c ) ,
				M.measure( this.d )
			)
		)
	) ;
} ;

Four.prototype.head = function ( ) {
	return this.a ;
} ;

Four.prototype.last = function ( ) {
	return this.d ;
} ;

Four.prototype.init = function ( ) {
	return new Three( this.a , this.b , this.c ) ;
} ;

Four.prototype.tail = function ( ) {
	return new Three( this.b , this.c , this.d ) ;
} ;

Four.prototype.push = function ( value ) {
	throw new Error( "cannot push digit Four" ) ;
} ;

Four.prototype.cons = function ( value ) {
	throw new Error( "cannot cons digit Four" ) ;
} ;

Four.prototype.node = function ( M ) {
	throw new Error( "cannot convert Four to node" ) ;
} ;

/**
 * It is assumed that p(|this|) is true.
 */
Four.prototype.splitDigit = function ( p , i , M ) {
	i = M.plus( i , M.measure( this.a ) ) ;
	if ( p( i ) ) return new Split( [ ] , this.a , [ this.b , this.c , this.d ] ) ;
	i = M.plus( i , M.measure( this.b ) ) ;
	if ( p( i ) ) return new Split( [ this.a ] , this.b , [ this.c , this.d ] ) ;
	i = M.plus( i , M.measure( this.c ) ) ;
	if ( p( i ) ) return new Split( [ this.a , this.b ] , this.c , [ this.d ] ) ;
	return new Split( [ this.a , this.b , this.c ] , this.d , [ ] ) ;
} ;

function One ( a ) {
	this.a = a ;
}

One.prototype[Symbol.iterator] = function* ( ) {
	yield this.a ;
} ;

One.prototype.measure = function ( M ) {
	return M.measure( this.a ) ;
} ;

One.prototype.head = function ( ) {
	return this.a ;
} ;

One.prototype.last = function ( ) {
	return this.a ;
} ;

One.prototype.init = function ( ) {
	throw new Error( "cannot call init on digit One" ) ;
} ;

One.prototype.tail = function ( ) {
	throw new Error( "cannot call tail on digit One" ) ;
} ;

One.prototype.push = function ( value ) {
	return new Two( this.a , value ) ;
} ;

One.prototype.cons = function ( value ) {
	return new Two( value , this.a ) ;
} ;

One.prototype.node = function ( M ) {
	throw new Error( "cannot convert One to node" ) ;
} ;

/**
 * It is assumed that p(|this|) is true.
 */
One.prototype.splitDigit = function ( p , i , M ) {
	return new Split( [ ] , this.a , [ ] ) ;
} ;

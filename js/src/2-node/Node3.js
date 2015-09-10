function Node3 ( v , a , b , c ) {
	this.v = v ;
	this.a = a ;
	this.b = b ;
	this.c = c ;
}

Node3.prototype[Symbol.iterator] = function ( ) {
//Node3.prototype[Symbol.iterator] = function* ( ) {
	//yield this.a ; yield this.b ; yield this.c ;
	return _h( _c( this.a , _c( this.b , _l( this.c ) ) ) ) ;
} ;

Node3.prototype.measure = function ( ) {
	return this.v ;
} ;

Node3.prototype.digit = function ( ) {
	return new Three( this.a , this.b , this.c ) ;
} ;

Node3.prototype.head = function ( ) {
	throw new Error( "trying to call head of Node3" ) ;
} ;

Node3.prototype.last = function ( ) {
	throw new Error( "trying to call last of Node3" ) ;
} ;

Node3.prototype.init = function ( ) {
	throw new Error( "trying to call init of Node3" ) ;
} ;

Node3.prototype.tail = function ( ) {
	throw new Error( "trying to call tail of Node3" ) ;
} ;

Node3.prototype.push = function ( value ) {
	throw new Error( "trying to call push of Node3" ) ;
} ;

Node3.prototype.cons = function ( value ) {
	throw new Error( "trying to call cons of Node3" ) ;
} ;


function node3 ( M , a , b , c ) {

	return new Node3( M.plus( M.measure( a ) , M.plus( M.measure( b ) , M.measure( c ) ) ) , a , b , c ) ;

}

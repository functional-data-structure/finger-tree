
class Node3 {

	constructor ( v , a , b , c ) {
		this.v = v ;
		this.a = a ;
		this.b = b ;
		this.c = c ;
	}

	*[Symbol.iterator] ( ) {
		yield this.a ;
		yield this.b ;
		yield this.c ;
	}

	measure ( ) {
		return this.v ;
	}

	digit ( ) {
		return new Three( this.a , this.b , this.c ) ;
	}

	head ( ) {
		throw new Error( "trying to call head of Node3" ) ;
	}

	last ( ) {
		throw new Error( "trying to call last of Node3" ) ;
	}

	init ( ) {
		throw new Error( "trying to call init of Node3" ) ;
	}

	tail ( ) {
		throw new Error( "trying to call tail of Node3" ) ;
	}

	push ( value ) {
		throw new Error( "trying to call push of Node3" ) ;
	}

	cons ( value ) {
		throw new Error( "trying to call cons of Node3" ) ;
	}

}

function node3 ( M , a , b , c ) {

	return new Node3( M.plus( M.measure( a ) , M.plus( M.measure( b ) , M.measure( c ) ) ) , a , b , c ) ;

}

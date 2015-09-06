
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

	digit ( ) {
		return new Three( this.a , this.b , this.c ) ;
	}

	get length ( ) {
		throw new Error( "trying to call length of Node2" ) ;
	}

	head ( ) {
		throw new Error( "trying to call head of Node2" ) ;
	}

	last ( ) {
		throw new Error( "trying to call last of Node2" ) ;
	}

	init ( ) {
		throw new Error( "trying to call init of Node2" ) ;
	}

	tail ( ) {
		throw new Error( "trying to call tail of Node2" ) ;
	}

	push ( value ) {
		throw new Error( "trying to call push of Node2" ) ;
	}

	unshift ( value ) {
		throw new Error( "trying to call unshift of Node2" ) ;
	}

}

function node3 ( M , a , b , c ) {

	return new Node3( measure( M , [ a , b , c ] ) , a , b , c ) ;

}

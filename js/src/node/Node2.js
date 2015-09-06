
class Node2 {

	constructor ( v , a , b ) {
		this.v = v ;
		this.a = a ;
		this.b = b ;
	}

	*[Symbol.iterator] ( ) {
		yield this.a ;
		yield this.b ;
	}

	digit ( ) {
		return new Two( this.a , this.b ) ;
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

function node2 ( M , a , b ) {

	return new Node2( measure( M , [ a , b ] ) , a , b ) ;

}


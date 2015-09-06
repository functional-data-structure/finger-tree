class Two {

	constructor ( a , b ) {
		this.a = a ;
		this.b = b ;
	}

	*[Symbol.iterator] ( ) {
		yield this.a ;
		yield this.b ;
	}

	get length ( ) {
		return 2 ;
	}

	head ( ) {
		return this.a ;
	}

	last ( ) {
		return this.b ;
	}

	init ( ) {
		return new One( this.a ) ;
	}

	tail ( ) {
		return new One( this.b ) ;
	}

	push ( value ) {
		return new Three( this.a , this.b , value ) ;
	}

	unshift ( value ) {
		return new Three( value , this.a , this.b ) ;
	}

	node ( measure ) {
		return node2( measure , this.a , this.b ) ;
	}

}

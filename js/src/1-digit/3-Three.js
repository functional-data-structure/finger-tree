class Three {

	constructor ( a , b , c ) {
		this.a = a ;
		this.b = b ;
		this.c = c ;
	}

	*[Symbol.iterator] ( ) {
		yield this.a ;
		yield this.b ;
		yield this.c ;
	}

	get length ( ) {
		return 3 ;
	}

	head ( ) {
		return this.a ;
	}

	last ( ) {
		return this.c ;
	}

	init ( ) {
		return new Two( this.a , this.b ) ;
	}

	tail ( ) {
		return new Two( this.b , this.c ) ;
	}

	push ( value ) {
		return new Four( this.a , this.b , this.c , value ) ;
	}

	unshift ( value ) {
		return new Four( value , this.a , this.b , this.c ) ;
	}

	node ( M ) {
		return node3( M , this.a , this.b , this.c ) ;
	}

	/**
	 * It is assumed that p(|this|) is true.
	 */
	splitDigit ( p , i , M ) {
		i = M.plus( i , M.measure( this.a ) ) ;
		if ( p( i ) ) return new Split( [ ] , this.a , [ this.b , this.c ] ) ;
		i = M.plus( i , M.measure( this.b ) ) ;
		if ( p( i ) ) return new Split( [ this.a ] , this.b , [ this.c ] ) ;
		return new Split( [ this.a , this.b ] , this.c , [ ] ) ;
	}

}

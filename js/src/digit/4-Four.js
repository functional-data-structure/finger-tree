class Four {

	constructor ( a , b , c , d ) {
		this.a = a ;
		this.b = b ;
		this.c = c ;
		this.d = d ;
	}

	*[Symbol.iterator] ( ) {
		yield this.a ;
		yield this.b ;
		yield this.c ;
		yield this.d ;
	}

	get length ( ) {
		return 4 ;
	}

	head ( ) {
		return this.a ;
	}

	last ( ) {
		return this.d ;
	}

	init ( ) {
		return new Three( this.a , this.b , this.c ) ;
	}

	tail ( ) {
		return new Three( this.b , this.c , this.d ) ;
	}

	push ( value ) {
		throw new Error( "cannot push digit Four" ) ;
	}

	unshift ( value ) {
		throw new Error( "cannot unshift digit Four" ) ;
	}

	node ( measure ) {
		throw new Error( "cannot convert Four to node" ) ;
	}

	/**
	 * It is assumed that p(|this|) is true.
	 */
	splitDigit ( p , i , M ) {
		i = M.plus( i , this.a.v ) ;
		if ( p( i ) ) return new Split( [ ] , this.a , [ this.b , this.c , this.d ] ) ;
		i = M.plus( i , this.b.v ) ;
		if ( p( i ) ) return new Split( [ this.a ] , this.b , [ this.c , this.d ] ) ;
		i = M.plus( i , this.c.v ) ;
		if ( p( i ) ) return new Split( [ this.a , this.b ] , this.c , [ this.d ] ) ;
		return new Split( [ this.a , this.b , this.c ] , this.d , [ ] ) ;
	}

}

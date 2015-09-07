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
		throw new Error( "Two should never be converted to Node2 with current implementation" ) ;
	}

	/**
	 * It is assumed that p(|this|) is true.
	 */
	splitDigit ( p , i , M ) {
		i = M.plus( i , this.a.v ) ;
		if ( p( i ) ) return new Split( [ ] , this.a , [ this.b ] ) ;
		return new Split( [ this.a ] , this.b , [ ] ) ;
	}

}

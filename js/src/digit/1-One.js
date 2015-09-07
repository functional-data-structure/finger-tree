class One {

	constructor ( a ) {
		this.a = a ;
	}

	*[Symbol.iterator] ( ) {
		yield this.a ;
	}

	get length ( ) {
		return 1 ;
	}

	head ( ) {
		return this.a ;
	}

	last ( ) {
		return this.a ;
	}

	init ( ) {
		throw new Error( "cannot call init on digit One" ) ;
	}

	tail ( ) {
		throw new Error( "cannot call tail on digit One" ) ;
	}

	push ( value ) {
		return new Two( this.a , value ) ;
	}

	unshift ( value ) {
		return new Two( value , this.a ) ;
	}

	node ( measure ) {
		throw new Error( "cannot convert One to node" ) ;
	}

	/**
	 * It is assumed that p(|this|) is true.
	 */
	splitDigit ( p , i , M ) {
		return new Split( [ ] , this.a , [ ] ) ;
	}

}

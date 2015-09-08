class Empty extends Tree {

	constructor ( M ) {
		super( ) ;
		this.M = M ;
		this.v = M.zero( ) ;
	}

	measure ( ) {
		return this.v ;
	}

	empty ( ) {
		return true ;
	}

	head ( ) {
		throw new Error( "cannot call head on Empty" ) ;
	}

	last ( ) {
		throw new Error( "cannot call last on Empty" ) ;
	}

	tail ( ) {
		return this ;
	}

	init ( ) {
		return this ;
	}

	push ( value ) {
		return new Single( this.M , value ) ;
	}

	cons ( value ) {
		return new Single( this.M , value ) ;
	}

	concat ( other ) {
		return other ;
	}

	[Symbol.iterator] ( ) {
		return EMPTY ;
	}

	/**
	 * It is assumed that p(|this|) is true.
	 */
	splitTree ( p , i ) {
		throw new Error( "splitTree not implemented in Empty" ) ;
	}

	split ( p ) {
		return [ this , this ] ;
	}

}

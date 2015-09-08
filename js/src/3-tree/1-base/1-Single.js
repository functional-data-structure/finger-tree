class Single extends Tree {

	constructor ( M , element ) {
		super( ) ;
		this.M = M ;
		this.element = element ;
		this.v = M.measure( element ) ;
	}

	measure ( ) {
		return this.v ;
	}

	empty ( ) {
		return false ;
	}

	head ( ) {
		return this.element ;
	}

	last ( ) {
		return this.element ;
	}

	tail ( ) {
		return new Empty( this.M ) ;
	}

	init ( ) {
		return new Empty( this.M ) ;
	}

	cons ( value ) {
		return new Deep(
			this.M ,
			new One( value ) ,
			new Empty( cache( this.M ) ) ,
			new One( this.element )
		) ;
	}

	push ( value ) {
		return new Deep(
			this.M ,
			new One( this.element ) ,
			new Empty( cache( this.M ) ) ,
			new One( value )
		) ;
	}

	concat ( other ) {
		return other.cons( this.element ) ;
	}

	* [Symbol.iterator] ( ) {
		yield this.element ;
	}

	/**
	 * It is assumed that p(|this|) is true.
	 */
	splitTree ( p , i ) {
		return new Split( new Empty( this.M ) , this.element , new Empty( this.M ) ) ;
	}

	split ( p ) {
		return p( this.measure( ) ) ? [ new Empty( this.M ) , this ] : [ this , new Empty( this.M ) ] ;
	}

}

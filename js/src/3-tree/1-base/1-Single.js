class Single extends Tree {

	constructor ( measure , element ) {
		super( ) ;
		this.measure = measure ;
		this.element = element ;
		this.v = measure.measure( element ) ;
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
		return new Empty( this.measure ) ;
	}

	init ( ) {
		return new Empty( this.measure ) ;
	}

	unshift ( value ) {
		return new Deep(
			this.measure ,
			new One( value ) ,
			new Empty( this.measure ) ,
			new One( this.element )
		) ;
	}

	push ( value ) {
		return new Deep(
			this.measure ,
			new One( this.element ) ,
			new Empty( this.measure ) ,
			new One( value )
		) ;
	}

	concat ( other ) {
		return other.unshift( this.element ) ;
	}

	* [Symbol.iterator] ( ) {
		yield this.element ;
	}

	/**
	 * It is assumed that p(|this|) is true.
	 */
	splitTree ( p , i ) {
		return new Split( new Empty( this.measure ) , this.element , new Empty( this.measure ) ) ;
	}

	split ( p ) {
		return p( this.v ) ? [ new Empty( this.measure ) , this ] : [ this , new Empty( this.measure ) ] ;
	}

}

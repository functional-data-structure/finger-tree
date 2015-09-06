class Single {

	constructor ( measure , element ) {
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

}

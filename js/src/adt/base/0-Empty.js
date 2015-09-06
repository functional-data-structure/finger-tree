class Empty {

	constructor ( measure ) {
		this.measure = measure ;
		this.v = measure.zero( ) ;
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
		return new Single( this.measure , value ) ;
	}

	unshift ( value ) {
		return new Single( this.measure , value ) ;
	}

	concat ( other ) {
		return other ;
	}

	[Symbol.iterator] ( ) {
		return EMPTY ;
	}

}

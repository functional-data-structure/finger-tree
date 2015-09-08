class Lazy extends Tree {

	constructor ( thunk ) {
		super( ) ;
		this.tree = null ;
		this.thunk = thunk ;
	}

	force ( ) {
		if ( this.tree === null ) this.tree = this.thunk( ) ;
		return this.tree ;
	}

	empty ( ) {
		return this.force( ).empty( ) ;
	}

	measure ( ) {
		return this.force( ).measure( ) ;
	}

	head ( ) {
		return this.force( ).head( ) ;
	}

	last ( ) {
		return this.force( ).last( ) ;
	}

	cons ( value ) {
		return this.force( ).cons( value ) ;
	}

	push ( value ) {
		return this.force( ).push( value ) ;
	}

	tail ( ) {
		return this.force( ).tail( ) ;
	}

	init ( ) {
		return this.force( ).init( ) ;
	}

	splitTree ( p , i ) {
		return this.force( ).splitTree( p , i ) ;
	}

	split ( p ) {
		return this.force( ).split( p ) ;
	}

	concat ( other ) {
		return this.force( ).concat( other ) ;
	}

	* [Symbol.iterator] ( ) {
		yield* this.force( ) ;
	}

}

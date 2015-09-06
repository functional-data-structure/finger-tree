class FingerTree {

	constructor ( measure , T = new Empty( cache( measure ) ) ) {
		this.M = measure ;
		this.T = T ;
	}

	measure ( ) {
		return this.T.v ;
	}

	empty ( ) {
		return this.T.empty( ) ;
	}

	head ( ) {
		return this.T.head( ).element ;
	}

	last ( ) {
		return this.T.last( ).element ;
	}

	tail ( ) {
		return new FingerTree( this.M , this.T.tail( ) ) ;
	}

	init ( ) {
		return new FingerTree( this.M , this.T.init( ) ) ;
	}

	push ( value ) {
		return new FingerTree( this.M , this.T.push( new Measured( this.M , value ) ) ) ;
	}

	unshift ( value ) {
		return new FingerTree( this.M , this.T.unshift( new Measured( this.M , value ) ) ) ;
	}

	concat ( other ) {
		return new FingerTree( this.M , this.T.concat( other.T ) ) ;
	}

	extend ( iterable ) {

		return reduce( push , iterable , this ) ;

	}

	extendleft ( iterable ) {

		return reduce( unshift , reversed( [ ...iterable ] ) , this ) ;

	}

	* [Symbol.iterator] ( ) {

		for ( const measured of this.T ) yield measured.element ;

	}

	static from_iterable ( measure , iterable ) {

		return new FingerTree( measure ).extend( iterable ) ;

	}

}

exports.FingerTree = FingerTree ;

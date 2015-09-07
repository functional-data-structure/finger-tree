class FingerTree extends Tree {

	constructor ( measure , T = new Empty( cache( measure ) ) ) {
		super( ) ;
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

	* [Symbol.iterator] ( ) {

		for ( const measured of this.T ) yield measured.element ;

	}

	splitTree ( p , i ) {

		const { left , middle , right } = this.T.splitTree( p , i ) ;

		return new Split( new FingerTree( this.M , left ) , middle.element , new FingerTree( this.M , right ) ) ;

	}

	split ( p ) {
		const [ left , right ] = this.T.split( p ) ;
		return [ new FingerTree( this.M , left ) , new FingerTree( this.M , right ) ] ;
	}

	static from_iterable ( measure , iterable ) {

		return new FingerTree( measure ).extend( iterable ) ;

	}

}

exports.FingerTree = FingerTree ;

class Deep {

	constructor ( M , left , middle , right ) {
		this.measure = M ;
		this.left = left ;
		this.middle = middle ;
		this.right = right ;
		this.v = M.plus(
			measure( M , this.left ) ,
			M.plus( this.middle.v , measure( M , this.right ) )
		) ;
	}

	empty ( ) {
		return false ;
	}

	head ( ) {
		return this.left.head( ) ;
	}

	last ( ) {
		return this.right.last( ) ;
	}

	tail ( ) {

		if ( this.left.length === 1 ) {

			if ( this.middle.empty( ) ) {
				return from_iterable( this.measure , this.right ) ;
			}

			return new Deep( this.measure , this.middle.head( ).digit( ) , this.middle.tail( ) , this.right ) ;

		}

		return new Deep( this.measure , this.left.tail( ) , this.middle , this.right ) ;

	}

	init ( ) {

		if ( this.right.length === 1 ) {

			if ( this.middle.empty( ) ) {
				return from_iterable( this.measure , this.left ) ;
			}

			return new Deep( this.measure , this.left , this.middle.init( ) , this.middle.last( ).digit( ) ) ;

		}

		return new Deep( this.measure , this.left , this.middle , this.right.init( ) ) ;

	}

	unshift ( value )  {

		if ( this.left.length === 4 ) {

			return new Deep(
				this.measure ,
				new Two( value , this.left.head( ) ) ,
				this.middle.unshift( this.left.tail( ).node( this.measure ) ) ,
				this.right
			) ;

		}

		return new Deep( this.measure , this.left.unshift( value ) , this.middle , this.right ) ;

	}

	push ( value ) {

		if ( this.right.length === 4 ) {

			return new Deep(
				this.measure ,
				this.left ,
				this.middle.push( this.right.init( ).node( this.measure ) ) ,
				new Two( this.right.last( ) , value )
			) ;

		}

		return new Deep( this.measure , this.left , this.middle , this.right.push( value ) ) ;

	}

	concat ( other ) {

		return app3( this , [ ] , other ) ;

	}

	*[Symbol.iterator] ( ) {

		yield* this.left ;
		for ( const node of this.middle ) yield* node ;
		yield* this.right ;

	}

}

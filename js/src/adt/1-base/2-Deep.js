class Deep extends Tree {

	constructor ( M , left , middle , right ) {
		super( ) ;
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

	/**
	 * It is assumed that p(|this|) is true.
	 */
	splitTree ( p , i ) {

		const { left , middle , right , measure : M } = this ;

		// see if the split point is inside the left tree
		const leftMeasure = M.plus( i , measure( M , left ) ) ;
		if ( p( leftMeasure ) ) {
			const split = left.splitDigit( p , i , M ) ;
			return new Split(
				from_iterable( M , split.left ) ,
				split.middle ,
				deepL( M , split.right , middle , right )
			) ;
		}

		// see if the split point is inside the middle tree
		const midMeasure = M.plus( leftMeasure , middle.v ) ;

		if ( p( midMeasure ) ) {
			const midSplit = middle.splitTree( p , leftMeasure ) ;
			// midsplit.middle is a Node since middle is a Tree ( Node a )
			const split = midSplit.middle.digit( ).splitDigit( p , M.plus( leftMeasure , midSplit.left.v ) , M ) ;
			return new Split(
				deepR( M , left , midSplit.left, split.left ) ,
				split.middle ,
				deepL( M , split.right , midSplit.right , right )
			) ;
		}

		// the split point is in the right tree
		const split = right.splitDigit( p , midMeasure , M ) ;
		return new Split(
			deepR( M , left , middle , split.left ) ,
			split.middle ,
			from_iterable( M , split.right )
		) ;
	}

	split ( p ) {

		if ( p( this.v ) ) {
			const split = this.splitTree( p , this.measure.zero( ) ) ;
			return [ split.left , split.right.unshift( split.middle ) ] ;
		}

		return [ this , new Empty( this.measure ) ] ;

	}

}

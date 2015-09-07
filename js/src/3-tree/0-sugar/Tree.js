
class Tree {

	force ( ) {
		return this ;
	}

	takeUntil ( p ) {
		return this.split( p )[0] ;
	}

	dropUntil ( p ) {
		return this.split( p )[1] ;
	}

	extend ( iterable ) {
		return reduce( push , iterable , this ) ;
	}

	extendleft ( iterable ) {
		return reduce( unshift , reversed( [ ...iterable ] ) , this ) ;
	}

}

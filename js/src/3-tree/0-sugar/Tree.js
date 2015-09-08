
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

	append ( iterable ) {
		return reduce( push , iterable , this ) ;
	}

	prepend ( iterable ) {
		return reduce( cons , reversed( [ ...iterable ] ) , this ) ;
	}

}

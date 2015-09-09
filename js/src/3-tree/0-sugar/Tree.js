
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
		return append( this , iterable ) ;
	}

	prepend ( iterable ) {
		return prepend( this , iterable ) ;
	}

}

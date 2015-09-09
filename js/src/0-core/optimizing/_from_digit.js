function _from_digit ( M , digit ) {

	if ( digit instanceof One ) return new Single( M , digit.a ) ;
	if ( digit instanceof Two || digit instanceof Three || digit instanceof Four ) {
		return new Deep( M , digit.init( ) , new Empty( M ) , new One( digit.last( ) ) ) ;
	}

	throw new Error( 'second argument is not a Digit' ) ;

}

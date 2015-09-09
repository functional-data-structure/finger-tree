function _from_small_list ( M , list ) {

	if ( list.length === 0 ) return new Empty( M ) ;

	return _from_digit( M , _digit( list ) ) ;

}

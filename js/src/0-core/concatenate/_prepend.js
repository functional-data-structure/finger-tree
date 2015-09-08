function _prepend ( tree , list ) {

	return reduce( cons , reversed( list ) , tree ) ;

}

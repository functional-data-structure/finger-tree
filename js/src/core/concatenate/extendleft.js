function extendleft ( tree , list ) {

	return reduce( unshift , reversed( list ) , tree ) ;

}

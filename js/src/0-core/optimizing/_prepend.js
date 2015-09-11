function _prepend ( tree , list ) {

	let i = list.length ;

	while ( i-- ) tree = tree.cons( list[i] ) ;

	return tree ;

}

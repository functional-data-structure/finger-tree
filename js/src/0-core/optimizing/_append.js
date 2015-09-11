function _append ( tree , list ) {

	const n = list.length ;

	for ( let i = 0 ; i < n ; ++i ) tree = tree.push( list[i] ) ;

	return tree ;

}

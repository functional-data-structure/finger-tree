
function measure ( M , list ) {

	return reduce( M.plus.bind( M ) , map( M.measure.bind( M ) , list ) , M.zero( ) ) ;

}

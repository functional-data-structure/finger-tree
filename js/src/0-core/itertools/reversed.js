function* reversed ( list ) {

	let i = list.length ;

	while ( i-- ) yield list[i] ;

}

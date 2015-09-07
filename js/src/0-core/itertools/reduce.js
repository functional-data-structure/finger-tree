function reduce ( callable , iterable , initial ) {

	let accumulator = initial ;

	for ( const value of iterable ) accumulator = callable( accumulator , value ) ;

	return accumulator ;

}

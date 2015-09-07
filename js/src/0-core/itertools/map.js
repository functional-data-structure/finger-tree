function* map ( callable , iterable ) {

	for ( const value of iterable ) yield callable( value ) ;

}

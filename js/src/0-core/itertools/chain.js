function* chain ( ...iterables ) {

	for ( const iterable of iterables ) yield* iterable ;

}

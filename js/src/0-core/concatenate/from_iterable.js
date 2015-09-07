function from_iterable ( measure , iterable ) {

	return reduce( push , iterable , new Empty( measure ) ) ;

}


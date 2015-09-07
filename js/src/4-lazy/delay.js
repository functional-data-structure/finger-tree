function delay ( thunk ) {
	return new Lazy( thunk ) ;
}

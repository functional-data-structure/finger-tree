function cache ( M ) {
	return M instanceof CachedMeasure ? M : new CachedMeasure( M ) ;
}

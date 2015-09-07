
class CachedMeasure {

	constructor ( M ) {
		this.M = M ;
	}

	zero ( ) {
		return this.M.zero( ) ;
	}

	plus ( a , b ) {
		return this.M.plus( a , b ) ;
	}

	measure ( measured ) {
		return measured.measure( ) ;
	}

}

function cache ( M ) {

	return M instanceof CachedMeasure ? M : new CachedMeasure( M ) ;

}

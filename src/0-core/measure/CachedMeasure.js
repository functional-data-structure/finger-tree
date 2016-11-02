export function CachedMeasure ( M ) {
	this.M = M ;
}

CachedMeasure.prototype.zero = function ( ) {
	return this.M.zero( ) ;
} ;

CachedMeasure.prototype.plus = function ( a , b ) {
	return this.M.plus( a , b ) ;
} ;

CachedMeasure.prototype.measure = function ( measured ) {
	return measured.measure( ) ;
} ;

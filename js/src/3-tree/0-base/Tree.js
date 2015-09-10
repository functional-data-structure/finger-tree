
function Tree ( ) { }

Tree.prototype.force = function ( ) {
	return this ;
} ;

Tree.prototype.takeUntil = function ( p ) {
	return this.split( p )[0] ;
} ;

Tree.prototype.dropUntil = function ( p ) {
	return this.split( p )[1] ;
} ;

Tree.prototype.append = function ( iterable ) {
	return append( this , iterable ) ;
} ;

Tree.prototype.prepend = function ( iterable ) {
	return prepend( this , iterable ) ;
} ;

function _Iterator ( head ) {
	this.current = head ;
}

_Iterator.prototype.next = function ( ) {
	return ( this.current = this.current.next ).value ;
} ;

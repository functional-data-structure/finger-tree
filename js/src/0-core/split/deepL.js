/**
* @param {Array} left
* @param {FingerTree} middle
* @param {Digit} right
*/
function deepL ( M , left , middle , right ) {

	if ( left.length === 0 ) {

		if ( middle.empty( ) ) return _tree( M , right ) ;

		return new Deep( M , middle.head( ).digit( ) , delay( ( ) => middle.tail( ) ) , right ) ;
	}

	return new Deep( M , digit( left ) , middle , right ) ;

}

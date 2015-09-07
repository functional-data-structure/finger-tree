/**
* @param {Array} left
* @param {FingerTree} middle
* @param {Digit} right
*/
function deepL ( M , left , middle , right ) {

	if ( left.length === 0 ) {

		if ( middle.empty( ) ) return from_iterable( M , right ) ;

		return new Deep( M , middle.head( ).digit( ) , middle.tail( ) , right ) ;
	}

	return new Deep( M , digit( left ) , middle , right ) ;

}

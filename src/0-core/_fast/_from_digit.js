import { One , Two , Three , Four } from '../../1-digit' ;
import { Empty , Single , Deep } from '../../3-tree' ;

export function _from_digit ( M , digit ) {

	if ( digit instanceof One ) return new Single( M , digit.a ) ;
	if ( digit instanceof Two || digit instanceof Three || digit instanceof Four ) {
		return new Deep( M , digit.init( ) , new Empty( M ) , new One( digit.last( ) ) ) ;
	}

	// potential optimization by commenting out this section
	// and remove the second test above
	throw new Error( 'second argument is not a Digit' ) ;

}

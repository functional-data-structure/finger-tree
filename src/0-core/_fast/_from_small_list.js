import { Empty , Single , Deep } from '../../3-tree' ;
import { One , Two } from '../../1-digit' ;

export function _from_small_list ( M , list ) {

	switch ( list.length ) {

		case 0 : return new Empty( M ) ;
		case 1 : return new Single( M , list[0] ) ;
		case 2 : return new Deep( M , new One( list[0] ) , new Empty( M ) , new One( list[1] ) ) ;
		case 3 : return new Deep( M , new Two( list[0] , list[1] ) , new Empty( M ) , new One( list[2] ) ) ;
		default: throw new Error( 'second argument has wrong length' ) ;

	}

}

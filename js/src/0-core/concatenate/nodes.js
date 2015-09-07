function nodes ( M , list ) {

	switch ( list.length ) {

		case 2 : return [ node2( M , list[0] , list[1] ) ] ;
		case 3 : return [ node3( M , list[0] , list[1] , list[2] ) ] ;
		case 4 : return [ node2( M , list[0] , list[1] ) , node2( M , list[2] , list[3] ) ] ;
		default: return [ node3( M , list[0] , list[1] , list[2] ) ].concat( nodes( M , list.slice( 3 ) ) ) ;

	}

}

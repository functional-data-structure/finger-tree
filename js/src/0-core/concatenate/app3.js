const app3 = function ( A , list , B ) {

	A = A.force( ) ;
	B = B.force( ) ;

	if ( A instanceof Empty ) return prepend( B , list ) ;
	if ( B instanceof Empty ) return append( A , list ) ;

	if ( A instanceof Single ) return prepend( B , list ).cons( A.head( ) ) ;
	if ( B instanceof Single ) return append( A , list ).push( B.last( ) ) ;

	return new Deep(
		A.M ,
		A.left ,
		delay( ( ) => app3(
			A.middle ,
			nodes( A.M , [ ...chain( A.right , list , B.left ) ] ) ,
			B.middle
		) ) ,
		B.right
	) ;

} ;

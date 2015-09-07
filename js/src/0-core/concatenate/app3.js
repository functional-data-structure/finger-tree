const app3 = function ( A , list , B ) {

	A = A.force( ) ;
	B = B.force( ) ;

	if ( A instanceof Empty ) return extendleft( B , list ) ;
	if ( B instanceof Empty ) return extend( A , list ) ;

	if ( A instanceof Single ) return extendleft( B , list ).unshift( A.head( ) ) ;
	if ( B instanceof Single ) return extend( A , list ).push( B.last( ) ) ;

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

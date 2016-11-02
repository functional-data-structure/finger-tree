import { Lazy } from '.' ;

export function delay ( thunk ) {
	return new Lazy( thunk ) ;
}

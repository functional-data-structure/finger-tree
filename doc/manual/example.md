```js
import { Measure } from 'aureooms-js-measure' ;
import { gt } from 'aureooms-js-predicate' ;

const { COUNTER } = Measure ;

import { empty , from } from 'aureooms-js-fingertree' ;

let t = from( COUNTER , 'abc' ) ;
// OR
// let t = empty( COUNTER ).append( 'abc' )
[ ...t ] ; // abc
t.head( ) ; // 'a'
t.last( ) ; // 'c'
[ ...t.init( ) ] ; // ab
[ ...t.tail( ) ] ; // bc
[ ...t.concat( t ) ] ; // abcabc
const _1 , _2 = t.split( gt( 1 ) ) ;
[ ..._1 ] ; // a
[ ..._2 ] ; // bc
[ ...t.append( 'def' ) ] ; // abcdef
[ ...t.prepend( 'def' ) ] ; // defabc
```

# Example

```js
import { Measures } from '@aureooms/js-measure' ;
import { gt } from '@functional-abstraction/predicate' ;

const { COUNTER } = Measures ;

import { empty , from } from '@functional-data-structure/finger-tree' ;

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

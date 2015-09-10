
var t, i, len = 100000;

console.log('number of operations: ', len);

console.time('cons');
t = [ ] ;
for (i = 0; i < len; ++i) {
  t = [ i ].concat( t ) ;
}
console.timeEnd('cons');

console.time('tail');
for (i = 0; i < len; ++i) {
  t = t.slice( 1 ) ;
}
console.timeEnd('tail');

console.time('push');
t = [ ] ;
for (i = 0; i < len; ++i) {
  t = t.concat( [ i ] ) ;
}
console.timeEnd('push');

console.time('split');
for (i = 0; i < len; ++i) {
  t.slice( 0 , i ) ;
  t.slice( i ) ;
}
console.timeEnd('split');

console.time('init');
for (i = 0; i < len; ++i) {
  t = t.slice( 0 , t.length - 1 ) ;
}
console.timeEnd('init');

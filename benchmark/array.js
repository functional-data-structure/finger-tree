
var t, i, len = 100000;

console.log('number of operations: ', len);

console.time('cons');
t = [ ] ;
for (i = 0; i < len; ++i) {
  t.unshift( i ) ;
}
console.timeEnd('cons');

console.time('tail');
for (i = 0; i < len; ++i) {
  t.shift( ) ;
}
console.timeEnd('tail');

console.time('push');
t = [ ] ;
for (i = 0; i < len; ++i) {
  t.push( i ) ;
}
console.timeEnd('push');

console.log('split: no time since you cannot splice an array more than once');

console.time('init');
for (i = 0; i < len; ++i) {
  t.pop( ) ;
}
console.timeEnd('init');

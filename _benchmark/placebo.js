let t;
let i;
const length = 100000;

console.log('number of operations:', length);

console.time('total');
console.time('cons');
t = [];
for (i = 0; i < length; ++i) {
	t = [i].concat(t);
}

console.timeEnd('cons');

console.time('tail');
for (i = 0; i < length; ++i) {
	t = t.slice(1);
}

console.timeEnd('tail');

console.time('push');
t = [];
for (i = 0; i < length; ++i) {
	t = t.concat([i]);
}

console.timeEnd('push');

console.time('split');
for (i = 0; i < length; ++i) {
	t.slice(0, i);
	t.slice(i);
}

console.timeEnd('split');

console.time('init');
for (i = 0; i < length; ++i) {
	t = t.slice(0, -1);
}

console.timeEnd('init');
console.timeEnd('total');

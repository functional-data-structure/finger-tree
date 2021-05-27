let t;
let i;
const length = 100_000;

console.log('number of operations:', length);

console.time('total');
console.time('cons');
t = [];
for (i = 0; i < length; ++i) {
	t.unshift(i);
}

console.timeEnd('cons');

console.time('tail');
for (i = 0; i < length; ++i) {
	t.shift();
}

console.timeEnd('tail');

console.time('push');
t = [];
for (i = 0; i < length; ++i) {
	t.push(i);
}

console.timeEnd('push');

console.time('init');
for (i = 0; i < length; ++i) {
	t.pop();
}

console.timeEnd('init');

console.log('split: no time since you cannot splice an array more than once');
console.timeEnd('total');

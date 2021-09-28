import {One} from '../../1-digit/1-One.js';
import {Empty} from '../../3-tree/implementations/0-Empty.js';
import {Single} from '../../3-tree/implementations/1-Single.js';
import {cache} from '../measure/cache.js';
import _fill_right from './_fill_right.js';

export default function _form_by_filling(M, iterable) {
	const it = iterable[Symbol.iterator]();

	let event = it.next();
	if (event.done) return new Empty(M);
	const a = event.value;

	event = it.next();
	if (event.done) return new Single(M, a);
	const b = event.value;

	const left = new One(a);
	const middle = new Empty(cache(M));

	return _fill_right(M, left, middle, b, it);
}

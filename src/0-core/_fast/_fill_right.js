import assert from 'assert';

import {One} from '../../1-digit/1-One.js';
import {Two} from '../../1-digit/2-Two.js';
import {Three} from '../../1-digit/3-Three.js';
import {Four} from '../../1-digit/4-Four.js';
import {node3} from '../../2-node/node3.js';
import {Empty} from '../../3-tree/implementations/0-Empty.js';
import {Single} from '../../3-tree/implementations/1-Single.js';
import {Deep} from '../../3-tree/implementations/2-Deep.js';
import {Lazy} from '../../4-lazy/0-Lazy.js';

/**
 * _fill_right.
 *
 * @param {any} M
 * @param {One|Two|Three|Four} left
 * @param {Empty|Single|Deep|Lazy} middle
 * @param {any} x1
 * @param {Iterator} iterator
 * @return {Deep}
 */
export default function _fill_right(M, left, middle, x1, iterator) {
	assert(
		left instanceof One ||
			left instanceof Two ||
			left instanceof Three ||
			left instanceof Four,
	);
	assert(
		middle instanceof Empty ||
			middle instanceof Single ||
			middle instanceof Deep ||
			middle instanceof Lazy,
	);
	let event;
	let x2;
	let x3;
	let y1;
	let y2;
	let y3;
	for (;;) {
		event = iterator.next();
		if (event.done) return new Deep(M, left, middle, new One(x1));
		x2 = event.value;

		event = iterator.next();
		if (event.done) return new Deep(M, left, middle, new Two(x1, x2));
		x3 = event.value;

		event = iterator.next();
		if (event.done) return new Deep(M, left, middle, new Three(x1, x2, x3));
		y1 = event.value;

		middle = middle.push(node3(M, x1, x2, x3));

		event = iterator.next();
		if (event.done) return new Deep(M, left, middle, new One(y1));
		y2 = event.value;

		event = iterator.next();
		if (event.done) return new Deep(M, left, middle, new Two(y1, y2));
		y3 = event.value;

		event = iterator.next();
		if (event.done) return new Deep(M, left, middle, new Three(y1, y2, y3));
		x1 = event.value;

		middle = middle.push(node3(M, y1, y2, y3));
	}
}

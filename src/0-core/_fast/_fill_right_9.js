import assert from 'assert';

import {One} from '../../1-digit/1-One.js';
import {Two} from '../../1-digit/2-Two.js';
import {Three} from '../../1-digit/3-Three.js';
import {Four} from '../../1-digit/4-Four.js';
import {node2} from '../../2-node/node2.js';
import {node3} from '../../2-node/node3.js';
import {Deep} from '../../3-tree/implementations/2-Deep.js';

/**
 * _fill_right_9.
 *
 * @param {any} M
 * @param {One|Two|Three|Four} left
 * @param {Deep} middle
 * @param {any} x1
 * @param {any} x2
 * @param {any} x3
 * @param {Iterator} iterator
 * @return {Deep}
 */
export default function _fill_right_9(M, left, middle, x1, x2, x3, iterator) {
	assert(
		left instanceof One ||
			left instanceof Two ||
			left instanceof Three ||
			left instanceof Four,
	);
	assert(middle instanceof Deep);
	let event;
	let x4;
	let x5;
	let x6;
	let x7;
	let x8;
	let x9;
	let y1;
	let y2;
	let mm = middle._middle;
	const mM = middle.M;
	for (;;) {
		event = iterator.next();
		if (event.done) {
			middle._middle = mm;
			middle._right = new One(node2(M, x1, x2));
			return new Deep(M, left, middle, new One(x3));
		}

		x4 = event.value;

		event = iterator.next();
		if (event.done) {
			middle._middle = mm;
			middle._right = new One(node3(M, x1, x2, x3));
			return new Deep(M, left, middle, new One(x4));
		}

		x5 = event.value;

		event = iterator.next();
		if (event.done) {
			middle._middle = mm;
			middle._right = new One(node3(M, x1, x2, x3));
			return new Deep(M, left, middle, new Two(x4, x5));
		}

		x6 = event.value;

		event = iterator.next();
		if (event.done) {
			middle._middle = mm;
			middle._right = new One(node3(M, x1, x2, x3));
			return new Deep(M, left, middle, new Three(x4, x5, x6));
		}

		x7 = event.value;

		event = iterator.next();
		if (event.done) {
			middle._middle = mm;
			middle._right = new One(node3(M, x1, x2, x3));
			return new Deep(M, left, middle, new Four(x4, x5, x6, x7));
		}

		x8 = event.value;

		event = iterator.next();
		if (event.done) {
			middle._middle = mm;
			middle._right = new Two(node3(M, x1, x2, x3), node3(M, x4, x5, x6));
			return new Deep(M, left, middle, new Two(x7, x8));
		}

		x9 = event.value;

		event = iterator.next();
		if (event.done) {
			middle._middle = mm;
			middle._right = new Two(node3(M, x1, x2, x3), node3(M, x4, x5, x6));
			return new Deep(M, left, middle, new Three(x7, x8, x9));
		}

		y1 = event.value;

		event = iterator.next();
		if (event.done) {
			middle._middle = mm;
			middle._right = new Two(node3(M, x1, x2, x3), node3(M, x4, x5, x6));
			return new Deep(M, left, middle, new Four(x7, x8, x9, y1));
		}

		y2 = event.value;

		event = iterator.next();
		if (event.done) {
			middle._middle = mm;
			middle._right = new Three(
				node3(M, x1, x2, x3),
				node3(M, x4, x5, x6),
				node3(M, x7, x8, x9),
			);
			return new Deep(M, left, middle, new Two(y1, y2));
		}

		mm = mm._UNSAFE_push(
			node3(
				mM,
				node3(M, x1, x2, x3),
				node3(M, x4, x5, x6),
				node3(M, x7, x8, x9),
			),
		);
		x3 = event.value;
		x1 = y1;
		x2 = y2;
	}
}

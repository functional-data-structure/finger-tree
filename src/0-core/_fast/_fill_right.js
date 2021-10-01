import assert from 'assert';

import {One} from '../../1-digit/1-One.js';
import {Two} from '../../1-digit/2-Two.js';
import {Three} from '../../1-digit/3-Three.js';
import {Four} from '../../1-digit/4-Four.js';
import {node3} from '../../2-node/node3.js';
import {Empty} from '../../3-tree/implementations/0-Empty.js';
import {Single} from '../../3-tree/implementations/1-Single.js';
import {Deep} from '../../3-tree/implementations/2-Deep.js';
import _fill_right_9 from './_fill_right_9.js';

/**
 * _fill_right.
 *
 * @param {any} M
 * @param {One|Two|Three|Four} left
 * @param {Empty|Single|Deep} middle
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
			middle instanceof Deep,
	);
	let event;
	let x2;
	let x3;
	let i = 3; // I === 0 guarantees `middle instanceof Deep`.
	for (;;) {
		event = iterator.next();
		if (event.done) return new Deep(M, left, middle, new One(x1));
		x2 = event.value;

		event = iterator.next();
		if (event.done) return new Deep(M, left, middle, new Two(x1, x2));
		x3 = event.value;

		if (--i <= 0) {
			assert(middle instanceof Deep);
			if (middle._right instanceof Three) {
				middle._middle = middle._middle._UNSAFE_push(
					middle._right._node(middle.M),
				);
				return _fill_right_9(M, left, middle, x1, x2, x3, iterator);
			}
		}

		event = iterator.next();
		if (event.done) return new Deep(M, left, middle, new Three(x1, x2, x3));
		middle = middle._UNSAFE_push(node3(M, x1, x2, x3));
		x1 = event.value;
	}
}

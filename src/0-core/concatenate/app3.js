import assert from 'assert';

import {Tree, Empty, Single, Deep} from '../../3-tree/index.js';
import {delay} from '../../4-lazy/index.js';
import {_prepend, _append} from '../_fast/index.js';

export function app3(A, list, B) {
	assert(A instanceof Tree);
	assert(B instanceof Tree);

	A = A.force();
	B = B.force();

	if (A instanceof Empty) return _prepend(B, list);
	if (B instanceof Empty) return _append(A, list);

	if (A instanceof Single) return _prepend(B, list).cons(A.head());
	if (B instanceof Single) return _append(A, list).push(B.last());

	return new Deep(
		A.M,
		A.left,
		delay(() =>
			app3(A.middle, A.right._nodes_with_list(A.M, list, B.left), B.middle),
		),
		B.right,
	);
}

import {_prepend} from "../_fast/index.js";

export function prepend(tree, iterable) {
	return _prepend(tree, Array.from(iterable));
}

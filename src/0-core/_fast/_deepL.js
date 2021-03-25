import {delay} from "../../4-lazy/index.js";
import {deepL} from "../split/index.js";

export function _deepL(M, left, middle, right) {
	return delay(() => deepL(M, left, middle, right));
}

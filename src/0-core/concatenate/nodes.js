import {node2, node3} from "../../2-node/index.js";

export function nodes(M, list) {
	const out = [];

	const n = list.length;

	let i = 0;

	switch (n % 3) {
		case 1:
			out.push(node2(M, list[0], list[1]));
			out.push(node2(M, list[2], list[3]));
			i += 4;
			break;
		case 2:
			out.push(node2(M, list[0], list[1]));
			i += 2;
			break;
		default:
			break;
	}

	for (; i < n; i += 3) {
		out.push(node3(M, list[i], list[i + 1], list[i + 2]));
	}

	return out;
}

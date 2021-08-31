import assert from 'assert';

import {node2, node3} from '../../2-node/index.js';

export function nodes(M, list) {
	assert(list.length >= 3 && list.length <= 12);
	switch (list.length) {
		case 3:
			return [node3(M, list[0], list[1], list[2])];
		case 4:
			return [node2(M, list[0], list[1]), node2(M, list[2], list[3])];
		case 5:
			return [node3(M, list[0], list[1], list[2]), node2(M, list[3], list[4])];
		case 6:
			return [
				node3(M, list[0], list[1], list[2]),
				node3(M, list[3], list[4], list[5]),
			];
		case 7:
			return [
				node2(M, list[0], list[1]),
				node3(M, list[2], list[3], list[4]),
				node2(M, list[5], list[6]),
			];
		case 8:
			return [
				node3(M, list[0], list[1], list[2]),
				node2(M, list[3], list[4]),
				node3(M, list[5], list[6], list[7]),
			];
		case 9:
			return [
				node3(M, list[0], list[1], list[2]),
				node3(M, list[3], list[4], list[5]),
				node3(M, list[6], list[7], list[8]),
			];
		case 10:
			return [
				node2(M, list[0], list[1]),
				node3(M, list[2], list[3], list[4]),
				node3(M, list[5], list[6], list[7]),
				node2(M, list[8], list[9]),
			];
		case 11:
			return [
				node2(M, list[0], list[1]),
				node3(M, list[2], list[3], list[4]),
				node3(M, list[5], list[6], list[7]),
				node3(M, list[8], list[9], list[10]),
			];
		default:
			assert(list.length === 12);
			return [
				node3(M, list[0], list[1], list[2]),
				node3(M, list[3], list[4], list[5]),
				node3(M, list[6], list[7], list[8]),
				node3(M, list[9], list[10], list[11]),
			];
	}
}

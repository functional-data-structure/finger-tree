import assert from 'assert';
import {Empty, Single, Deep} from '../../3-tree/index.js';
import {Four, Three, Two, One} from '../../1-digit/index.js';
import {cache} from '../measure/index.js';
import {node2, node3} from '../../2-node/index.js';

function _from_11(M, list) {
	assert(list.length === 11);
	return new Deep(
		M,
		new Four(list[0], list[1], list[2], list[3]),
		new Single(cache(M), node3(M, list[4], list[5], list[6])),
		new Four(list[7], list[8], list[9], list[10]),
	);
}

function _from_12(M, list) {
	assert(list.length === 12);
	const cM = cache(M);
	return new Deep(
		M,
		new Three(list[0], list[1], list[2]),
		new Deep(
			cM,
			new One(node3(M, list[3], list[4], list[5])),
			new Empty(cM),
			new One(node3(M, list[6], list[7], list[8])),
		),
		new Three(list[9], list[10], list[11]),
	);
}

function _from_13(M, list) {
	assert(list.length === 13);
	const cM = cache(M);
	return new Deep(
		M,
		new Three(list[0], list[1], list[2]),
		new Deep(
			cM,
			new One(node3(M, list[3], list[4], list[5])),
			new Empty(cM),
			new One(node3(M, list[6], list[7], list[8])),
		),
		new Four(list[9], list[10], list[11], list[12]),
	);
}

function _from_14(M, list) {
	assert(list.length === 14);
	const cM = cache(M);
	return new Deep(
		M,
		new Four(list[0], list[1], list[2], list[3]),
		new Deep(
			cM,
			new One(node3(M, list[4], list[5], list[6])),
			new Empty(cM),
			new One(node3(M, list[7], list[8], list[9])),
		),
		new Four(list[10], list[11], list[12], list[13]),
	);
}

function _from_15(M, list) {
	assert(list.length === 15);
	const cM = cache(M);
	return new Deep(
		M,
		new Three(list[0], list[1], list[2]),
		new Deep(
			cM,
			new Two(node2(M, list[3], list[4]), node2(M, list[5], list[6])),
			new Empty(cM),
			new Two(
				node2(M, list[7], list[8]),
				node3(M, list[9], list[10], list[11]),
			),
		),
		new Three(list[12], list[13], list[14]),
	);
}

function _from_16(M, list) {
	assert(list.length === 16);
	const cM = cache(M);
	return new Deep(
		M,
		new Three(list[0], list[1], list[2]),
		new Deep(
			cM,
			new Two(node3(M, list[3], list[4], list[5]), node2(M, list[6], list[7])),
			new Empty(cM),
			new Two(
				node2(M, list[8], list[9]),
				node3(M, list[10], list[11], list[12]),
			),
		),
		new Three(list[13], list[14], list[15]),
	);
}

function _from_17(M, list) {
	assert(list.length === 17);
	const cM = cache(M);
	return new Deep(
		M,
		new Three(list[0], list[1], list[2]),
		new Deep(
			cM,
			new Two(
				node3(M, list[3], list[4], list[5]),
				node3(M, list[6], list[7], list[8]),
			),
			new Empty(cM),
			new Two(
				node2(M, list[9], list[10]),
				node3(M, list[11], list[12], list[13]),
			),
		),
		new Three(list[14], list[15], list[16]),
	);
}

function _from_18(M, list) {
	assert(list.length === 18);
	const cM = cache(M);
	return new Deep(
		M,
		new Three(list[0], list[1], list[2]),
		new Deep(
			cM,
			new Two(
				node3(M, list[3], list[4], list[5]),
				node3(M, list[6], list[7], list[8]),
			),
			new Empty(cM),
			new Two(
				node3(M, list[9], list[10], list[11]),
				node3(M, list[12], list[13], list[14]),
			),
		),
		new Three(list[15], list[16], list[17]),
	);
}

function _from_19(M, list) {
	assert(list.length === 19);
	const cM = cache(M);
	return new Deep(
		M,
		new Three(list[0], list[1], list[2]),
		new Deep(
			cM,
			new Two(
				node3(M, list[3], list[4], list[5]),
				node3(M, list[6], list[7], list[8]),
			),
			new Empty(cM),
			new Two(
				node3(M, list[9], list[10], list[11]),
				node3(M, list[12], list[13], list[14]),
			),
		),
		new Four(list[15], list[16], list[17], list[18]),
	);
}

function _from_20(M, list) {
	assert(list.length === 20);
	const cM = cache(M);
	return new Deep(
		M,
		new Four(list[0], list[1], list[2], list[3]),
		new Deep(
			cM,
			new Two(
				node3(M, list[4], list[5], list[6]),
				node3(M, list[7], list[8], list[9]),
			),
			new Empty(cM),
			new Two(
				node3(M, list[10], list[11], list[12]),
				node3(M, list[13], list[14], list[15]),
			),
		),
		new Four(list[16], list[17], list[18], list[19]),
	);
}

function _from_21(M, list) {
	assert(list.length === 21);
	const cM = cache(M);
	return new Deep(
		M,
		new Three(list[0], list[1], list[2]),
		new Deep(
			cM,
			new Two(
				node3(M, list[3], list[4], list[5]),
				node3(M, list[6], list[7], list[8]),
			),
			new Empty(cM),
			new Three(
				node3(M, list[9], list[10], list[11]),
				node3(M, list[12], list[13], list[14]),
				node3(M, list[15], list[16], list[17]),
			),
		),
		new Three(list[18], list[19], list[20]),
	);
}

function _from_22(M, list) {
	assert(list.length === 22);
	const cM = cache(M);
	return new Deep(
		M,
		new Three(list[0], list[1], list[2]),
		new Deep(
			cM,
			new Two(
				node3(M, list[3], list[4], list[5]),
				node3(M, list[6], list[7], list[8]),
			),
			new Empty(cM),
			new Three(
				node3(M, list[9], list[10], list[11]),
				node3(M, list[12], list[13], list[14]),
				node3(M, list[15], list[16], list[17]),
			),
		),
		new Four(list[18], list[19], list[20], list[21]),
	);
}

function _from_23(M, list) {
	assert(list.length === 23);
	const cM = cache(M);
	return new Deep(
		M,
		new Three(list[0], list[1], list[2]),
		new Deep(
			cM,
			new Three(
				node3(M, list[3], list[4], list[5]),
				node3(M, list[6], list[7], list[8]),
				node3(M, list[9], list[10], list[11]),
			),
			new Empty(cM),
			new Three(
				node3(M, list[12], list[13], list[14]),
				node2(M, list[15], list[16]),
				node3(M, list[17], list[18], list[19]),
			),
		),
		new Three(list[20], list[21], list[22]),
	);
}

function _from_24(M, list) {
	assert(list.length === 24);
	const cM = cache(M);
	return new Deep(
		M,
		new Three(list[0], list[1], list[2]),
		new Deep(
			cM,
			new Three(
				node3(M, list[3], list[4], list[5]),
				node3(M, list[6], list[7], list[8]),
				node3(M, list[9], list[10], list[11]),
			),
			new Empty(cM),
			new Three(
				node3(M, list[12], list[13], list[14]),
				node3(M, list[15], list[16], list[17]),
				node3(M, list[18], list[19], list[20]),
			),
		),
		new Three(list[21], list[22], list[23]),
	);
}

export const THRESHOLD = 12;

export function _from_largest_medium_list(M, list) {
	assert(list.length === THRESHOLD);
	return _from_12(M, list);
}

export function _from_medium_list(M, list) {
	assert(
		Number.isInteger(list.length) &&
			list.length >= 0 &&
			list.length <= THRESHOLD,
	);

	// eslint-disable-next-line default-case
	switch (list.length) {
		case 0:
			return new Empty(M);
		case 1:
			return new Single(M, list[0]);
		case 2:
			return new Deep(
				M,
				new One(list[0]),
				new Empty(cache(M)),
				new One(list[1]),
			);
		case 3:
			return new Deep(
				M,
				new Two(list[0], list[1]),
				new Empty(cache(M)),
				new One(list[2]),
			);
		case 4:
			return new Deep(
				M,
				new Two(list[0], list[1]),
				new Empty(cache(M)),
				new Two(list[2], list[3]),
			);
		case 5:
			return new Deep(
				M,
				new Three(list[0], list[1], list[2]),
				new Empty(cache(M)),
				new Two(list[3], list[4]),
			);
		case 6:
			return new Deep(
				M,
				new Three(list[0], list[1], list[2]),
				new Empty(cache(M)),
				new Three(list[3], list[4], list[5]),
			);
		case 7:
			return new Deep(
				M,
				new Four(list[0], list[1], list[2], list[3]),
				new Empty(cache(M)),
				new Three(list[4], list[5], list[6]),
			);
		case 8:
			return new Deep(
				M,
				new Four(list[0], list[1], list[2], list[3]),
				new Empty(cache(M)),
				new Four(list[4], list[5], list[6], list[7]),
			);
		case 9:
			return new Deep(
				M,
				new Three(list[0], list[1], list[2]),
				new Single(cache(M), node3(M, list[3], list[4], list[5])),
				new Three(list[6], list[7], list[8]),
			);
		case 10:
			return new Deep(
				M,
				new Four(list[0], list[1], list[2], list[3]),
				new Single(cache(M), node3(M, list[4], list[5], list[6])),
				new Three(list[7], list[8], list[9]),
			);
		case 11:
			return _from_11(M, list);
		case 12:
			return _from_12(M, list);
		case 13:
			return _from_13(M, list);
		case 14:
			return _from_14(M, list);
		case 15:
			return _from_15(M, list);
		case 16:
			return _from_16(M, list);
		case 17:
			return _from_17(M, list);
		case 18:
			return _from_18(M, list);
		case 19:
			return _from_19(M, list);
		case 20:
			return _from_20(M, list);
		case 21:
			return _from_21(M, list);
		case 22:
			return _from_22(M, list);
		case 23:
			return _from_23(M, list);
		case 24:
			return _from_24(M, list);
	}
}

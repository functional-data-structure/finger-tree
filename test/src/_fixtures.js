import {map} from '@iterable-iterator/map';
import {reduce} from '@iterable-iterator/reduce';
import {reversed} from '@iterable-iterator/reversed';

import {Measures} from '@functional-abstraction/measure';

export const ABSTRACT_COUNTER = Measures.COUNTER;

export const FAST_COUNTER = {
	plus(a, b) {
		return a + b;
	},
	measure(_x) {
		return 1;
	},
	zero() {
		return 0;
	},
};

export const measure = (M, iterable) =>
	reduce(M.plus.bind(M), map(M.measure.bind(M), iterable), M.zero());

export const measureToString = (M) => {
	switch (M) {
		case FAST_COUNTER:
			return 'COUNTER(FAST)';
		case ABSTRACT_COUNTER:
			return 'COUNTER(ABSTRACT)';
		default:
			throw new Error(`unknown measure ${M.name}`);
	}
};

export const iterableToString = (iterable) => iterable.toString();

export const fromToString = (measure, iterable) =>
	`from(${measureToString(measure)}, ${iterableToString(iterable)})`;

export const fromLeftToString = (measure, iterable) =>
	`fromLeft(${measureToString(measure)}, ${iterableToString(iterable)})`;

export const fromRightToString = (measure, iterable) =>
	`fromRight(${measureToString(measure)}, ${iterableToString(iterable)})`;

export const fromLeft = (tree, iterable) => {
	for (const x of iterable) tree = tree.push(x);
	return tree;
};

export const fromRight = (tree, iterable) => {
	for (const x of reversed(iterable)) tree = tree.cons(x);
	return tree;
};

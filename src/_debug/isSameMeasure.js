import underlyingMeasure from './underlyingMeasure.js';

const isSameMeasure = (M1, M2) =>
	underlyingMeasure(M1) === underlyingMeasure(M2);

export default isSameMeasure;

import {CachedMeasure} from '../0-core/measure/CachedMeasure.js';

const underlyingMeasure = (M) => (M instanceof CachedMeasure ? M.M : M);

export default underlyingMeasure;

import LazyInit from './LazyInit.js';

const delayInit = (tree) => new LazyInit(tree);

export default delayInit;

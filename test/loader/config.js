import * as babelLoader from '@node-loader/babel';
import * as importMapLoader from '@node-loader/import-maps';

const config = {
	loaders: [importMapLoader, babelLoader],
};

export default config;

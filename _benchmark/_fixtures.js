import fs from 'fs';
import process from 'process';

export function packageInfo(packageName) {
	const file = `node_modules/${packageName}/package.json`;
	const raw = fs.readFileSync(file);
	const json = JSON.parse(raw);
	return json;
}

export const load = async (path) => {
	const exports = await import(path);
	const stats = fs.statSync(path);
	const mtime = stats.mtime;
	const version = mtime.toISOString();

	return {
		version,
		exports,
	};
};

const distPath = (name) => `../dist/index.${name}`;

export const dist = (name) => ({
	name,
	async load() {
		const path = distPath(name);
		const {version, exports} = await load(path);
		return {
			name,
			version,
			exports,
		};
	},
});

export const dependency = (name) => ({
	name,
	async load() {
		const path = name;
		const exports = await import(path);
		const {version} = packageInfo(name);
		return {
			name,
			version,
			exports,
		};
	},
});

export const object = (name, exports) => ({
	name,
	async load() {
		return {
			name,
			version: process.version,
			exports,
		};
	},
});

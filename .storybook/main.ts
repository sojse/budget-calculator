import type { StorybookConfig } from "@storybook/nextjs";
import path from 'path';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		'@storybook/addon-styling-webpack',
		'@storybook/addon-a11y',
		'@storybook/icons',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	features: {
		experimentalRSC: true,
	},
	docs: {
		autodocs: 'tag',
	},
	staticDirs: ['..\\public'],
	webpackFinal: async (config) => {
		if (!config.resolve) {
			config.resolve = {};
		}

		if (!config.resolve.alias) {
			config.resolve.alias = {};
		}

		config.resolve.alias['@'] = path.resolve(__dirname, '../src');

		config.module = config.module || {};
		config.module.rules = config.module.rules || [];

		// This modifies the existing image rule to exclude .svg files
		// to enable the use of svgr/webpack
		const imageRule = config.module.rules.find((rule) =>
			rule?.['test']?.test('.svg')
		);
		if (imageRule) {
			imageRule['exclude'] = /\.svg$/;
		}

		// Configure .svg files to be loaded with @svgr/webpack
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};
export default config;

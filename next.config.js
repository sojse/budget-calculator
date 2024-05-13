const path = require('path');


/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		ppr: true,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
		prependData: `@import '@/ui/styles/variables.scss';`,
	},
	webpack: (config) => {
		// Add SVGR loader to enable using SVGs as React Components
		config.module.rules.push({
			test: /\.svg$/,
			use: [{ loader: '@svgr/webpack', options: { icon: true } }],
		});

		return config;
	},
};

module.exports = nextConfig;


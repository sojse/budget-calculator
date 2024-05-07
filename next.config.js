const path = require('path');

module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
		prependData: `@import '@/ui/styles/variables.scss';`,
	},

	nextConfig: {
		experimental: {
			ppr: true,
		},
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


/** @type {import('houdini').ConfigFile} */
const config = {
	apiUrl: 'https://readonlydemo.vendure.io/shop-api',
	plugins: {
		'houdini-svelte': {
			client: './src/client',
		},
	},
	scalars: {
		DateTime: {
			type: 'string',
		},
	},
	defaultFragmentMasking: true,
}

export default config

/** @type {import('houdini').ConfigFile} */
const config = {
  schemaPath: './schema.graphql',
  sourceGlob: 'src/**/*.{svelte,gql,graphql}',
  apiUrl: 'https://readonlydemo.vendure.io/shop-api',
  scalars: {
    DateTime: {
      type: 'string',
    },
  },
  disableMasking: true,
}

export default config

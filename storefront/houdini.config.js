/** @type {import('houdini').ConfigFile} */
const config = {
  schemaPath: './schema.graphql',
  sourceGlob: 'src/**/*.{svelte,gql,graphql}',
  module: 'esm',
  framework: 'kit',
  apiUrl: 'http://localhost:3000/shop-api',
  scalars: {
    DateTime: {
      type: 'string',
    },
  },
  disableMasking: true,
}

export default config

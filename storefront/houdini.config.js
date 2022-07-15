/** @type {import('houdini').ConfigFile} */
const config = {
  schemaPath: './schema.graphql',
  sourceGlob: 'src/**/*.{svelte,gql,graphql}',
  module: 'esm',
  framework: 'kit',
  apiUrl: 'https://readonlydemo.vendure.io/shop-api',
  scalars: {
    /* in your case, something like */
    DateTime: {
      // <- The GraphQL Scalar
      type: 'string', // <-  The TypeScript type
    },
  },
  disableMasking: true
}

export default config

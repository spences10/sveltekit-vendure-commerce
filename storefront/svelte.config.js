import watchAndRun from '@kitql/vite-plugin-watch-and-run'
import adapter from '@sveltejs/adapter-vercel'
import path from 'path'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        watchAndRun([
          {
            watch: '**/*.(gql|graphql)',
            run: 'npm run gen',
          },
        ]),
      ],
      resolve: {
        alias: {
          $components: path.resolve('./src/lib/components'),
          $lib: path.resolve('./src/lib'),
          $stores: path.resolve('./src/stores'),
        },
      },
    },
  },
}

export default config

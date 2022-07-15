import watchAndRun from '@kitql/vite-plugin-watch-and-run'
import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    watchAndRun([
      {
        watch: '**/*.(gql|graphql)',
        run: 'npm run gen',
      },
    ]),
  ],
  resolve: {
    alias: {
      $components: resolve('./src/lib/components'),
      $lib: resolve('./src/lib'),
      $stores: resolve('./src/stores'),
    },
  },
}

export default config

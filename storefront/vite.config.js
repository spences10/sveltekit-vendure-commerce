import watchAndRun from '@kitql/vite-plugin-watch-and-run'
import { sveltekit } from '@sveltejs/kit/vite'

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
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['.']
    }
  }
}

export default config

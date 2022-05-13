# SvelteKit and Vendure Commerce

`/storefront` is a SvelteKit project that uses `/vendure` the Vendure e-commerce framework as a back-end.

To get started:

- clone the project,
  - `cd` into `vendure` and run `pnpm install`.
  - choose the SQLite option
  - `pnpm run start` to start the server.
- open another terminal `cd` into the `/storefront` directory and run `pnpm install`.
  - `cp .envsample .env`
  - `pnpm run dev`

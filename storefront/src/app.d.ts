/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  interface Locals {
    kitqlCartId: string
  }
  // interface Platform {}
  interface Session {
    kitqlCartId: string
  }
  // interface Stuff {}
}

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_API: string
}

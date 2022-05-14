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

declare namespace svelte.JSX {
  interface DOMAttributes<T> {
    onclick_outside?: CompositionEventHandler<T>
  }
}

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_API: string
}

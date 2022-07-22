<script lang="ts" context="module">
  import {
    GQL_GetActiveOrder,
    GQL_GetCollections,
    GQL_GetCurrencyCode,
    GQL_GetTopSellers,
  } from '$houdini'

  import { browser } from '$app/env'
  import Cart from '$lib/components/cart.svelte'
  import Footer from '$lib/components/footer.svelte'
  import Hero from '$lib/components/hero.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import PageTransition from '$lib/components/page-transition.svelte'
  import { houdiniClient } from '$lib/graphql/client'
  import type { Load } from '@sveltejs/kit'
  import { onMount } from 'svelte'
  import '../app.css'
  import { userLocale } from '../stores/locale'

  houdiniClient.init()

  export const load: Load = async event => {
    // SSR for these 3 queries
    await GQL_GetTopSellers.fetch({ event })
    await GQL_GetCurrencyCode.fetch({ event })
    await GQL_GetCollections.fetch({ event })

    return { props: { key: event.url.pathname } }
  }
</script>

<script lang="ts">
  export let key: string

  // Synchro of the 3 SSR queries
  $: browser && GQL_GetTopSellers.fetch()
  $: browser && GQL_GetCurrencyCode.fetch()
  $: browser && GQL_GetCollections.fetch()

  // Only browser side because depending on the localstorage
  $: browser && GQL_GetActiveOrder.fetch()

  onMount(async () => {
    userLocale.set(navigator.languages[0] as any)
  })
</script>

<svelte:head>
  <title>Vendure & SvelteKit & KitQL & Houdini</title>
</svelte:head>

<PageTransition refresh={key}>
  <Cart />
  <Navbar />
  <Hero {key} />
  <main class="container max-w-6xl mx-auto px-4 mb-20">
    <slot />
  </main>
  <Footer />
</PageTransition>

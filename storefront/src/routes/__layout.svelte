<script lang="ts" context="module">
  import { GQL_GetCollections } from '$houdini'
  import Cart from '$lib/components/cart.svelte'
  import Footer from '$lib/components/footer.svelte'
  import Hero from '$lib/components/hero.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import PageTransition from '$lib/components/page-transition.svelte'
  import type { Load } from '@sveltejs/kit'
  import { onMount } from 'svelte'
  import '../app.css'
  import { userLocale } from '../stores/locale'

  import { houdiniClient } from '$lib/graphql/client'

  houdiniClient.init()

  export const load: Load = async event => {
    await GQL_GetCollections.fetch({ event })
    console.log('=====================')
    console.log('layout', event.session)
    console.log('=====================')
    return { props: { key: event.url.pathname } }
  }
</script>

<script lang="ts">
  export let key: string

  $: collections =
    $GQL_GetCollections.data?.collections.items.filter(
      item => item?.parent?.name === '__root_collection__'
    ) || []

  onMount(() => {
    userLocale.set(navigator.languages[0] as any)
  })
</script>

<PageTransition refresh={key}>
  <Cart />
  <Navbar {collections} />
  <Hero {key} />
  <main class="container max-w-6xl mx-auto px-4 mb-20">
    <slot />
  </main>
  <Footer />
</PageTransition>

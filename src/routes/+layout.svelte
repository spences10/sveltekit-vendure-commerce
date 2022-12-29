<script lang="ts">
  import Cart from '$lib/components/cart.svelte'
  import Footer from '$lib/components/footer.svelte'
  import Hero from '$lib/components/hero.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import PageTransition from '$lib/components/page-transition.svelte'
  import { currencyCode } from '$stores/currencyCode'
  import { onMount } from 'svelte'
  import '../app.css'
  import { userLocale } from '../stores/locale'

  import type { PageData } from './$types'

  export let data: PageData

  $: ({ LayoutQuery } = data)

  $: $currencyCode = $LayoutQuery.data.activeChannel.currencyCode

  onMount(async () => {
    userLocale.set(navigator.languages[0] as any)
  })
</script>

<svelte:head>
  <title>Vendure & SvelteKit & KitQL & Houdini</title>
</svelte:head>

<PageTransition refresh={data.key}>
  <Navbar />
  <Cart />
  <Hero key={data.key} />
  <main class="container max-w-6xl mx-auto px-4 mb-20">
    <slot />
  </main>
  <Footer />
</PageTransition>

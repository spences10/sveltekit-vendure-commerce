<script context="module">
  export const load = async ({ url }) => {
    fetchCollections()
    return {
      props: {
        key: url.pathname,
      },
    }
  }
</script>

<script>
  import Footer from '$lib/components/footer.svelte'
  import Hero from '$lib/components/hero.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import PageTransition from '$lib/components/page-transition.svelte'
  import {
    collectionsStore,
    fetchCollections,
  } from '$stores/collections'
  import '../app.css'

  export let key

  $: collections = $collectionsStore.filter(
    item => item.parent.name === '__root_collection__'
  )
</script>

<PageTransition refresh={key}>
  <Navbar {collections} />
  <Hero {key} />
  <main class="container max-w-6xl mx-auto px-4 mb-20">
    <slot />
  </main>
  <Footer />
</PageTransition>

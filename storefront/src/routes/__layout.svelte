<script context="module">
  export const load = async ({ url, fetch }) => {
    const res = await fetch(`/api/get-collections.json`)
    const allCollections = await res.json()
    return {
      props: {
        key: url.pathname,
        allCollections,
      },
    }
  }
</script>

<script>
  import Hero from '$lib/components/hero.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import '../app.css'

  export let key
  export let allCollections

  const collections = allCollections.filter(
    item => item.parent.name === '__root_collection__'
  )
</script>

<Navbar {collections} />
<Hero {key} />
<main class="container max-w-6xl mx-auto px-4 mb-20">
  <slot />
</main>

<script context="module">
  export const load = async ({ url }) => ({
    props: {
      key: url.pathname,
    },
  })
</script>

<script>
  import Hero from '$lib/components/hero.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import '../app.css'

  export let key
</script>

<Navbar />
<Hero {key} />
<main class="container max-w-6xl mx-auto px-4 mb-20">
  <slot />
</main>

<script>
  import Hero from '$lib/components/hero.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import '../app.css'
</script>

<Navbar />
<Hero />
<main class="container max-w-6xl mx-auto px-4 mb-20">
  <slot />
</main>

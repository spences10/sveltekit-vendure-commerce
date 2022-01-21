<script>
  import Hero from '$lib/components/hero.svelte'
  import '../app.css'
</script>

<Hero />
<main class="container max-w-6xl mx-auto px-4 mb-20">
  <slot />
</main>

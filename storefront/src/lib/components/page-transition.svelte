<script>
  import { fade } from 'svelte/transition'
  export let refresh = ''
</script>

{#key refresh}
  <div transition:fade={{ duration: 300 }}>
    <slot />
  </div>
{/key}

<script>
  import { fade } from 'svelte/transition'
  export let refresh = ''
</script>

{#key refresh}
  <div transition:fade={{ duration: 200 }}>
    <slot />
  </div>
{/key}

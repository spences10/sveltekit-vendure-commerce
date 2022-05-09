<script lang="ts" context="module">
  // export const load = async ({ fetch }) => {
  //   await KQL_GetActiveOrder.queryLoad({ fetch })
  //   return {}
  // }
  import { browser } from '$app/env'
  import { KQL_GetActiveOrder } from '$lib/graphql/_kitql/graphqlStores'
  import { fly } from 'svelte/transition'
</script>

<script lang="ts">
  $: browser && KQL_GetActiveOrder.query()

  export let isOpen: boolean = true
</script>

<button on:click={() => (isOpen = !isOpen)}>Click {isOpen}</button>

{#if isOpen}
  <section
    in:fly={{ x: 200, duration: 350 }}
    out:fly={{ x: 400, duration: 350 }}
    class="top-0 right-0 fixed bg-primary h-full w-3/12 z-40"
  >
    <pre>
    {JSON.stringify($KQL_GetActiveOrder.data, null, 2)}
  </pre>
  </section>
{/if}

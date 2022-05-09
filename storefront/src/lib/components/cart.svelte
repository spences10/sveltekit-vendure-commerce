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

{#if isOpen}
  <section
    in:fly={{ duration: 5000 }}
    out:fly
    class="top-0 right-0 fixed bg-primary h-full w-3/12 z-40"
  >
    <pre>
    {JSON.stringify($KQL_GetActiveOrder.data, null, 2)}
  </pre>
  </section>
{/if}

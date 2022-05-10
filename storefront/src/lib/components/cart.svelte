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

  let activeOrderLines =
    $KQL_GetActiveOrder?.data?.activeOrder?.lines || []
</script>

<button on:click={() => (isOpen = !isOpen)}>Click {isOpen}</button>

{#if isOpen}
  <section
    in:fly={{ x: 200, duration: 350 }}
    out:fly={{ x: 400, duration: 350 }}
    class="p-10 top-0 right-0 fixed bg-base-100 shadow-xl h-full w-3/12 z-40"
  >
    <div class="flex justify-between align-middle text-3xl">
      <button on:click={() => (isOpen = !isOpen)} class="block">
        &#10799;
      </button>
      <p>Cart</p>
    </div>
    {#if !activeOrderLines.length}
      <p class="text-2xl text-base-300">Cart is empty</p>
    {:else}
      {#each activeOrderLines as item}
        <div class="my-6 flex ">
          <div class="">
            <img
              src={`${item.featuredAsset.preview}?w=300&h=300`}
              alt={item.productVariant.name}
              class="object-cover rounded-lg h-16 w-16"
            />
          </div>
          <div class="flex flex-col flex-grow text-lg pl-3">
            <p class="">{item.productVariant.name}</p>
            <div class="flex justify-between align-middle">
              <p>price</p>
              <p>plus minus</p>
              <p>Total</p>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </section>
{/if}

<!-- <pre class="flex flex-col flex-grow">
  {JSON.stringify($KQL_GetActiveOrder.data, null, 2)}
</pre> -->

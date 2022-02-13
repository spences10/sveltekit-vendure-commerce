<script context="module">
  import Filters from '$lib/components/filters.svelte'
  import SadFace from '$lib/components/icons/sad-face.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import { filtersStore } from '$stores/filters'
  import {
    fetchSearchResults,
    searchStore,
  } from '$stores/search-products'

  export const load = async ({ params }) => {
    const { searchTerm } = params
    return { props: { searchTerm } }
  }
</script>

<script>
  export let searchTerm

  $: fetchSearchResults({
    input: {
      collectionSlug: '',
      term: searchTerm,
      groupByProduct: true,
      facetValueIds: $filtersStore,
      take: 24,
      skip: 0,
    },
  })

  $: products = $searchStore.items || {}
  $: facetValues = $searchStore.facetValues || {}
</script>

<div class="flex">
  {#if Object.entries(products).length >= 1}
    <Filters {facetValues} />
    <div
      class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {#each products as item}
        <ProductCard {item} />
      {/each}
    </div>
  {:else}
    <h3 class="text-5xl text-neutral mb-8">No results</h3>
    <SadFace height="200" width="200" />
  {/if}
</div>

<script context="module">
  import CategoryBanner from '$lib/components/category-banner.svelte'
  import Filters from '$lib/components/filters.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import { collectionsStore } from '$stores/collections'
  import { filtersStore } from '$stores/filters'
  import {
    fetchSearchResults,
    searchStore,
  } from '$stores/search-products'

  export const load = async ({ params }) => {
    const { slug } = params
    return { props: { slug } }
  }
</script>

<script>
  export let slug

  $: collections =
    $collectionsStore?.filter(item => item?.parent?.slug === slug) ||
    []

  $: fetchSearchResults({
    input: {
      collectionSlug: slug,
      term: '',
      groupByProduct: true,
      facetValueIds: $filtersStore,
      take: 24,
      skip: 0,
    },
  })

  $: products = $searchStore.items || {}
  $: facetValues = $searchStore.facetValues || {}
</script>

<CategoryBanner {collections} />

<div class="flex">
  {#if Object.entries(facetValues).length >= 1}
    <Filters {facetValues} />
  {/if}
  <div
    class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    {#if Object.entries(products).length >= 1}
      {#each products as item}
        <ProductCard {item} />
      {/each}
    {/if}
  </div>
</div>

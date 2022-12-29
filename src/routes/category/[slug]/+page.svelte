<script lang="ts">
  import type { PageData } from './$types'

  import { browser } from '$app/environment'
  import { GQL_GetCollections, GQL_SearchProducts } from '$houdini'
  import CategoryBanner from '$lib/components/category-banner.svelte'
  import Filters from '$lib/components/filters.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import { filtersStore } from '$stores/filters'

  export let data: PageData
  const { slug } = data

  $: browser && GQL_GetCollections.fetch()
  $: collections =
    $GQL_GetCollections.data?.collections?.items?.filter(
      item => item?.parent?.slug === slug
    ) ?? []

  $: browser &&
    GQL_SearchProducts.fetch({
      variables: {
        input: {
          collectionSlug: slug,
          groupByProduct: true,
          facetValueIds: $filtersStore,
          take: 24,
          skip: 0,
        },
      },
    })
  $: products = $GQL_SearchProducts?.data?.search?.items
  $: facetValues = $GQL_SearchProducts?.data?.search?.facetValues
</script>

<CategoryBanner {collections} />

<div class="flex">
  {#if Object.entries(facetValues ?? {}).length >= 1}
    <Filters {facetValues} />
  {/if}
  <div
    class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    {#if products?.length >= 1}
      {#each products as item}
        <ProductCard {item} />
      {/each}
    {/if}
  </div>
</div>

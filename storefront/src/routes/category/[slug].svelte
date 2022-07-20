<script lang="ts" context="module">
  import {
    GQL_GetCollections,
    GQL_GetCurrencyCode,
    GQL_SearchProducts,
  } from '$houdini'
  import CategoryBanner from '$lib/components/category-banner.svelte'
  import Filters from '$lib/components/filters.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import { filtersStore } from '$stores/filters'
  import { get } from 'svelte/store'
  import type { Load } from './__types/[slug]'

  export const load: Load = async event => {
    const { slug } = event.params

    await GQL_SearchProducts.fetch({
      event,
      variables: {
        input: {
          collectionSlug: slug,
          groupByProduct: true,
          facetValueIds: get(filtersStore),
          take: 24,
          skip: 0,
        },
      },
    })

    return { props: { slug } }
  }
</script>

<script lang="ts">
  export let slug: string

  $: currencyCode =
    $GQL_GetCurrencyCode?.data?.activeChannel?.currencyCode

  $: collections =
    $GQL_GetCollections.data?.collections?.items?.filter(
      item => item?.parent?.slug === slug
    ) ?? []

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
        <ProductCard {currencyCode} {item} />
      {/each}
    {/if}
  </div>
</div>

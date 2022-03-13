<script lang="ts" context="module">
  import CategoryBanner from '$lib/components/category-banner.svelte'
  import Filters from '$lib/components/filters.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import {
    KQL_GetCollections,
    KQL_GetCurrencyCode,
    KQL_SearchProducts,
  } from '$lib/graphql/_kitql/graphqlStores'
  import { filtersStore } from '$stores/filters'
  import type { LoadOutput } from '@sveltejs/kit/types/private'

  export const load = async ({
    params,
    fetch,
  }): Promise<LoadOutput> => {
    await KQL_GetCurrencyCode.query({ fetch })
    const { slug } = params
    await KQL_GetCollections.query({ fetch })
    await KQL_SearchProducts.query({
      fetch,
      variables: { input: { collectionSlug: slug } },
    })
    return { props: { slug } }
  }
</script>

<script lang="ts">
  export let slug
  let currencyCode =
    $KQL_GetCurrencyCode?.data?.activeChannel?.currencyCode

  $: collections =
    $KQL_GetCollections.data?.collections?.items?.filter(
      item => item?.parent?.slug === slug
    )

  $: products = $KQL_SearchProducts?.data?.search?.items
  $: facetValues = $KQL_SearchProducts?.data?.search?.facetValues

  $: {
    KQL_SearchProducts.query({
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
  }
</script>

<CategoryBanner {collections} />

<div class="flex">
  {#if Object.entries(facetValues).length >= 1}
    <Filters />
  {/if}
  <div
    class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    {#if Object.entries(products).length >= 1}
      {#each products as item}
        <ProductCard {item} {currencyCode} />
      {/each}
    {/if}
  </div>
</div>

<script lang="ts" context="module">
  import Filters from '$lib/components/filters.svelte'
  import SadFace from '$lib/components/icons/sad-face.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import {
    KQL_GetCurrencyCode,
    KQL_SearchProducts,
  } from '$lib/graphql/_kitql/graphqlStores'
  import { filtersStore } from '$stores/filters'
  import type { LoadOutput } from '@sveltejs/kit/types/internal'

  export const load = async ({
    params,
    fetch,
  }): Promise<LoadOutput> => {
    // KQL_SearchProducts.resetCache()
    await KQL_SearchProducts.query({
      fetch,
      variables: { input: {} },
      // settings: { policy: 'cache-and-network' },
    })
    const { searchTerm } = params
    await KQL_GetCurrencyCode.query({ fetch })
    return { props: { searchTerm } }
  }
</script>

<script lang="ts">
  export let searchTerm: string

  let currencyCode =
    $KQL_GetCurrencyCode?.data?.activeChannel?.currencyCode

  $: KQL_SearchProducts.query({
    variables: {
      input: {
        collectionSlug: '',
        term: searchTerm,
        groupByProduct: true,
        facetValueIds: $filtersStore,
        take: 24,
        skip: 0,
      },
    },
  })

  $: products = $KQL_SearchProducts?.data?.search?.items || []
  $: facetValues =
    $KQL_SearchProducts?.data?.search?.facetValues || []
</script>

<div class="flex">
  {#if Object.entries(products).length >= 1}
    <Filters {facetValues} />
    <div
      class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {#each products as item}
        <ProductCard {item} {currencyCode} />
      {/each}
    </div>
  {:else}
    <h3 class="text-5xl text-neutral mb-8">No results</h3>
    <SadFace height={200} width={200} />
  {/if}
</div>

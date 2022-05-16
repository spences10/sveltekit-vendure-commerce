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

  export const load = async ({ params, fetch }) => {
    const { slug } = params

    await KQL_GetCurrencyCode.queryLoad({ fetch });
    await KQL_SearchProducts.queryLoad({
      fetch,
      variables: { input: { collectionSlug: slug } },
    });
    
    return { props: { slug } }
  }
</script>

<script lang="ts">
  export let slug: string

  $: currencyCode = $KQL_GetCurrencyCode?.data?.activeChannel?.currencyCode

  $: collections =
    $KQL_GetCollections.data?.collections?.items?.filter(
      item => item?.parent?.slug === slug
    )

  $: products = $KQL_SearchProducts?.data?.search?.items
  $: facetValues = $KQL_SearchProducts?.data?.search?.facetValues
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

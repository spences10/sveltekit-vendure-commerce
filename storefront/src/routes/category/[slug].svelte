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
  import { KitQLInfo } from '@kitql/all-in'

  export const load = async ({ params, fetch }) => {
    await KQL_GetCurrencyCode.queryLoad({ fetch })
    const { slug } = params
    await KQL_GetCollections.queryLoad({ fetch })
    await KQL_SearchProducts.queryLoad({
      fetch,
      variables: { input: { collectionSlug: slug } },
    })
    return { props: { slug } }
  }

  let dev = import.meta.env.DEV
</script>

<script lang="ts">
  export let slug: string
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

{#if dev}
  <KitQLInfo store={KQL_SearchProducts} />
{/if}

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

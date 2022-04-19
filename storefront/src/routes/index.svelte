<script lang="ts" context="module">
  import CategoryBanner from '$lib/components/category-banner.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import {
    KQL_GetCollections,
    KQL_GetCurrencyCode,
    KQL_GetTopSellers,
  } from '$lib/graphql/_kitql/graphqlStores'

  export const load = async ({ fetch }) => {
    await KQL_GetTopSellers.queryLoad({ fetch })
    await KQL_GetCollections.queryLoad({ fetch })
    await KQL_GetCurrencyCode.queryLoad({ fetch })
    return {}
  }
</script>

<script lang="ts">
  let items = $KQL_GetTopSellers.data?.search?.items
  let currencyCode =
    $KQL_GetCurrencyCode?.data?.activeChannel?.currencyCode

  $: collections = $KQL_GetCollections.data?.collections.items.filter(
    item => item.parent.name === '__root_collection__'
  )
</script>

<CategoryBanner {collections} />

<h3 class="text-5xl text-neutral mb-8">Top Sellers</h3>

<div
  class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
  {#each items as item}
    <ProductCard {item} {currencyCode} />
  {/each}
</div>

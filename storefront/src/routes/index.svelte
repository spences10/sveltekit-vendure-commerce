<script lang="ts" context="module">
  import {
  GQL_GetCollections,
  GQL_GetCurrencyCode,
  GQL_GetTopSellers
  } from '$houdini'
  import CategoryBanner from '$lib/components/category-banner.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
</script>

<script lang="ts">
  $: items = $GQL_GetTopSellers.data?.search?.items ?? []
  let currencyCode =
    $GQL_GetCurrencyCode?.data?.activeChannel?.currencyCode

  $: collections = $GQL_GetCollections.data?.collections.items.filter(
    item => item.parent.name === '__root_collection__'
  ) ?? []
</script>

<CategoryBanner {collections} />

<h3 class="text-5xl text-neutral mb-8">Top Sellers</h3>

<div
  class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
  {#each items as item}
    <ProductCard {currencyCode} {item} />
  {/each}
</div>

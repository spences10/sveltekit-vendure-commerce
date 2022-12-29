<script lang="ts">
	import { browser } from '$app/environment'
  import { GQL_GetCollections } from '$houdini'
  import CategoryBanner from '$lib/components/category-banner.svelte'
  import ProductCard from '$lib/components/product-card.svelte'

  import type { PageData } from './$types'

  export let data: PageData

  $: ({ GetTopSellers } = data)

  $: browser && GQL_GetCollections.fetch()
  $: collections =
    $GQL_GetCollections.data?.collections.items.filter(
      item => item.parent.name === '__root_collection__'
    ) ?? []
</script>

<CategoryBanner {collections} />

<h3 class="text-5xl text-neutral mb-8">Top Sellers</h3>

<div
  class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
  {#each $GetTopSellers.data?.search?.items ?? [] as item}
    <ProductCard {item} />
  {/each}
</div>

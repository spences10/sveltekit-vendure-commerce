<script context="module">
  import CategoryBanner from '$lib/components/category-banner.svelte'
  import Filters from '$lib/components/filters.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import { client } from '$lib/graphql/graphql-client'
  import { SEARCH_PRODUCTS } from '$lib/graphql/queries'
  import { collectionsStore } from '$stores/collections'

  export const load = async ({ params }) => {
    const { slug } = params
    const variables = {
      input: { collectionSlug: slug, groupByProduct: true },
    }
    const {
      search: { items, totalItems, facetValues },
    } = await client.request(SEARCH_PRODUCTS, variables) // this needs to come from a store

    return {
      props: {
        slug,
        items,
        totalItems,
        facetValues,
      },
    }
  }
</script>

<script>
  export let slug
  export let items
  // export let totalItems
  export let facetValues

  $: collections =
    $collectionsStore.filter(item => item.parent.slug === slug) || []

  $: products = items
    .reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item] = item
      }
      acc[item.productId] = item
      return acc
    }, [])
    .filter(item => item !== null)

  $: productList = facetValues.filter(
    item => item.facetValue.facet.id > 1
  )
</script>

<CategoryBanner {collections} />

<div class="flex">
  <Filters {facetValues} />
  <div
    class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    {#each products as item}
      <ProductCard {item} />
    {/each}
  </div>
</div>

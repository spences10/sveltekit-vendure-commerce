<script context="module">
  import Filters from '$lib/components/filters.svelte'
  import SadFace from '$lib/components/icons/sad-face.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import { client } from '$lib/graphql/graphql-client'
  import { SEARCH_PRODUCTS } from '$lib/graphql/queries'

  export const load = async ({ params }) => {
    const { searchTerm } = params
    const variables = {
      input: { term: searchTerm, groupByProduct: true },
    }
    const {
      search: { items, totalItems, facetValues },
    } = await client.request(SEARCH_PRODUCTS, variables)

    return {
      props: {
        items,
        totalItems,
        facetValues,
      },
    }
  }
</script>

<script>
  export let items
  export let facetValues

  $: products = items
    .reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item] = item
      }
      acc[item.productId] = item
      return acc
    }, [])
    .filter(item => item !== null)
</script>

<div class="flex">
  {#if items.length > 0}
    <Filters {facetValues} />
    <div
      class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {#each products as item}
        <ProductCard {item} />
      {/each}
    </div>
  {:else}
    <h3 class="text-5xl text-neutral mb-8">No results</h3>
    <SadFace height="200" width="200" />
  {/if}
</div>

<script context="module">
  import CategoryBanner from '$lib/components/category-banner.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import { client } from '$lib/graphql/graphql-client'
  import { GET_TOP_SELLERS } from '$lib/graphql/queries'

  export const load = async ({ fetch }) => {
    const {
      search: { items },
    } = await client.request(GET_TOP_SELLERS)

    const res = await fetch(`/api/get-collections.json`)
    const allCollections = await res.json()

    return {
      props: {
        items,
        allCollections,
      },
    }
  }
</script>

<script>
  export let items
  export let allCollections

  $: collections = allCollections.filter(
    item => item.parent.name === '__root_collection__'
  )
</script>

<CategoryBanner {collections} />

<h3 class="text-5xl text-neutral mb-8">Top Sellers</h3>

<div
  class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
  {#each items as item}
    <ProductCard {item} />
  {/each}
</div>

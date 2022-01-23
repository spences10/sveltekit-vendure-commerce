<script context="module">
  import CategoryBanner from '$lib/components/category-banner.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import { client } from '$lib/graphql/graphql-client'
  import { SEARCH_PRODUCTS } from '$lib/graphql/queries'

  export const load = async ({ params, fetch }) => {
    const res = await fetch(`/api/get-collections.json`)
    const allCollections = await res.json()
    const { slug } = params
    const variables = { input: { collectionSlug: slug } }
    const {
      search: { items },
    } = await client.request(SEARCH_PRODUCTS, variables)

    return {
      props: {
        slug,
        allCollections,
        items,
      },
    }
  }
</script>

<script>
  export let slug
  export let allCollections
  export let items

  $: collections = allCollections.filter(
    item => item.parent.slug === slug
  )

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

<CategoryBanner {collections} />

<div
  class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
  {#each products as item}
    <ProductCard {item} />
  {/each}
</div>

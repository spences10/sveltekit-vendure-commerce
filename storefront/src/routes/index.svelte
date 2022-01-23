<script context="module">
  import CategoryBanner from '$lib/components/category-banner.svelte'
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
    <div>
      <div>
        <a href={`/product/${item.slug}`} class="">
          <img
            class="object-cover rounded-2xl"
            src={`${item.productAsset.preview}?w=200&h=200`}
            alt={item.productName}
          />
        </a>
      </div>
      <p>{item.productName}</p>
      <p>{item.priceWithTax.max}</p>
    </div>
  {/each}
</div>

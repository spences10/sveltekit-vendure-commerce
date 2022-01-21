<script context="module">
  import { client } from '$lib/graphql/graphql-client'
  import { GET_TOP_SELLERS } from '$lib/graphql/queries'

  export const load = async () => {
    const {
      search: { items },
    } = await client.request(GET_TOP_SELLERS)

    return {
      props: {
        items,
      },
    }
  }
</script>

<script>
  export let items
</script>

<div
  class="grid gap-10 md:grid-cols-4 md:px-10 lg:grid-cols-6 lg:-mx-52"
>
  {#each items as item}
    <img
      class=""
      src={item.productAsset.preview}
      alt={item.productName}
    />
    <p>{item.productName}</p>
    <p>{item.priceWithTax.max}</p>
  {/each}
</div>

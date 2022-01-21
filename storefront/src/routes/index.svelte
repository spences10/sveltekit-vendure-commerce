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
  class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
  {#each items as item}
    <div>
      <div>
        <a href={item.slug} class="">
          <img
            class="object-cover"
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

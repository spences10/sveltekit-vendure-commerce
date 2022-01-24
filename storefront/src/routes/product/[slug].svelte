<script context="module">
  import { client } from '$lib/graphql/graphql-client'
  import { GET_PRODUCT_DETAIL } from '$lib/graphql/queries'

  export const load = async ({ params, fetch }) => {
    const { slug } = params
    const variables = { slug }
    const { product } = await client.request(
      GET_PRODUCT_DETAIL,
      variables
    )

    return {
      props: {
        product,
      },
    }
  }
</script>

<script>
  export let product
</script>

<div class="flex ">
  <div class="basis-full">
    <img src={product.featuredAsset.preview} alt="" />
  </div>
  <div class="basis-full">
    <select
      class="select select-bordered select-primary w-full max-w-xs"
      name=""
      id=""
    >
      {#each product.variants as variant}
        <option value="">
          {variant.name}
        </option>
      {/each}
    </select>
    <div class='flex align-bottom'>
      <p class='inline-block h-50 bg-red-500 align-bottom'>Yo yo </p>
      <div class="relative block">
        <input
          type="number"
          min="0"
          max="99"
          placeholder="Search"
          class="w-full pr-16 input input-primary input-bordered"
        />
        <button
          class="absolute top-0 right-0 rounded-l-none btn btn-primary"
          >go</button
        >
      </div>
    </div>
  </div>
</div>

<pre>{JSON.stringify(product, null, 2)}</pre>

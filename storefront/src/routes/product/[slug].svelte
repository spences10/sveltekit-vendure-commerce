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

  let { breadcrumbs } =
    product.collections[product.collections.length - 1]
  let selected
</script>

<div class="my-5">
  {#each breadcrumbs as breadcrumb}
    {#if breadcrumb.slug === '__root_collection__'}
      <a class="link link-primary mr-2" href="/">Home</a>
    {:else}
      <span class="before:mr-2 before:content-['/']" />
      <a
        class="link link-primary mr-2"
        href={`/category/${breadcrumb.slug}`}
      >
        {breadcrumb.name}
      </a>
    {/if}
  {/each}
</div>

<div class="flex">
  <div class="basis-full">
    <img
      src={product.featuredAsset.preview}
      alt={product.featuredAsset.name}
    />
  </div>
  <div class="basis-full ml-8">
    <h2 class="text-5xl text-neutral mb-8">{product.name}</h2>
    {#if product.variants.length > 1}
      <select
        bind:value={selected}
        class="select select-bordered select-primary w-full max-w-xs mb-2"
        name=""
        id=""
      >
        {#each product.variants as variant}
          <option value={variant}>
            {variant.name}
          </option>
        {/each}
      </select>
    {/if}
    <div class="flex items-center justify-between my-4">
      <p class="inline-block align-bottom text-2xl text-neutral">
        {selected?.sku || product.variants[0].sku}
      </p>
      <div class="flex items-center">
        <p
          class="inline-block align-bottom text-2xl text-neutral mr-4"
        >
          {selected?.priceWithTax || product.variants[0].priceWithTax}
        </p>
        <div class="relative block">
          <input
            type="number"
            min="0"
            max="99"
            placeholder="1"
            class="input input-primary input-bordered"
          />
          <button
            class="absolute top-0 right-0 rounded-l-none btn btn-primary"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
    <div class="text-lg">
      {product.description}
    </div>
  </div>
</div>

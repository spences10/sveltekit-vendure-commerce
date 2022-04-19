<script lang="ts" context="module">
  import {
    KQL_AddToCart,
    KQL_GetCurrencyCode,
    KQL_GetProductDetail,
    KQL_GetActiveOrder,
  } from '$lib/graphql/_kitql/graphqlStores'
  import { formatCurrency } from '$lib/utils'

  export const load = async ({ params, fetch }) => {
    const { slug } = params
    const variables = { slug }
    await KQL_GetProductDetail.queryLoad({ fetch, variables })
    await KQL_GetCurrencyCode.queryLoad({ fetch })
    return {}
  }
</script>

<script lang="ts">

  import type { GetProductDetailQuery } from '$lib/graphql/_kitql/graphqlTypes';
  let product = $KQL_GetProductDetail?.data?.product
  let currencyCode =
    $KQL_GetCurrencyCode?.data?.activeChannel?.currencyCode
  let { breadcrumbs } = (product &&
    product.collections[product.collections.length - 1]) ?? {};
  let selected: GetProductDetailQuery['product']['variants'][number] = product?.variants?.[0] ?? {};
  let quantity = 1
  
  const addToCart = async () => {
    let variables = { productVariantId: selected.id, quantity }

    const result = await KQL_AddToCart.mutate({ fetch, variables });
    console.log('=====================')
    console.log(result)
    console.log('=====================')
    if (result.data.addItemToOrder.__typename === 'Order') {
      // Patch the activeOrder query with the updated Order object.
      KQL_GetActiveOrder.patch({activeOrder: result.data.addItemToOrder});
    } else {
      // An ErrorResult was returned, so we need to handle that properly,
      // e.g. display a toast notification
      console.log(result.data.addItemToOrder)
    }
  }
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
        {console.log(selected?.sku)}
      </p>
      <div class="flex items-center">
        <p
          class="inline-block align-bottom text-2xl text-neutral mr-4"
        >
          {formatCurrency(
            currencyCode,
            selected?.priceWithTax || product.variants[0].priceWithTax
          ) || 0}
        </p>
        <div>
          <input
            type="number"
            min="0"
            max="99"
            placeholder="1"
            class="input input-primary input-bordered caret-primary"
            bind:value={quantity}
          />
          <button
            on:click={addToCart}
            class="rounded-lg btn btn-primary"
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

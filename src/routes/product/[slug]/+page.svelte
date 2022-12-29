<script lang="ts">
  import { AddToCartStore, graphql } from '$houdini'
  import { formatCurrency } from '$lib/utils'

  import type { PageData } from './$houdini'

  export let data: PageData

  $: ({ GetProductDetail } = data)

  $: product = $GetProductDetail?.data?.product

  $: breadcrumbs =
    product &&
    product.collections &&
    product.collections[product.collections.length - 1].breadcrumbs

  let selected = product?.variants?.[0]
  let quantity = 1

  const gql_AddToCart: AddToCartStore = graphql`
    mutation AddToCart($productVariantId: ID!, $quantity: Int!) {
      addItemToOrder(
        productVariantId: $productVariantId
        quantity: $quantity
      ) {
        ... on Order {
          ...NavBarSummary
          ...CartInfo
        }
        ... on ErrorResult {
          errorCode
          message
        }
      }
    }
  `

  const addToCart = async () => {
    let id = !selected ? product.variants[0].id : selected.id

    await gql_AddToCart.mutate({ productVariantId: id, quantity })
  }
</script>

{#if product}
  <div class="my-5">
    <!-- TODO -->
    {#each breadcrumbs as breadcrumb}
      {#if breadcrumb.slug === '__root_collection__'}
        <a
          class="link link-primary mr-2"
          href="/">Home</a
        >
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
            {formatCurrency(
              selected?.priceWithTax ||
                product.variants[0].priceWithTax
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
{/if}

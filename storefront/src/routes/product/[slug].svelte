<script lang="ts" context="module">
  import {
    GQL_AddToCart,GQL_GetCurrencyCode,
    GQL_GetProductDetail,
    type Variant$data
  } from '$houdini'
  import { formatCurrency } from '$lib/utils'
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async event => {
    const { slug } = event.params
    const variables = { slug }

    await GQL_GetProductDetail.fetch({ event, variables })

    return {}
  }
</script>

<script lang="ts">
import { browser } from '$app/env';

  $: product = $GQL_GetProductDetail?.data?.product

  $: currencyCode =
    $GQL_GetCurrencyCode?.data?.activeChannel?.currencyCode

  $: breadcrumbs =
    product &&
    product.collections &&
    product.collections[product.collections.length - 1].breadcrumbs

  let selected: Variant$data = product?.variants?.[0]
  let quantity = 1

  const addToCart = async () => {
    let id = !selected ? product.variants[0].id : selected.id
    let variables = { productVariantId: id, quantity }

    await GQL_AddToCart.mutate({ variables })
  }
</script>

{#if product}
  <div class="my-5">
    <!-- TODO -->
    {#each breadcrumbs as breadcrumb}
      {#if breadcrumb.slug === '__root_collection__'}
        <a sveltekit:prefetch class="link link-primary mr-2" href="/"
          >Home</a
        >
      {:else}
        <span class="before:mr-2 before:content-['/']" />
        <a
          sveltekit:prefetch
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
              currencyCode,
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

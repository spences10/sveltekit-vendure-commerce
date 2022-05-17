<script lang="ts">
  import { browser } from '$app/env'
  import {
    KQL_AdjustOrder,
    KQL_GetActiveOrder,
    KQL_GetCurrencyCode,
  } from '$lib/graphql/_kitql/graphqlStores'
  import { clickOutside, formatCurrency } from '$lib/utils'
  import { cartOpen } from '$stores/cart'
  import { fly } from 'svelte/transition'
  import Minus from './icons/minus.svelte'
  import Plus from './icons/plus.svelte'

  export let key: string
  $: browser && key && KQL_GetActiveOrder.query()

  $: activeOrderLines =
    $KQL_GetActiveOrder?.data?.activeOrder?.lines || []
  $: totalWithTax =
    $KQL_GetActiveOrder?.data?.activeOrder?.totalWithTax || 0
  $: shippingWithTax =
    $KQL_GetActiveOrder?.data?.activeOrder?.shippingWithTax || 0
  $: cartTotal =
    $KQL_GetActiveOrder?.data?.activeOrder?.totalQuantity || 0
  $: currencyCode =
    $KQL_GetCurrencyCode?.data?.activeChannel?.currencyCode

  // KQL_RemoveFromCart.mutate({ variables: { orderLineId: '6' } })
  // KQL_AddToCart.mutate({
  //   variables: { productVariantId: '1', quantity: 1 },
  // })
  // KQL_AdjustOrder.mutate({
  //   variables: { orderLineId: '4', quantity: 1 },
  // })
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  const adjustOrder = async (value: number, id: string) => {
    // send mutation
    await KQL_AdjustOrder.mutate({
      variables: { orderLineId: id, quantity: value },
    })
    await KQL_GetActiveOrder.query({
      settings: { policy: 'network-only' },
    })
  }

  const handleClickOutside = () => {
    $cartOpen = !$cartOpen
  }
</script>

{#if $cartOpen}
  <section
    use:clickOutside
    on:click_outside={handleClickOutside}
    in:fly={{ x: 200, duration: 150 }}
    out:fly={{ x: 400, duration: 150 }}
    class="px-8 pt-4 top-0 right-0 fixed bg-base-100 shadow-xl h-full w-[30rem] z-40"
  >
    <div class="flex justify-between align-middle text-3xl">
      <button
        on:click={() => {
          $cartOpen = !$cartOpen
        }}
        class="block"
      >
        &#10799;
      </button>
      <p>Cart</p>
    </div>
    {#if !activeOrderLines.length}
      <p class="text-3xl text-center pt-8 text-base-300">
        Cart is empty
      </p>
    {:else}
      {#each activeOrderLines as item}
        <div class="my-6 flex">
          <div class="">
            <img
              src={`${item.featuredAsset.preview}?w=300&h=300`}
              alt={item.productVariant.name}
              class="object-cover rounded-lg h-16 w-16"
            />
          </div>
          <div class="flex flex-col flex-grow text-lg pl-3">
            <p class="text-xl pb-1">{item.productVariant.name}</p>
            <div class="flex align-center justify-between">
              <p>
                {formatCurrency(
                  currencyCode,
                  item.linePriceWithTax
                ) || 0}
              </p>
              <div>
                <button
                  on:click={() =>
                    adjustOrder(
                      item.quantity > 0 ? --item.quantity : 0,
                      item.id
                    )}
                  class="btn btn-xs btn-outline hover:btn-primary shadow-md"
                >
                  <Minus />
                </button>
                <span>{item.quantity}</span>
                <button
                  on:click={() =>
                    adjustOrder(++item.quantity, item.id)}
                  class="btn btn-xs btn-outline hover:btn-primary shadow-md"
                >
                  <Plus />
                </button>
              </div>
              <p>
                {formatCurrency(
                  currencyCode,
                  item.linePriceWithTax * item.quantity
                ) || 0}
              </p>
            </div>
          </div>
        </div>
      {/each}
      <span class="divider" />
      <div class="flex justify-between align-middle text-lg">
        <p>Shipping</p>
        <p>
          {formatCurrency(currencyCode, shippingWithTax) || 0}
        </p>
      </div>
      <span class="divider" />
      <div class="flex justify-between align-middle text-lg mb-10">
        <p class="text-xl">Total</p>
        <p>
          {formatCurrency(currencyCode, totalWithTax) || 0}
        </p>
      </div>
      <button class="btn btn-block">Checkout</button>
    {/if}
  </section>
{/if}

<!-- debug -->
<!-- <pre class="flex flex-col flex-grow">
  {JSON.stringify($KQL_GetActiveOrder.data, null, 2)}
</pre> -->

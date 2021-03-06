<script lang="ts">
  import { browser } from '$app/env'
  import {
  GQL_AdjustOrder,
  GQL_GetActiveOrder,
  GQL_GetCurrencyCode
  } from '$houdini'

  import { clickOutside,formatCurrency } from '$lib/utils'
  import { cartOpen } from '$stores/cart'
  import { fly } from 'svelte/transition'
  import Minus from './icons/minus.svelte'
  import Plus from './icons/plus.svelte'

  $: activeOrderLines =
    $GQL_GetActiveOrder?.data?.activeOrder?.lines || []
  $: totalWithTax =
    $GQL_GetActiveOrder?.data?.activeOrder?.totalWithTax || 0
  $: shippingWithTax =
    $GQL_GetActiveOrder?.data?.activeOrder?.shippingWithTax || 0
  $: currencyCode =
    $GQL_GetCurrencyCode?.data?.activeChannel?.currencyCode

  const adjustOrder = async (value: number, id: string) => {
    await GQL_AdjustOrder.mutate({
      variables: { orderLineId: id, quantity: value },
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
                  item.unitPriceWithTax
                ) || 0}
              </p>
              <div>
                <button
                  on:click={() =>
                    adjustOrder(
                      item.quantity > 0 ? item.quantity - 1 : 0,
                      item.id
                    )}
                  class="btn btn-xs btn-outline hover:btn-primary shadow-md"
                >
                  <Minus />
                </button>
                <span>{item.quantity}</span>
                <button
                  on:click={() =>
                    adjustOrder(item.quantity + 1, item.id)}
                  class="btn btn-xs btn-outline hover:btn-primary shadow-md"
                >
                  <Plus />
                </button>
              </div>
              <p>
                {formatCurrency(
                  currencyCode,
                  item.linePriceWithTax
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
  {JSON.stringify($GQL_GetActiveOrder.data, null, 2)}
</pre> -->

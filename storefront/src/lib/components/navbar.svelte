<script>
  import { browser } from '$app/env'

  import { GQL_GetActiveOrder, GQL_GetCollections } from '$houdini'
  import { cartOpen } from '$stores/cart'
  import ShoppingCart from './icons/shopping-cart.svelte'
  import Search from './search.svelte'

  $: collections =
    $GQL_GetCollections.data?.collections.items.filter(
      item => item?.parent?.name === '__root_collection__'
    ) || []
</script>

<nav
  class="navbar shadow-lg bg-neutral text-neutral-content sticky top-0 z-30"
>
  <div class="px-2 mx-2 navbar-start">
    <a href={`/`}>
      <img
        class="h-8"
        src="/cube-logo-line-icon-nostroke.png"
        alt="vendure logo"
      />
    </a>
    <div class="items-stretch hidden px-2 mx-2 lg:flex">
      {#each collections as collection}
        <a
          href={`/category/${collection.slug}`}
          class="btn btn-ghost btn-sm rounded-btn"
        >
          {collection.name}
        </a>
      {/each}
    </div>

    <div class="dropdown dropdown-right lg:hidden">
      <div tabindex="0" class="m-1 btn">Links</div>
      <ul
        tabindex="0"
        class="bg-neutral rounded-box shadow text-neutral-content p-2 w-52 menu dropdown-content"
      >
        {#each collections as collection}
          <a
            href={`/category/${collection.slug}`}
            class="btn btn-ghost btn-sm rounded-btn"
          >
            {collection.name}
          </a>
        {/each}
      </ul>
    </div>
  </div>

  <div class="hidden px-2 mx-2 navbar-center lg:flex" />
  <div class="navbar-end relative">
    <Search />
    <div class="relative flex justify-center items-center">
      <span
        class="absolute -right-1 -top-1 leading-[1.25rem] text-[70%] font-bold text-center bg-secondary text-secondary-content rounded-2xl h-5 w-7"
      >
        {$GQL_GetActiveOrder?.data?.activeOrder?.totalQuantity || 0}
      </span>
      <button
        on:click={() => {
          $cartOpen = !$cartOpen
        }}
        class="btn btn-square btn-ghost"
      >
        <ShoppingCart />
      </button>
    </div>
  </div>
</nav>

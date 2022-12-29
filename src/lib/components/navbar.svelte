<script lang="ts">
	import { browser } from '$app/environment'
  import VendureLogo from '$lib/images/cube-logo-line-icon-nostroke.png'
  import {
    GQL_GetCollections,
    graphql,
    NavBarStore,
    fragment,
    NavBarSummary,
  } from '$houdini'
  import { cartOpen } from '$stores/cart'
  import ShoppingCart from './icons/shopping-cart.svelte'
  import Search from './search.svelte'

  $: browser && GQL_GetCollections.fetch()
  $: collections =
    $GQL_GetCollections.data?.collections.items.filter(
      item => item?.parent?.name === '__root_collection__'
    ) || []

  // query directly in a component as it's relying on LocalStorage, we want to do it only in the browser
  const gql_NavBar: NavBarStore = graphql`
    query NavBar {
      activeOrder {
        ...NavBarSummary
      }
    }
  `
  // split with a fragment because we want to use it somewhere else as well
  let activeOrder: NavBarSummary
  $: activeOrder = $gql_NavBar.data?.activeOrder
  $: frag = fragment(
    activeOrder,
    graphql`
      fragment NavBarSummary on Order {
        id
        totalQuantity
      }
    `
  )
</script>

<nav
  class="navbar shadow-lg bg-neutral text-neutral-content sticky top-0 z-30"
>
  <div class="px-2 mx-2 navbar-start">
    <a href={`/`}>
      <img
        class="h-8"
        src={VendureLogo}
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
      <div  class="m-1 btn">Links</div>
      <ul
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
        {$frag?.totalQuantity || 0}
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

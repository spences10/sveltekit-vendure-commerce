<script>
  import { collectionsStore } from '../../stores/collections'

  const items = $collectionsStore

  const collections = items.filter(
    item => item.parent.name === '__root_collection__'
  )
</script>

<nav
  class="navbar shadow-lg bg-neutral text-neutral-content sticky top-0 z-10"
>
  <div class="px-2 mx-2 navbar-start">
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
  <div class="navbar-end">
    <button class="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-6 h-6 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </div>
</nav>

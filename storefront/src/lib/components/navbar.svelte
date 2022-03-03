<script>
  import Search from './search.svelte'

  export let collections = []
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
  </div>
</nav>

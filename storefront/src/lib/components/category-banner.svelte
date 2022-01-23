<script>
  export let collections
</script>

<aside
  class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-28"
>
  {#each collections as collection}
    <a href={`/category/${collection.slug}`}>
      <div class="card shadow-xl image-full">
        <figure>
          <img
            class='object-cover'
            src={`${collection.featuredAsset.preview}?w=200&h=110`}
            alt={collection.name}
          />
        </figure>
        <div class="justify-end card-body">
          <h2 class="text-xl lg:text-3xl font-bold tracking-widest">
            {collection.name}
          </h2>
        </div>
      </div>
    </a>
  {/each}
</aside>

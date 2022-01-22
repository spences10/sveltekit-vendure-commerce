<script>
  import { collectionsStore } from '../../stores/collections'

  const items = $collectionsStore

  const collections = items.filter(
    item => item.parent.name === '__root_collection__'
  )
</script>

<aside
  class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-12"
>
  {#each collections as collection}
    <a href={`/category/${collection.slug}`}>
      <div class="card shadow-xl image-full">
        <figure>
          <img
            src={collection.featuredAsset.preview}
            alt={collection.name}
          />
        </figure>
        <div class="justify-end card-body">
          <h2 class="text-3xl font-bold tracking-widest">
            {collection.name}
          </h2>
        </div>
      </div>
    </a>
  {/each}
</aside>

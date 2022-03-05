<script lang="ts" context="module">
  import { KQL_GetCollections } from '$lib/graphql/_kitql/graphqlStores'

  export const load = async ({ fetch }) => {
    await KQL_GetCollections.query({ fetch })
    return {}
  }
</script>

<script>
  export let key

  $: [parent] = $KQL_GetCollections.data?.collections?.items.filter(
    item => item.slug === key.substring(key.lastIndexOf(`/`) + 1)
  )
</script>

{#if key === '/'}
  <div
    class="hero min-h-[20vh] lg:min-h-[60vh] mb-10"
    style="background-image: url(/abel-y-costa-716024-unsplash__preview.jpg);"
  >
    <div class="hero-overlay bg-opacity-40" />
    <div class="text-center text-neutral-content relative">
      <h1 class="text-5xl lg:text-9xl font-bold tracking-widest">
        vendure storefront
      </h1>
    </div>
  </div>
{:else if key.includes(`/product/`)}
  <div />
{:else}
  <div
    class="hero min-h-[20vh] lg:min-h-[40vh] mb-10"
    style={`background-image: url(${
      parent
        ? parent.featuredAsset.preview
        : `/abel-y-costa-716024-unsplash__preview.jpg`
    });`}
  >
    <div class="hero-overlay bg-opacity-80" />
    <div class="text-center text-neutral-content relative">
      <h1 class="text-5xl lg:text-9xl font-bold tracking-widest">
        {parent ? parent.name : `vendure storefront`}
      </h1>
    </div>
  </div>
{/if}

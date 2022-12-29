<script lang="ts">
  import { GQL_GetCollections } from '$houdini'
  import HeroBackground from '$lib/images/abel-y-costa-716024-unsplash__preview.jpg'

  export let key: string

  $: [parent] = $GQL_GetCollections.data?.collections?.items.filter(
    item => item.slug === key.substring(key.lastIndexOf(`/`) + 1)
  ) ?? [null]
</script>

{#if key === '/'}
  <div
    class="hero min-h-[20vh] lg:min-h-[60vh] mb-10"
    style="background-image: url({HeroBackground});"
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
        : HeroBackground
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

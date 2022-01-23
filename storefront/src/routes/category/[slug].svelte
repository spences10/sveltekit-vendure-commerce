<script context="module">
  export const load = async ({ params, fetch }) => {
    const res = await fetch(`/api/get-collections.json`)
    const allCollections = await res.json()
    const { slug } = params

    return {
      props: {
        slug,
        allCollections,
      },
    }
  }
</script>

<script>
  import CategoryBanner from '$lib/components/category-banner.svelte'

  export let slug
  export let allCollections

  $: collections = allCollections.filter(
    item => item.parent.slug === slug
  )
</script>

<CategoryBanner {collections} />

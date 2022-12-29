<script lang="ts">
  import { formatCurrency } from '$lib/utils'

  import { fragment, graphql, type productCartDetail } from '$houdini'

  export let item: productCartDetail

  $: frag = fragment(
    item,
    graphql`
      fragment productCartDetail on SearchResult {
        slug
        productAsset {
          preview
        }
        productName
        priceWithTax {
          ... on PriceRange {
            max
          }
        }
      }
    `
  )
</script>

<section>
  <a
    href={`/product/${$frag?.slug}`}
    class=""
  >
    <img
      class="object-cover rounded-2xl"
      src={`${$frag?.productAsset.preview}?w=200&h=200`}
      alt={$frag?.productName}
    />
  </a>
  <p class="xl:text-center">{$frag?.productName}</p>
  <p class="xl:text-center text-primary">
    {formatCurrency($frag?.priceWithTax.max) || 0}
  </p>
</section>

<script>
  import { formatCurrency } from '$lib/utils'

  export let currencyCode
  export let item
</script>

<section>
  <a sveltekit:prefetch href={`/product/${item.slug}`} class="">
    <!-- <img
      class="object-cover rounded-2xl"
      src={`${item.productAsset.preview}?w=200&h=200`}
      alt={item.productName}
    /> -->
    img
  </a>
  <p class="xl:text-center">{item.productName}</p>
  <p class="xl:text-center text-primary">
    {formatCurrency(currencyCode, item.priceWithTax.max) || 0}
  </p>
</section>

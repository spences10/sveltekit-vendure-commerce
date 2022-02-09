<script>
  import { GetLocaleCurrency } from '$lib/utils'
  import { userLocale } from '$stores/locale'

  export let item
</script>

<section>
  <a href={`/product/${item.slug}`} class="">
    <img
      class="object-cover rounded-2xl"
      src={`${item.productAsset.preview}?w=200&h=200`}
      alt={item.productName}
    />
  </a>
  <p class="xl:text-center">{item.productName}</p>
  <p class="xl:text-center text-primary">
    {GetLocaleCurrency($userLocale, item.priceWithTax.max) || 0}
  </p>
</section>

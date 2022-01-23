<script>
  export let item
</script>

<div>
  <div>
    <a href={`/product/${item.slug}`} class="">
      <img
        class="object-cover rounded-2xl"
        src={`${item.productAsset.preview}?w=200&h=200`}
        alt={item.productName}
      />
    </a>
  </div>
  <p>{item.productName}</p>
  <p>{item.priceWithTax.max}</p>
</div>

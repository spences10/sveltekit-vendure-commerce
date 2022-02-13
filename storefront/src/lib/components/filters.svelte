<script>
  import { filtersStore } from '$stores/filters'

  export let facetValues

  let values = []
  $: filtersStore.set(values)

  // Thanks Michael https://github.com/vendure-ecommerce/storefront/blob/8848e9e0540c12e0eb964a90ca8accabccb4fbfa/src/app/core/components/product-list-controls/product-list-controls.component.ts#L68
  const facetMap = new Map()
  for (const {
    count,
    facetValue: { id, name, facet },
  } of facetValues) {
    const facetFromMap = facetMap.get(facet.id)
    if (facetFromMap) {
      facetFromMap.values.push({ id, name, count })
    } else {
      facetMap.set(facet.id, {
        id: facet.id,
        name: facet.name,
        values: [{ id, name, count }],
      })
    }
  }

  let facetValuesGrouped = Array.from(facetMap.values())
</script>

<div class="p-2 mr-6 w-1/5 h-full bordered card">
  <div class="form-control">
    {#each facetValuesGrouped as item}
      <p class="capitalize font-medium pl-1">{item.name}</p>
      {#each item.values as item}
        {@const name =
          [
            `Electronics`,
            `Home & Garden`,
            `Sports & Outdoor`, // TODO: make this dynamic
          ].indexOf(item.name) > -1
            ? ``
            : item.name}
        {#if name.length > 0}
          <label class="cursor-pointer label py-1">
            <span class="label-text">{item.name}</span>
            <input
              bind:group={values}
              value={item.id}
              type="checkbox"
              checked=""
              class="checkbox checkbox-sm checkbox-primary"
            />
          </label>
        {/if}
      {/each}
    {/each}
  </div>
</div>

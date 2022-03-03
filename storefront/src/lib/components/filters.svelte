<script lang="ts" context="module">
  import { KQL_SearchProducts } from '$lib/graphql/_kitql/graphqlStores'
  import { filtersStore } from '../../stores/filters'

  export const load = async ({ fetch }) => {
    await KQL_SearchProducts.query({ fetch })
    return {}
  }
</script>

<script lang="ts">
  $: facetValues = $KQL_SearchProducts?.data?.search?.facetValues

  let filterValues = []
  $: filtersStore.set(filterValues)

  $: groupFacetValues = facetValues => {
    const facetMap = new Map()

    for (const {
      count,
      facetValue: { id, name, facet },
    } of facetValues) {
      const facetFromMap = facetMap[facet.id]
      if (facetFromMap) {
        facetFromMap.values = [
          ...facetFromMap.values,
          { id, name, count },
        ]
      } else {
        facetMap[facet.id] = {
          id: facet.id,
          name: facet.name,
          values: [{ id, name, count }],
        }
      }
    }

    return Object.values(facetMap)
  }

  $: facetValuesGrouped = groupFacetValues(facetValues)
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
              bind:group={filterValues}
              value={item.id}
              type="checkbox"
              checked
              class="checkbox checkbox-sm checkbox-primary"
            />
          </label>
        {/if}
      {/each}
    {/each}
  </div>
</div>

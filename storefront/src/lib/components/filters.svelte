<script lang="ts" context="module">
  import { KQL_SearchProducts } from '$lib/graphql/_kitql/graphqlStores'
  import { filtersStore } from '../../stores/filters'

  export const load = async ({ fetch }) => {
    await KQL_SearchProducts.queryLoad({ fetch })
    return {}
  }
</script>

<script lang="ts">
  export let facetValues: {
    __typename?: 'FacetValueResult'
    count: number
    facetValue: {
      __typename?: 'FacetValue'
      id: string
      name: string
      facet: { __typename?: 'Facet'; id: string; name: string }
    }
  }[]
  let filterValues = []

  $: facetValues = $KQL_SearchProducts?.data?.search?.facetValues

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
    {#each facetValuesGrouped as { values, name }}
      <p class="capitalize font-medium pl-1">{name}</p>
      {#each values as valueItem}
        {@const name =
          [
            `Electronics`,
            `Home & Garden`,
            `Sports & Outdoor`, // TODO: make this dynamic
          ].indexOf(valueItem.name) > -1
            ? ``
            : valueItem.name}
        {#if name.length > 0}
          <label class="cursor-pointer label py-1">
            <span class="label-text">{valueItem.name}</span>
            <input
              bind:group={filterValues}
              value={valueItem.id}
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

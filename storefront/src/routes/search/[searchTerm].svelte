<script lang="ts" context="module">
  import Filters from '$lib/components/filters.svelte'
  import SadFace from '$lib/components/icons/sad-face.svelte'
  import {
    KQL_GetCurrencyCode,
    KQL_SearchProducts,
  } from '$lib/graphql/_kitql/graphqlStores'
  import { formatCurrency } from '$lib/utils'
  import { filtersStore } from '$stores/filters'

  export const load = async ({ params, fetch }) => {
    // KQL_SearchProducts.resetCache()
    await KQL_SearchProducts.queryLoad({
      fetch,
      variables: { input: {} },
      // settings: { policy: 'cache-and-network' },
    })
    const { searchTerm } = params
    await KQL_GetCurrencyCode.queryLoad({ fetch })
    return { props: { searchTerm } }
  }
</script>

<script lang="ts">
  export let searchTerm: string

  let currencyCode =
    $KQL_GetCurrencyCode?.data?.activeChannel?.currencyCode

  $: KQL_SearchProducts.query({
    variables: {
      input: {
        collectionSlug: '',
        term: searchTerm,
        groupByProduct: true,
        facetValueIds: $filtersStore,
        take: 24,
        skip: 0,
      },
    },
  })

  $: products = $KQL_SearchProducts?.data?.search?.items || []
  $: facetValues =
    $KQL_SearchProducts?.data?.search?.facetValues || []
</script>

<div class="flex">
  {#if Object.entries(products).length >= 1}
    <Filters {facetValues} />
    <div
      class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {#each products as item}
        <!-- TODO: This for some reason can't be a ProductCard component -->
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
            {formatCurrency(currencyCode, item.priceWithTax.max) || 0}
          </p>
        </section>
      {/each}
    </div>
  {:else}
    <h3 class="text-5xl text-neutral mb-8">No results</h3>
    <SadFace height={200} width={200} />
  {/if}
</div>

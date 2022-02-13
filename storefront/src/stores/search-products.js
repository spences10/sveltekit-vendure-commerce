import { client } from '$lib/graphql/graphql-client'
import { SEARCH_PRODUCTS } from '$lib/graphql/queries'
import { writable } from 'svelte/store'

export const searchStore = writable({})

export const fetchSearchResults = async variables => {
  const {
    search: { items, totalItems, facetValues },
  } = await client.request(SEARCH_PRODUCTS, variables)

  return searchStore.set({ items, totalItems, facetValues })
}

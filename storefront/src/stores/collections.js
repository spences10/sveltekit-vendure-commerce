import { client } from '$lib/graphql/graphql-client'
import { GET_COLLECTIONS } from '$lib/graphql/queries'
import { writable } from 'svelte/store'

export const collectionsStore = writable({})

const fetchCollections = async () => {
  const {
    collections: { items },
  } = await client.request(GET_COLLECTIONS)

  return items
}

collectionsStore.set(await fetchCollections())

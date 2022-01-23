import { client } from '$lib/graphql/graphql-client'
import { GET_COLLECTIONS } from '$lib/graphql/queries'

export const get = async () => {
  try {
    const {
      collections: { items },
    } = await client.request(GET_COLLECTIONS)
    return {
      status: 200,
      body: items,
    }
  } catch (error) {
    return {
      status: 500,
      body: { error: error.message },
    }
  }
}

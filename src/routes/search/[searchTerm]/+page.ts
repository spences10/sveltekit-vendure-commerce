import type { PageLoad } from './$types'

export const load: PageLoad = async event => {
  // await GQL_SearchProducts.fetch({
  //   event,
  //   variables: { input: {} },
  // })
  const { searchTerm } = event.params

  return { searchTerm }
}

import type { PageLoad } from './$types'

export const load: PageLoad = async event => {
  const { slug } = event.params

  return { slug }
}

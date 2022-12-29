import {
  load_GetCollections,
  load_LayoutQuery,
  load_GetTopSellers,
} from '$houdini'
import '../app.css'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async event => {
  return {
    key: event.url.pathname,
    ...(await load_GetTopSellers({ event })),
    ...(await load_LayoutQuery({ event })),
    ...(await load_GetCollections({ event })),
  }
}

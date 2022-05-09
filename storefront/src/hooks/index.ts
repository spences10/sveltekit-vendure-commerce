import type { Handle } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit/types/private'
import cookie from 'cookie'
import { v4 as uuidv4 } from 'uuid'

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(
    event.request.headers.get('cookie') || ''
  )
  event.locals.kitqlCartId = cookies.kitqlCartId || uuidv4()

  const response = await resolve(event)

  if (!cookies.kitqlCartId) {
    // if this is the first time the user has visited this app,
    // set a cookie so that we recognise them when they return
    response.headers.set(
      'set-cookie',
      cookie.serialize('kitqlCartId', event.locals.kitqlCartId, {
        path: '/',
        httpOnly: true,
      })
    )
  }

  return response
}

export function getSession(event: RequestEvent) {
  // Give all locals to the session
  return event.locals
}

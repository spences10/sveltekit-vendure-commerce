import type { Handle, RequestEvent } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)
  return response
}

export function getSession(event: RequestEvent) {
  // Give all locals to the session
  return event.locals
}

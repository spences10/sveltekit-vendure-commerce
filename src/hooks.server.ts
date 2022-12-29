import { dev } from '$app/environment'
import { handleGraphiql } from '@kitql/all-in'
import { sequence } from '@sveltejs/kit/hooks'

export const handle = sequence(
  // Add graphiql
  handleGraphiql({
    endpoint: 'https://readonlydemo.vendure.io/shop-api',
    enabled: dev,
  })
)

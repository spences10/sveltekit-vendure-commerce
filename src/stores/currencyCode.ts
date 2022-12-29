import { writable } from 'svelte/store'

export const currencyCode = writable<string | null>(null)

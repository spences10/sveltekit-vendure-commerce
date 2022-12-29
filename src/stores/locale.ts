import { writable } from 'svelte/store'

export const userLocale = writable<string | null>(null)

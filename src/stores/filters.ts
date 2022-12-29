import { writable } from 'svelte/store'

export const filtersStore = writable<any[]>([])

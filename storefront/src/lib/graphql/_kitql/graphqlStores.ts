import { browser } from '$app/env'
import * as Types from '$lib/graphql/_kitql/graphqlTypes'
import {
  defaultStoreValue,
  RequestStatus,
  type RequestParameters,
  type RequestResult,
} from '@kitql/client'
import { get, writable } from 'svelte/store'
import { kitQLClient } from '../kitQLClient'

function KQL_GetCollectionsStore() {
  // prettier-ignore
  const { subscribe, set, update } = writable<RequestResult<Types.GetCollectionsQuery, Types.GetCollectionsQueryVariables>>(defaultStoreValue);

  const cacheKey = 'KQL_GetCollections'

  return {
    subscribe,
    /**
     * For SSR, you need to provide 'fetch' from the load function
     * @returns the latest operation and fill this store
     */
    query: async (
      params?: RequestParameters<Types.GetCollectionsQueryVariables>
    ): Promise<
      RequestResult<
        Types.GetCollectionsQuery,
        Types.GetCollectionsQueryVariables
      >
    > => {
      let { fetch, variables, settings } = params ?? {}
      let { cache, policy } = settings ?? {}

      const storedVariables = get(KQL_GetCollections).variables
      variables = variables ?? storedVariables
      policy = policy ?? kitQLClient.defaultPolicy

      // Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
      if (browser) {
        if (policy !== 'network-only') {
          // prettier-ignore
          const cachedData = kitQLClient.requestCache<Types.GetCollectionsQuery, Types.GetCollectionsQueryVariables>({
						variables, cacheKey, cache,	browser
					});
          if (cachedData) {
            const result = {
              ...cachedData,
              isFetching: false,
              status: RequestStatus.DONE,
            }
            if (policy === 'cache-first') {
              set(result)
              if (!result.isOutdated) {
                return result
              }
            } else if (policy === 'cache-only') {
              set(result)
              return result
            } else if (policy === 'cache-and-network') {
              set(result)
            }
          }
        }
      }
      update(c => {
        return {
          ...c,
          isFetching: true,
          status: RequestStatus.LOADING,
        }
      })

      // prettier-ignore
      const res = await kitQLClient.request<Types.GetCollectionsQuery, Types.GetCollectionsQueryVariables>({
				skFetch: fetch,
				document: Types.GetCollectionsDocument,
				variables, 
				cacheKey, 
				browser
			});
      const result = {
        ...res,
        isFetching: false,
        status: RequestStatus.DONE,
        variables,
      }
      set(result)
      return result
    },
    /**
     * Reset Cache
     */
    resetCache(
      variables: Types.GetCollectionsQueryVariables | null = null,
      allOperationKey: boolean = true,
      withResetStore: boolean = true
    ) {
      kitQLClient.cacheRemove(cacheKey, {
        variables,
        allOperationKey,
      })
      if (withResetStore) {
        set(defaultStoreValue)
      }
    },
    /**
     * Patch the store with a new object at the dedicated xPath location
     */
    patch(newData: Object, xPath: string | null = null) {
      // prettier-ignore
      const updatedStore = kitQLClient.patch<Types.GetCollectionsQuery, Types.GetCollectionsQueryVariables>(cacheKey, get(KQL_GetCollections), newData, xPath);
      set(updatedStore)
      return updatedStore
    },
  }
}
/**
 * KitQL Svelte Store with the latest `GetCollections` Operation
 */
export const KQL_GetCollections = KQL_GetCollectionsStore()

function KQL_GetProductDetailStore() {
  // prettier-ignore
  const { subscribe, set, update } = writable<RequestResult<Types.GetProductDetailQuery, Types.GetProductDetailQueryVariables>>(defaultStoreValue);

  const cacheKey = 'KQL_GetProductDetail'

  return {
    subscribe,
    /**
     * For SSR, you need to provide 'fetch' from the load function
     * @returns the latest operation and fill this store
     */
    query: async (
      params?: RequestParameters<Types.GetProductDetailQueryVariables>
    ): Promise<
      RequestResult<
        Types.GetProductDetailQuery,
        Types.GetProductDetailQueryVariables
      >
    > => {
      let { fetch, variables, settings } = params ?? {}
      let { cache, policy } = settings ?? {}

      const storedVariables = get(KQL_GetProductDetail).variables
      variables = variables ?? storedVariables
      policy = policy ?? kitQLClient.defaultPolicy

      // Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
      if (browser) {
        if (policy !== 'network-only') {
          // prettier-ignore
          const cachedData = kitQLClient.requestCache<Types.GetProductDetailQuery, Types.GetProductDetailQueryVariables>({
						variables, cacheKey, cache,	browser
					});
          if (cachedData) {
            const result = {
              ...cachedData,
              isFetching: false,
              status: RequestStatus.DONE,
            }
            if (policy === 'cache-first') {
              set(result)
              if (!result.isOutdated) {
                return result
              }
            } else if (policy === 'cache-only') {
              set(result)
              return result
            } else if (policy === 'cache-and-network') {
              set(result)
            }
          }
        }
      }
      update(c => {
        return {
          ...c,
          isFetching: true,
          status: RequestStatus.LOADING,
        }
      })

      // prettier-ignore
      const res = await kitQLClient.request<Types.GetProductDetailQuery, Types.GetProductDetailQueryVariables>({
				skFetch: fetch,
				document: Types.GetProductDetailDocument,
				variables, 
				cacheKey, 
				browser
			});
      const result = {
        ...res,
        isFetching: false,
        status: RequestStatus.DONE,
        variables,
      }
      set(result)
      return result
    },
    /**
     * Reset Cache
     */
    resetCache(
      variables: Types.GetProductDetailQueryVariables | null = null,
      allOperationKey: boolean = true,
      withResetStore: boolean = true
    ) {
      kitQLClient.cacheRemove(cacheKey, {
        variables,
        allOperationKey,
      })
      if (withResetStore) {
        set(defaultStoreValue)
      }
    },
    /**
     * Patch the store with a new object at the dedicated xPath location
     */
    patch(newData: Object, xPath: string | null = null) {
      // prettier-ignore
      const updatedStore = kitQLClient.patch<Types.GetProductDetailQuery, Types.GetProductDetailQueryVariables>(cacheKey, get(KQL_GetProductDetail), newData, xPath);
      set(updatedStore)
      return updatedStore
    },
  }
}
/**
 * KitQL Svelte Store with the latest `GetProductDetail` Operation
 */
export const KQL_GetProductDetail = KQL_GetProductDetailStore()

function KQL_GetTopSellersStore() {
  // prettier-ignore
  const { subscribe, set, update } = writable<RequestResult<Types.GetTopSellersQuery, Types.GetTopSellersQueryVariables>>(defaultStoreValue);

  const cacheKey = 'KQL_GetTopSellers'

  return {
    subscribe,
    /**
     * For SSR, you need to provide 'fetch' from the load function
     * @returns the latest operation and fill this store
     */
    query: async (
      params?: RequestParameters<Types.GetTopSellersQueryVariables>
    ): Promise<
      RequestResult<
        Types.GetTopSellersQuery,
        Types.GetTopSellersQueryVariables
      >
    > => {
      let { fetch, variables, settings } = params ?? {}
      let { cache, policy } = settings ?? {}

      const storedVariables = get(KQL_GetTopSellers).variables
      variables = variables ?? storedVariables
      policy = policy ?? kitQLClient.defaultPolicy

      // Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
      if (browser) {
        if (policy !== 'network-only') {
          // prettier-ignore
          const cachedData = kitQLClient.requestCache<Types.GetTopSellersQuery, Types.GetTopSellersQueryVariables>({
						variables, cacheKey, cache,	browser
					});
          if (cachedData) {
            const result = {
              ...cachedData,
              isFetching: false,
              status: RequestStatus.DONE,
            }
            if (policy === 'cache-first') {
              set(result)
              if (!result.isOutdated) {
                return result
              }
            } else if (policy === 'cache-only') {
              set(result)
              return result
            } else if (policy === 'cache-and-network') {
              set(result)
            }
          }
        }
      }
      update(c => {
        return {
          ...c,
          isFetching: true,
          status: RequestStatus.LOADING,
        }
      })

      // prettier-ignore
      const res = await kitQLClient.request<Types.GetTopSellersQuery, Types.GetTopSellersQueryVariables>({
				skFetch: fetch,
				document: Types.GetTopSellersDocument,
				variables, 
				cacheKey, 
				browser
			});
      const result = {
        ...res,
        isFetching: false,
        status: RequestStatus.DONE,
        variables,
      }
      set(result)
      return result
    },
    /**
     * Reset Cache
     */
    resetCache(
      variables: Types.GetTopSellersQueryVariables | null = null,
      allOperationKey: boolean = true,
      withResetStore: boolean = true
    ) {
      kitQLClient.cacheRemove(cacheKey, {
        variables,
        allOperationKey,
      })
      if (withResetStore) {
        set(defaultStoreValue)
      }
    },
    /**
     * Patch the store with a new object at the dedicated xPath location
     */
    patch(newData: Object, xPath: string | null = null) {
      // prettier-ignore
      const updatedStore = kitQLClient.patch<Types.GetTopSellersQuery, Types.GetTopSellersQueryVariables>(cacheKey, get(KQL_GetTopSellers), newData, xPath);
      set(updatedStore)
      return updatedStore
    },
  }
}
/**
 * KitQL Svelte Store with the latest `GetTopSellers` Operation
 */
export const KQL_GetTopSellers = KQL_GetTopSellersStore()

function KQL_SearchProductsStore() {
  // prettier-ignore
  const { subscribe, set, update } = writable<RequestResult<Types.SearchProductsQuery, Types.SearchProductsQueryVariables>>(defaultStoreValue);

  const cacheKey = 'KQL_SearchProducts'

  return {
    subscribe,
    /**
     * For SSR, you need to provide 'fetch' from the load function
     * @returns the latest operation and fill this store
     */
    query: async (
      params?: RequestParameters<Types.SearchProductsQueryVariables>
    ): Promise<
      RequestResult<
        Types.SearchProductsQuery,
        Types.SearchProductsQueryVariables
      >
    > => {
      let { fetch, variables, settings } = params ?? {}
      let { cache, policy } = settings ?? {}

      const storedVariables = get(KQL_SearchProducts).variables
      variables = variables ?? storedVariables
      policy = policy ?? kitQLClient.defaultPolicy

      // Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
      if (browser) {
        if (policy !== 'network-only') {
          // prettier-ignore
          const cachedData = kitQLClient.requestCache<Types.SearchProductsQuery, Types.SearchProductsQueryVariables>({
						variables, cacheKey, cache,	browser
					});
          if (cachedData) {
            const result = {
              ...cachedData,
              isFetching: false,
              status: RequestStatus.DONE,
            }
            if (policy === 'cache-first') {
              set(result)
              if (!result.isOutdated) {
                return result
              }
            } else if (policy === 'cache-only') {
              set(result)
              return result
            } else if (policy === 'cache-and-network') {
              set(result)
            }
          }
        }
      }
      update(c => {
        return {
          ...c,
          isFetching: true,
          status: RequestStatus.LOADING,
        }
      })

      // prettier-ignore
      const res = await kitQLClient.request<Types.SearchProductsQuery, Types.SearchProductsQueryVariables>({
				skFetch: fetch,
				document: Types.SearchProductsDocument,
				variables, 
				cacheKey, 
				browser
			});
      const result = {
        ...res,
        isFetching: false,
        status: RequestStatus.DONE,
        variables,
      }
      set(result)
      return result
    },
    /**
     * Reset Cache
     */
    resetCache(
      variables: Types.SearchProductsQueryVariables | null = null,
      allOperationKey: boolean = true,
      withResetStore: boolean = true
    ) {
      kitQLClient.cacheRemove(cacheKey, {
        variables,
        allOperationKey,
      })
      if (withResetStore) {
        set(defaultStoreValue)
      }
    },
    /**
     * Patch the store with a new object at the dedicated xPath location
     */
    patch(newData: Object, xPath: string | null = null) {
      // prettier-ignore
      const updatedStore = kitQLClient.patch<Types.SearchProductsQuery, Types.SearchProductsQueryVariables>(cacheKey, get(KQL_SearchProducts), newData, xPath);
      set(updatedStore)
      return updatedStore
    },
  }
}
/**
 * KitQL Svelte Store with the latest `SearchProducts` Operation
 */
export const KQL_SearchProducts = KQL_SearchProductsStore()

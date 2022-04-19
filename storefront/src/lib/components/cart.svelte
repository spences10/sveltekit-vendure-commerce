<script context="module">
  import { KQL_GetActiveOrder } from '$lib/graphql/_kitql/graphqlStores'

  export const load = async ({ fetch }) => {
    await KQL_GetActiveOrder.queryLoad({ fetch })
    return {}
  }
</script>

<pre>
  {JSON.stringify($KQL_GetActiveOrder.data?.activeOrder, null, 2)}
</pre>

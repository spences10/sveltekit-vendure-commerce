<script context="module">
  import { KQL_ActiveOrder } from '$lib/graphql/_kitql/graphqlStores'

  export const load = async ({ fetch }) => {
    await KQL_ActiveOrder.queryLoad({ fetch })
    return {}
  }
</script>


<pre>{JSON.stringify($KQL_ActiveOrder.data?.activeOrder, null, 2)}</pre>
<script lang="ts" context="module">
  import { KQL_GetActiveOrder } from '$lib/graphql/_kitql/graphqlStores'

  // export const load = async ({ fetch }) => {
  //   await KQL_GetActiveOrder.queryLoad({ fetch })
  //   return {}
  // }
</script>

<script lang="ts">
  import { browser } from '$app/env';
  $: browser && KQL_GetActiveOrder.query();
</script>
<pre>
  {JSON.stringify($KQL_GetActiveOrder.data, null, 2)}
</pre>

<script>
  import { goto } from '$app/navigation'
  import { expand } from '$lib/utils'

  let searchTerm = ''

  const submitSearchTerm = () => {
    goto(`/search/${searchTerm}`)
  }
</script>

<form
  class="form-control"
  on:submit|preventDefault={submitSearchTerm}
>
  <label class="sr-only" for="search_product">Search</label>
  <div class="relative">
    <input
      transition:expand={{ delay: 500, duration: 700 }}
      class="h-auto input input-primary input-bordered bg-base-200 text-base-content caret-primary"
      placeholder="Search"
      name="search_product"
      bind:value={searchTerm}
      type="text"
    />
  </div>
</form>

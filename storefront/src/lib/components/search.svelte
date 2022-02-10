<script>
  import { goto } from '$app/navigation'
  import { cubicOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import MagnifyingGlass from './icons/magnifying-glass.svelte'

  let searchTerm = ''

  const submitSearchTerm = () => {
    goto(`/search/${searchTerm}`)
  }

  const progress = tweened(0, {
    duration: 200,
    easing: cubicOut,
  })
</script>

<form
  style="transform: scaleX({$progress}); transform-origin: 100% 100%;"
  class="form-control"
  on:submit|preventDefault={submitSearchTerm}
>
  <label class="sr-only" for="search_product">Search</label>
  <div class="relative">
    <input
      class="h-auto input input-primary input-bordered bg-base-200 text-base-content caret-primary"
      placeholder="Search"
      name="search_product"
      bind:value={searchTerm}
      type="text"
    />
  </div>
</form>

<button
  on:click={() => {
    $progress === 1 ? progress.set(0) : progress.set(1)
  }}
  class="btn btn-square btn-ghost"
>
  <MagnifyingGlass />
</button>

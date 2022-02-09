<script>
  export let facetValues

  let values = []
  $: console.log(values)
</script>

<div class="p-2 mr-6 w-1/5 h-full bordered card">
  <div class="form-control">
    {#each facetValues as item}
      <label class="cursor-pointer label py-1">
        <span class="label-text">{item.facetValue.name}</span>
        <input
          bind:group={values}
          value={item.facetValue.id}
          type="checkbox"
          checked=""
          class="checkbox checkbox-sm checkbox-primary"
        />
      </label>
    {/each}
  </div>
</div>

<script>
  import { onMount } from 'svelte';
  import Item from '../components/Item.svelte';
  import { paginate, LightPaginationNav } from 'svelte-paginate';
    let items = [];
    let currentPage = 1;
    let pageSize = 5;

  onMount(async () => {
    const response = await fetch('http://localhost:3000/api/items');
    const { data: itemsArray } = await response.json();
    items = itemsArray;
    
  });
  $: paginatedItems = paginate({ items, pageSize, currentPage });
</script>

<div class="row">
  <div class="column">
    <div class="row_filter">
      <p class="filters">FILTERS</p>
    </div>
  </div>
  <div class="column">
    <div class="row_paginator">
      <LightPaginationNav
        totalItems={items.length}
        {pageSize}
        {currentPage}
        limit={1}
        showStepOptions={true}
        on:setPage={(e) => (currentPage = e.detail.page)}
      />
    </div>
    {#each paginatedItems as item}
      <Item {...item} />
    {/each}
  </div>
</div>

<style>
  .column {
    float: left;
  }
  .paginator {
    width: 300px;
    background-color: #c4c4c4;
  }
  .column:nth-child(1) {
    width: 200px;
    height: calc(100vh - 168px);
    background-color: #c4c4c4;
  }
  .column:nth-child(2) {
    width: calc(100% - 200px);
    height: 100%;
  }
  .row_paginator {
    height: 69px;
    background-color: #e5e5e5;
  }
  .row {
    width: 100vw;
    height: calc(100vh - 168px);
  }

  .row_filter,
  .row_break {
    border-bottom: 1px solid #000000;
  }
  .filters {
    padding: 20px;
    color: #ea5045;
    font-size: 25px;
  }
  p {
    margin: 0;
  }
</style>

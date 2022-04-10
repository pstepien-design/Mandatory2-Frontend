<script>
  import { onMount } from 'svelte';
  import Item from '../components/Item.svelte';
  import { paginate, LightPaginationNav } from 'svelte-paginate';
    let items = [];
    let currentPage = 1;
    let pageSize = 5;
  /* function pagination(array, current_page, items_per_page) {
    let page = current_page || 1,
    per_page = items_per_page || 5,
    onPreviousPage = (page - 1) * per_page,

    paginatedItems = array.slice(onPreviousPage).slice(0, items_per_page),
    total_pages = Math.ceil(array.length/ per_page);
    return{
      page: page,
      per_page: per_page,
      previous_page: page-1 ? page-1 : null,
      next_page: (total_pages> page) ? page+1 : null,
      total: array.length,
      total_pages: total_pages,
      data: paginatedItems
    }
  } */
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

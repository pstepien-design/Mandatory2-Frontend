<script>
  import { onMount } from 'svelte';
  import Item from '../components/Item.svelte';
  import { paginate, LightPaginationNav } from 'svelte-paginate';
    let items = [];
    let currentPage = 1;
    let pageSize = 5;

    let selected = {
      id: null,
      text: ''
    };
    let questions = [
    {id: 1, text: 'SHOW ALL'},
		{ id: 2, text: `<100` },
		{ id: 3, text: `100-500` },
		{ id: 4, text: `>500` }
	];

  let allItemsArray = [];

  function filterByPrice(){
    items = allItemsArray;

   if(selected.id == 2){
    items = items.filter(item => item.price < 100);
   }
   else if(selected.id ==3){
     console.log('here');
     items = items.filter(item => item.price>= 100 && item.price<=500);
   }
   else if(selected.id ==4){
    items = items.filter(item => item.price >500);
   }
   if(items.length <= 0){
     console.log("No items")
   }
  }

  onMount(
    async () => {
    const response = await fetch('http://localhost:3000/api/items');
    const { data: itemsArray } = await response.json();
    items = itemsArray;
    allItemsArray = itemsArray;
     });

$: paginatedItems = paginate({ items, pageSize, currentPage });

  </script>

<div class="row">
  <div class="column">
    <div class="row_filter">
      <p class="filters">FILTERS</p>
    </div>
    <p class="filter__price"> PRICE </p>
    <select class="filter__price__selector" bind:value={selected} on:change="{filterByPrice}">
      {#each questions as question}
        <option value={question}>
          {question.text}
        </option>
      {/each}
    </select>
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
  
  .column:nth-child(1) {
    width: 200px;
    height: calc(100vh - 168px);
    background-color: #c4c4c4;
  }
  .filter__price__selector{
    width: 80%;
    border-radius: 5px;
    margin-left: 10%;
    margin-right: 10%;

  }
  .filter__price{
    text-align: center;
  }
  .column:nth-child(2) {
    width: calc(100% - 200px);
    height: 100%;
  }
  .row_paginator {
    height: 45px;
    background-color: #e5e5e5;
  }
  .row {
    width: 100vw;
    height: calc(100vh - 168px);
  }

  .row_filter,
  .row_paginator {
    border-bottom: 1px solid #000000;
  }
  .filters {
    padding: 10px;
    color: #ea5045;
    font-size: 22px;
    text-align: center;
  }
  .filter__price{
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 22px;
  }
  p {
    margin: 0;
  }
</style>

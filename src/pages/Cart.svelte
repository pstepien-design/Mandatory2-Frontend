<script>
  import CartItem from '../components/CartItem.svelte';
  import {isCartEmpty, serverUrl, getStoreItems, itemsInTheCart, countTotalPrice} from '../stores/store.js'
  import {onMount} from 'svelte'
  import { paginate, LightPaginationNav } from 'svelte-paginate';
  

  let cartItems = itemsInTheCart();
  let totalPrice = countTotalPrice();
  let itemsToDisplay = [];
  let isEmpty = true;

    let items = [];
    let currentPage = 1;
    let pageSize = 5;

  onMount(async () => {
   isEmpty = isCartEmpty();
  let fetchedItems = await getStoreItems($serverUrl);

    fetchedItems.forEach(item => {
      cartItems.forEach(cartItem => {
        if(cartItem.id === item.id){
          let itemToAdd = {item, quantity: cartItem.quantity};
          itemsToDisplay.push(itemToAdd);
        }
      })
    })
    items = itemsToDisplay;
  })
  $: paginatedItems = paginate({ items, pageSize, currentPage });

</script>

<div>
  <div class="header">
  <h1>Total: {totalPrice} DKK</h1>
</div>
  <div class="paginator">
  <LightPaginationNav
totalItems={items.length}
{pageSize}
{currentPage}
limit={1}
showStepOptions={true}
on:setPage={(e) => (currentPage = e.detail.page)}
/>
</div>
  {#if isEmpty }
  <h2> Your cart is empty</h2>
    {:else}
    {#each paginatedItems as item}
    <CartItem {...item.item} quantity={item.quantity} />
  {/each}
  {/if}
</div>

<style>
  .header{
    display: flex;
    flex-direction: row;
    justify-content: center;

  }
  .paginator{
    margin-top:auto;
  }
</style>

<script>
  import CartItem from '../components/CartItem.svelte';
  import {isCartEmpty, serverUrl, getStoreItems, itemsInTheCart, getTotalPrice} from '../stores/store.js'
  import {onMount} from 'svelte'
  import { paginate, LightPaginationNav } from 'svelte-paginate';
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  import Modal from '../components/Modal.svelte';


  let cartItems = itemsInTheCart();
  let totalPrice = getTotalPrice();
  let itemsToDisplay = [];
  let isEmpty = true;

    let items = [];
    let currentPage = 1;
    let pageSize = 3;
    let isOpenModal = false;

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

  function handlePayment(){
    isOpenModal = true;
  }


    function closeModal() {
        isOpenModal = false;
    }

    const displayNotification = (text) => {
    addNotification({
    text: text,
    position: 'top-center',
    type: 'success',
    removeAfter: 2000,
    });
  };

</script>

<div>
  {#if !isEmpty}
  <div class="header">
  <h1>Total: {totalPrice} DKK</h1>
  <button on:click={handlePayment}>
    PAY
  </button>
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
{/if}
  {#if isEmpty }
  <h2> Your cart is empty</h2>
    {:else}
    {#each paginatedItems as item}
    <CartItem {...item.item} quantity={item.quantity} />
  {/each}
  {/if}
</div>
<Modal isOpenModal={isOpenModal}  on:closeModal={closeModal}/>

<style>
  .header{
    display: flex;
    flex-direction: row;
    justify-content: center;

  }
  .paginator{
    margin-top:auto;
  }
  button {
    width: 150px;
    height: 50px;
    font-weight: 20px;
    background-color: #ea5045;
    margin-left: 20px;
    margin-top: auto;
    margin-bottom: auto;
  }
</style>

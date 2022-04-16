<script>
import { createEventDispatcher } from 'svelte';
import { getTotalPrice, serverUrl, removeCart} from '../stores/store.js'
import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  import { navigate } from "svelte-navigator";


const dispatch = createEventDispatcher();

  export let isOpenModal;
  let email = '';
  let total = getTotalPrice();
  console.log(email);

  async function sendEmail() {
    const res = await fetch(`${$serverUrl}/sendemail`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        total
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json)
  }

  function closeModal() {
      isOpenModal = false;
      dispatch('closeModal', { isOpenModal });
  }
  function payment(){
    closeModal();
    sendEmail();
    removeCart();
    const text = `Thank you for choosing us! Your payment will be process and you will receive notification by email on ${email}!`
    displayNotification(text)
    navigate('/shop');
  }
  const displayNotification = (text) => {
    addNotification({
    text: text,
    position: 'top-center',
    type: 'success',
    removeAfter: 4000,
    });
  };
</script>

<div id="background" style="--display: {isOpenModal ? 'block' : 'none'};" on:click={closeModal}></div>
<div id="modal" style="--display: {isOpenModal ? 'block' : 'none'};">
  <h1>PAYMENT</h1>
  <p>Type your email to finish the paymeny process</p>
  <form on:submit|preventDefault={payment} >
    <input type="email" required='required' bind:value={email} />
    <div>
      <h2>Your total is: {total} DKK</h2>
    <button type="submit"> Pay </button>
  </div>
    </form>
</div>

<style>
  #background {
      display: var(--display);
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
  }

  #modal {
      display: var(--display);
       position: fixed;
      z-index: 2;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      filter: drop-shadow(0 0 20px #333);
  }
  button {
    width: 150px;
    height: 50px;
    font-weight: 20px;
    background-color: #ea5045;
    margin-left: 20px;
  }
</style>
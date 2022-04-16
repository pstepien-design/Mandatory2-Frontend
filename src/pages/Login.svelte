<script>
  import { saveAuthorizedStatus } from '../stores/store.js';
  import { useNavigate } from 'svelte-navigator';
  import { onMount } from 'svelte';
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  import { serverUrl } from '../stores/store.js';

  let email = '';
  let password = '';
  const navigate = useNavigate();
  async function login() {
    const res = await fetch(`${$serverUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const json = await res.json();
    const accesToken = (json).accessToken
    saveAuthorizedStatus(accesToken)
   checkResult(); 
  }
  function checkResult() {
    if (sessionStorage.getItem('accessToken') === 'false') {
      displayNotification();
    } else {
      navigate('/shop');
      window.location.reload(); 
    }
  }

  const displayNotification = () => {
    addNotification({
    text: `It seems like you used wrong credentials or the account doesn't exist, try again!`,
    position: 'top-center',
    type: 'danger',
    removeAfter: 3000,
    });
  };
  onMount(async () => {
    if (sessionStorage.getItem('accessToken') !== 'false') {
      navigate('shop');
    }
  });
</script>

<div>
  <p class="login__header">LOGIN</p>
  <p class="login__text">Type your email and password to login</p>
  <form on:submit|preventDefault={login} class="login__form">
    <p class="login__label">E-mail</p>
    <input type="email" required='required' bind:value={email} />
    <p class="login__label">Password</p>
    <input type="password" required='required' bind:value={password} />
    <div>
      <button type="submit"> Login </button>
    </div>
  </form>
</div>

<style>
  .login__header {
    font-size: 30px;
    font-weight: bold;
  }
  .login__text {
    font-size: 24px;
  }
  input {
    width: 30%;
  }

  button {
    width: 30%;
    height: 50px;
    font-weight: 20px;
    margin-top: 20px;
    background-color: #ea5045;
  }
</style>

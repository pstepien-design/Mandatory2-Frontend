<script>
  import { saveAuthorizedStatus } from '../stores/store.js';
  import { useNavigate } from 'svelte-navigator';
  import { onMount } from 'svelte';
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  import { getAuthorizedStatus, serverUrl } from '../stores/store.js';

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
    checkResult(json);
  }
  function checkResult(result) {
    if (result.isAuthorized === true) {
      saveAuthorizedStatus(true);
      navigate('shop');
      window.location.assign('/');
    } else {
      saveAuthorizedStatus(false);
      displayNotification();
    }
  }

  /*  function displayNotification() {
   
  }
 */
  const displayNotification = () => {
    addNotification({
    text: `It seems like you used wrong credentials or the account doesn't exist, try again!`,
    position: 'top-center',
    });
  };
  onMount(async () => {
    const isLogged = getAuthorizedStatus();

    if (isLogged === 'true') {
      navigate('shop');
    }
  });
</script>

<div>
  <p class="login__header">LOGIN</p>
  <p class="login__text">Type your email and password to login</p>
  <form on:submit|preventDefault={login} class="login__form">
    <p class="login__label">E-mail</p>
    <input type="email" bind:value={email} />
    <p class="login__label">Password</p>
    <input type="password" bind:value={password} />
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

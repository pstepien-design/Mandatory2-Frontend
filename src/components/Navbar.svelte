<script>
    import { Router, Link, Route } from 'svelte-navigator';
    import FaShoppingCart from 'svelte-icons/fa/FaShoppingCart.svelte'
    import {onMount} from 'svelte';
    import { isAuthenticated, serverUrl  } from '../stores/store.js'; 
    import ProtectedRoute from './ProtectedRoute.svelte'
    import Main from '../pages/Main.svelte';
    import Login from '../pages/Login.svelte';
    import Cart from '../pages/Cart.svelte'

    $: isAuthorized = false;

  onMount(async() => {
  isAuthorized = await isAuthenticated($serverUrl);
  })
    
  function logOut(){
    isAuthorized = false;
    sessionStorage.setItem('accessToken', false);
    localStorage.removeItem('cart');
   }
   
</script>

<Router>
  <nav>
    <ul hidden>
      <li style="{isAuthorized === false ? 'margin-right: 86vw' : ''}">
        <p>MYSHOP</p>
      </li>
      {#if isAuthorized === true}
      <li>
        <Link to="/shop">
        <p class="link">HOME</p>
        </Link>
      </li>
      <li>
        <Link to="/">
        <p on:click={logOut} class="link">LOG OUT</p>
        </Link>
      </li>
      <li>
        <Link to="/cart">
          <div class="icon">
        <FaShoppingCart/>
      </div>
      </Link>
      </li>
      {/if}
    </ul>
    <Route path="/" component={Login} />
    <ProtectedRoute path="/shop" component={Main} />
    <ProtectedRoute path="/cart" component={Cart}/>
  </nav>
  </Router>

<style>
  li {
    color: white;
    vertical-align: middle;
    font-size: 24px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .icon{
    height:8vh;
    margin-top: 20%;
    color: black;
  }


  .link {
    color: white;
    vertical-align: middle;
    font-size: 24px;
  }
  .link:hover {
    color: #ea5045;
  }
  ul {
    display: flex;
    margin: 0;
    flex-direction: row;
    justify-content: flex-start;
    list-style: none;
    text-decoration: none;
    white-space: nowrap;
    width: 100%;
    background-color: #233249;
    height: 12vh;
    padding: 0;
    overflow: auto;
  }
  li:nth-child(1) {
    background-color: #ea5045;
    font-weight: bold;
    color: black;
    margin-left: 0;
    padding-left: 2vw;
    width: 10vw;
    padding-right: 2vw;
    height: 100%;
    align-items: center;

  }
  li:last-child {
    background-color: #ea5045;
    margin-left: auto;
    padding-left: 2vw;
    padding-right: 2vw;
    height: 100%;
    color: black;
    float: left;
    margin-right: 0;
  }
  p {
    padding-top: 10px;
  }
  nav {
    padding: 0;
  }

</style>
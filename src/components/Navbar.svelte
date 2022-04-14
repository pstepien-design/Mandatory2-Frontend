<script>
    import { Router, Link, Route } from 'svelte-navigator';
    import { onMount } from 'svelte';
    import { saveAuthorizedStatus, getAuthorizedStatus  } from '../stores/store';
    import Main from '../pages/Main.svelte';
    import Login from '../pages/Login.svelte';
    import Cart from '../pages/Cart.svelte'

    export let loggedNavbar = '';
    onMount(() => {
      loggedNavbar = getAuthorizedStatus();
  });


    
   
    function logOut(){
     saveAuthorizedStatus('false');
     loggedNavbar = false;
   }
   
</script>

<Router>
  <nav>
    <ul hidden>
      <li>
        <p>MYSHOP</p>
      </li>
      {#if loggedNavbar === "true"}
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
        <p class="link">CART</p>
      </Link>
      </li>
      {/if}
    </ul>
  </nav>
  <Route path="/shop" component={Main} />
  <Route path="/" component={Login} />
  <Route path="/cart" component={Cart} />
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
    height: 100px;
    padding: 0;
    overflow: auto;
  }
  li:nth-child(1) {
    background-color: #ea5045;
    font-weight: bold;
    color: black;
    margin-left: 0;
    padding-left: 20px;
    width: 160px;
    padding-right: 20px;
    height: 100%;
    align-items: center;

  }
  li:last-child {
    background-color: #ea5045;
    margin-left: auto;
    padding-left: 20px;
    padding-right: 20px;
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
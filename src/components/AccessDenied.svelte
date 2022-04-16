<script>
import { navigate } from "svelte-navigator";
import {isAuthenticated, serverUrl} from '../stores/store.js'
import { onMount } from 'svelte';



  function goToLogin(){
    navigate('/');
  }

  $: isAuthorized = '';
  onMount(async() => {
  if(sessionStorage['accessToken']){
  isAuthorized = await isAuthenticated($serverUrl);
    }
  })
</script>
<div>
  {#if isAuthorized === false}
  <h1>ACCESS DENIED</h1>
  <h2>Error, log in first</h2>
  <button on:click={goToLogin}>Login</button>
  {:else}
  <h1>LOADING</h1>
  {/if}
</div>
<style>
   button {
    width: 150px;
    height: 50px;
    font-weight: 20px;
    background-color: #ea5045;
    margin-left: 20px;
  }
</style>
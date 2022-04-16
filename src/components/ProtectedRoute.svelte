<script>
import {Route} from 'svelte-navigator'
import AccessDenied from './AccessDenied.svelte'
import {isAuthenticated, serverUrl} from '../stores/store.js'
import { onMount } from 'svelte';

export let path, component;


$: isAuthorized = false;

onMount(async() => {
  isAuthorized = await isAuthenticated($serverUrl);
})

</script>
 {#if isAuthorized === true} 
<Route {path} {component}></Route>
 {:else}
<Route {path} component={AccessDenied}></Route>
{/if} 
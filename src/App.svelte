<script>
  import Header from './components/Header.svelte';
  import Notifications from 'svelte-notifications';
  import Footer from './components/Footer.svelte';
  import Navbar from './components/Navbar.svelte';
  import { saveAuthorizedStatus, initializeCartInStorage } from './stores/store';
  import { onMount } from 'svelte';

  onMount(() => {
    if(!sessionStorage['accessToken']){
      saveAuthorizedStatus(false);
    }
    if (!localStorage['cart']) {
      initializeCartInStorage();
    }
  });
</script>

<Notifications>
  <main>
    <Header />
    <Navbar />
    <Footer />
  </main>
</Notifications>

<style>
  :global(body) {
    padding: 0;
    font-family: Roboto;
  }
  main {
    text-align: center;
    max-width: 240px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

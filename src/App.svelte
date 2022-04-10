<script>
  import Header from './components/Header.svelte';
  import Navbar from './components/Navbar.svelte';
  import Main from './pages/Main.svelte';
  import Footer from './components/Footer.svelte';
</script>

<main>
  <Header />
  <Navbar />
  <Main />
  <Footer />
</main>

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

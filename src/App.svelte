<script>
  import { Router, Link, Route } from 'svelte-navigator';
  import Header from './components/Header.svelte';
  import Navbar from './components/Navbar.svelte';
  import Main from './pages/Main.svelte';
  import Login from './pages/Login.svelte';
  import Footer from './components/Footer.svelte';
</script>

<main>
  <Header />
  <Router>
    <nav>
      <ul>
        <li>
          <p>MYSHOP</p>
        </li>
        <li>
          <Link to="/shop">
          <p  class="link">
            HOME
          </p>
        </Link>
        </li>
        <li>
          <Link to="/"><p  class="link">
            LOGIN
          </p></Link>
        </li>
        <li>
          <p>FOR WOMAN</p>
        </li>
        <li>
          <p>FOR EVERYONE</p>
        </li>
        <li>
          <p>EXPLORE</p>
        </li>
        <li>
          <p>CART</p>
        </li>
      </ul>
    </nav>
    <Route path="/shop" component={Main} />
    <Route path="/" component={Login} />
  </Router>
  <Footer />
</main>

<style>
  :global(body) {
    padding: 0;
    font-family: Roboto;
  }
  li {
    color: white;
    vertical-align: middle;
    font-size: 24px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .link{
    color: white;
    vertical-align: middle;
    font-size: 24px;
  }
  .link:hover{
    color: #ea5045;;
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

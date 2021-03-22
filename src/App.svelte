<script>
  import { Router, Route } from "svelte-routing";
  import NavComponent from './components/NavComponent.svelte';
  import FooterComponent from './components/FooterComponent.svelte';
  import Home from "./views/Home.svelte";
	import Login from "./views/Login.svelte";
	import Config from "./views/Config.svelte";
	import Notfound from "./views/Notfound.svelte";
</script>

<Router>
  <NavComponent />
  <Route path="/">
    <Home />
  </Route>
  <Route path="login">
    <Login />
  </Route>
  <Route path="config">
    <Config />
  </Route>
  <Route path="*">
    <Notfound />
  </Route>
  <FooterComponent />
</Router>

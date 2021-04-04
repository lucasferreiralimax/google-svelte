<script>
  import { Router, Route } from "svelte-navigator";
  import NavComponent from './components/NavComponent.svelte';
  import FooterComponent from './components/FooterComponent.svelte';
  import Home from "./views/Home.svelte";
	import Login from "./views/Login.svelte";
	import Config from "./views/Config.svelte";
	import Notfound from "./views/Notfound.svelte";
</script>

<div data-testid="app-container" class="App">
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
    <Route component={Notfound} />
    <FooterComponent />
  </Router>
</div>

<style lang="scss">
.App {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 96px);
  justify-content: center;
  @media (max-height: 600px) {
    justify-content: space-between;
    min-height: 600px;
  }
}
</style>

<script>
  import ProfileComponent from '../components/ProfileComponent.svelte';
  import Darkmode from '../components/Darkmode.svelte';
</script>

<form class="App-config">
  <ProfileComponent />
  <h1>Configurações</h1>
  <Darkmode />
  <br/>
  <a href="https://github.com/lucasferreiralimax/google-svelte" target="_blank" rel="noreferrer noopener">Estude o código fonte desse projeto no Github acesse aqui.</a>
</form>

<style lang="scss" scoped>
  .App-config {
    padding: 1em;
    text-align: center;
    a {
      box-sizing: border-box;
      display: inline-block;
      padding: 1em;
    }
  }
</style>

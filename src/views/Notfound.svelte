<script>
  import { onMount, onDestroy } from 'svelte';
  import { link } from "svelte-navigator";

  onMount(() => {
    document.body.classList.add('notfound');
  });

  onDestroy(() => {
    document.body.classList.remove('notfound');
  });
</script>

<section data-testid="app-notfound" class="App-notfound">
  <a data-testid="link-home" href="/" use:link>
    <span id="logo" aria-label="Google"></span>
  </a>
  <p><b>404.</b> Esse é um erro.</p>
  <br/>
  <p>O URL <b class="highlight">{ window.location.pathname }</b> solicitado não foi encontrado. Isso é tudo que sabemos.</p>
</section>

<style lang="scss" scoped>
:global(.notfound) {
  background: url('../../assets/robot.png') 80% 30% no-repeat;
}

.App-notfound {
  box-sizing: border-box;
  margin: 0 auto;
  min-height: 100%;
  padding: 58px 10px 36px 30px;
  position: relative;
  z-index: 1;
  @media (min-width: 601px) {
    min-height: auto;
    padding: 0;
  }
  .highlight { color: var(--main-color-secondary); }
  p { margin: 0; }
  a {
    box-sizing: border-box;
    display: inline-block;
  }
}

#logo {
  background: url('../../assets/logo.svg') no-repeat;
  background-size: contain;
  display: inline-block;
  height: 54px;
  width: 150px;
}
</style>

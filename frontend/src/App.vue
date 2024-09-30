<template>
  <div id="app">
    <Navbar />
    <router-view class="container" />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: black;
}

html, body {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garante que o conteúdo ocupe a tela toda */
}

.container {
  flex: 1; /* Faz o conteúdo crescer e empurrar o footer para baixo */
}

a {
  transition: 0.5s;
}

a:hover {
  color: purple;
}
</style>

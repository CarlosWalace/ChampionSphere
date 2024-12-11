<template>
  <div id="app">
    <!-- Container do plano de fundo com imagem decorativa -->
    <div class="background-container" aria-hidden="true">
      <img src="@/assets/Plano_Fundo.png" alt="" class="background-image" />
    </div>
    
    <!-- Navbar do site -->
    <Navbar />
    
    <!-- Conteúdo principal -->
    <main class="container">
      <router-view />
    </main>
    
    <!-- Rodapé do site -->
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
/* Reseta estilos e configurações globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: black;
}

/* Garante que a página ocupe toda a altura */
html, body {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

/* Configuração principal do layout */
#app {
  display: flex;
  flex-direction: column; /* Organiza elementos verticalmente */
  min-height: 100vh; /* Garante que ocupe a altura da tela */
  position: relative;
}

/* Plano de fundo com imagem */
.background-container {
  position: fixed; /* Fixa a imagem no fundo da tela */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1; /* Mantém a imagem atrás do conteúdo */
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Faz a imagem preencher a tela sem distorcer */
  opacity: 0.5; /* Reduz a opacidade da imagem */
}

/* Conteúdo principal */
.container {
  flex: 1; /* Faz o conteúdo principal crescer e empurrar o footer para baixo */
  z-index: 1; /* Garante que fique acima do background */
}

/* Estilo para links */
a {
  transition: 0.5s;
}

a:hover {
  color: purple;
}

/* Footer */
footer {
  width: 100%;
  background-color: aquamarine;
  color: rgb(230, 230, 230);
  text-align: center;
  padding: 10px;
  box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.5);
}
</style>

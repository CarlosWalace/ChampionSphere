<template>
    <footer>
        <h3>ChampionSphere &copy; 2024</h3>
        <p>A plataforma para compartilhar seus eventos e campeonatos de E esportes</p>
    </footer>
</template>

<script>
 
 export default{
    name: "Footer"
 }

</script>

 <style>
  footer {
  background-color: aquamarine;
  height: 200px;
  width: 100%; /* Faz o footer ocupar toda a largura da tela */
  bottom: 0; /* Posiciona o footer na parte inferior */
  left: 0; /* Garante que o footer comece no início da tela */
  margin: 0; /* Remove qualquer margem */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.300);
}


  footer h3 {
    color: blueviolet;
    margin-bottom: 10px;
    font-weight: 250;
    font-size: x-large;
  }

  footer p{
    color: blueviolet;
  }
 </style>

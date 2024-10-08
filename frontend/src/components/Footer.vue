<template>
    <footer>
        <h3>ChampionSphere &copy; 2024</h3>
        <p>The platform to share your E-sports events and championships</p>
    </footer>
</template>

<script>
 
 export default{
    name: "Footer"
 }

</script>


 <style>

/* Estilos para o footer */
footer {
  background-color: aquamarine;
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.3);
  margin-top: auto; /* Empurra o footer para o final da página */
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

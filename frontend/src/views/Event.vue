<template>
  <div class="event">
    <h1>{{ event.title }}</h1>
    <div class="event-container">
      <div class="event-images" v-if="event.photos">
        <img :src="event.photos[0]" alt="Event image" class="main-image-img">
          <div class="event-mini-images" v-if="event.photos[1]">
          <div class="mini-image" v-for="(photo, index) in event.photos.slice(1, event.photos.length)" 
          :key="index" :style="{'background-image': 'url(' + event.photos[index + 1] +')'}"></div>
        </div>
      </div>
      <div class="event-details">
        <p class="bold">Descrição do Evento:</p>
        <p class="event-description">{{ event.description }}</p>
        <p class="bold">Data do Evento:</p>
        <p class="event-date">{{ event.eventDate }}</p>        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        event: {}
      }
  },
  created() {
      // load event
      this.getEvent();
  },
  methods: {
      async getEvent() {

          // get id from url and token from state
          const id = this.$route.params.id;
          const token = this.$store.getters.token;

          await fetch(`http://localhost:3000/api/event/${id}`, {
              method: "GET",
              headers: { 
                  "Content-type": "application/json",
                  "auth-token": token 
              }
          })
          .then((resp) => resp.json())
          .then((data) => {


              if(data.error != null){
                  this.$router.push(`/`)
              }

              this.event = data.event;

              this.event.eventDate = new Date(this.event.eventDate).toLocaleDateString();

              this.event.photos.forEach((photo, index) => {

              this.event.photos[index] = photo.replace("public", "http://localhost:3000").
                  replaceAll("\\", "/");
              });

              console.log(this.event);
              console.log(this.event.photos);

          })
          .catch((err) => {
              console.log(err);
          })

      }
  }
}
</script>

<style scoped>
  .event {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 100px;
    width: 1000px;
    margin: 0 auto;
}

.event h1 {
    margin-bottom: 40px;
}

.event-container {
    display: flex;
}

.event-images {
    width: 500px; /* Largura do contêiner de imagens */
    height: 500px; /* Altura do contêiner */
    margin-right: 30px; /* Margem à direita do contêiner de imagens */
    
    
}

.main-image-img {
  width: 100%;
  height: 500px; /* Permite que a imagem ajuste sua altura */
  min-height: 500px; /* Altura mínima para manter o layout */
  background-position: center;
  background-size: cover; /*

}

.event-mini-images {
    display: flex;
    flex-wrap: wrap; /* Permite que as miniaturas se ajustem em várias linhas, se necessário */
}

.mini-image {
    width: 80px; /* Largura fixa para as miniaturas */
    height: 80px; /* Altura fixa para as miniaturas */
    background-color: rgb(230,230,230); /* Cor de fundo, caso a imagem não carregue */
    background-position: center; /* Centraliza a imagem */
    background-size: cover; /* Faz com que a imagem cubra todo o espaço disponível */
    background-repeat: no-repeat; /* Impede a repetição da imagem se ela não preencher todo o espaço */
    margin: 5px; /* Margem em todas as direções */
}


.event-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Alinha o texto à esquerda */
}

.bold {
    font-weight: bold;
    margin-bottom: 12px; /* Espaçamento abaixo do texto em negrito */
}

.event-description,
.event-date {
    margin-bottom: 20px; /* Espaçamento abaixo da descrição e da data do evento */
}

</style>
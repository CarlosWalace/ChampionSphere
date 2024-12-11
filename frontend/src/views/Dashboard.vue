<template>
  <div class="dashboard">
    <div class="title-container">
      <h1>Tabela de Eventos</h1>
      <router-link to="/newevent" class="btn">Registrar novo evento</router-link>
    </div>
    <div v-if="events.length > 0">
      <DataTable :events="events"/>
      <!-- Aqui você pode adicionar a tabela de eventos -->
    </div>
    <div v-else>
      <p>Você ainda não registrou nenhum evento, <router-link to="/newevent">Clique aqui para registrar um evento</router-link></p>
    </div>
  </div>
</template>

<script>
import DataTable from '../components/DataTable.vue';

export default {
  data() {
    return {
      events: []
    }
  },
  components:{
    DataTable
  },
  created(){
    this.getEvents()
  },
  methods: {
        async getEvents() {
            // get token from state
            const token = this.$store.getters.token;

            await fetch("http://localhost:3000/api/event/userevents", {
                method: "GET",
                headers: { 
                    "Content-type": "application/json",
                    "auth-token": token
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                this.events = data.events;
            })
            .catch((err) => {
                console.log(err);
            })
          }
        }
      }
</script>

<style scoped>
.dashboard {
  padding: 50px;
  padding-bottom: 100px;
}

.title-container {
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.btn {
  padding: 10px 16px;
  background-color: blueviolet;
  color: black;
  text-decoration: none;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: .5s;
}

.btn:hover {
  background-color: aquamarine; /* Altera a cor de fundo (opcional, mas recomendada para um efeito mais visível) */
  transform: scale(1.05); /* Leve ampliação no hover */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Sombra mais intensa */
  color: black;
  
}

</style>

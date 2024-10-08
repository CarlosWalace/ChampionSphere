<template>
  <div class="dashboard">
    <div class="title-container">
      <h1>Your favorite platform of E-sports Events</h1>
      <router-link to="/newevent" class="btn">Register new Event</router-link>
    </div>
    <div v-if="events.length > 0">
      <DataTable :events="events"/>
      <h1>Event Table</h1>
      <!-- Aqui você pode adicionar a tabela de eventos -->
    </div>
    <div v-else>
      <p>You don't have events registered yet, <router-link to="/newevent">click here to register your event</router-link></p>
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
        display: flex;        
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
    }
    
    .btn {
        padding: 10px 16px;
        background-color: blueviolet;
        color: white;
        margin: 5px;
        text-decoration: none;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        transition: .5s;
    }

    .btn:hover{
      color:aquamarine;
    }
</style>

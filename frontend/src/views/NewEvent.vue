<template>
    <div class="newevent">
      <h1>Adicionar seu Evento:</h1>
      <EventForm :event="{}" page="newevent" btnText="Create new Event!" />
    </div>
  </template>
  
  <script>
  import EventForm from '../components/EventForm.vue'
  
  export default {
      components: {
        EventForm
      }
  }
  </script>

<style scoped>
    .newevent{
    text-align: center;
    padding-top: 40px;
    padding-bottom: 100px;
  }

    .newevent h1 {
    margin-bottom:40px;
  }
</style>

<template>
    <div class="home">
        <h1>Last Events</h1>
        <div class="events-container">
            <div class="event-container" v-for="(event, index) in events" :key="index">
                <img class="event-img" :src="event.photos[0]" alt="Event image">
                <router-link :to="`/event/${event._id}`" class="event-title">{{ event.title }}</router-link>
                <p class="event-date"><span>&nbsp;</span>Data: {{ event.eventDate }}</p>
                <router-link :to="`/event/${event._id}`" class="event-details-btn">See more</router-link>
            </div>        
        </div>
        <p v-if="events.length == 0">Não há festas ainda...</p>
    </div>
</template>

<script>

export default {
    data() {
        return {
            events: []
        }
    },
    created() {
        // load public events
        this.getEvents();
    },
    methods: {
        async getEvents() {

            await fetch(`http://localhost:3000/api/event/all`, {
                method: "GET",
                headers: { 
                    "Content-type": "application/json"
                }
            })
            .then((resp) => resp.json())
            .then((data) => {

                data.events.forEach((event, index) => {

                    if(event.eventDate) {

                        event.eventDate = new Date(event.eventDate).toLocaleDateString();
                    }

                    if(event.photos.length > 0){
                        event.photos.forEach((photo, index) => {

                        event.photos[index] = photo.replace("public", "http://localhost:3000").
                        replaceAll("\\", "/");
                    });
                }

                });

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

    .home {
        text-align: center;
        padding-top: 40px;
        padding-bottom: 100px;
    }

    .home h1 {
        margin-bottom: 40px;
    }

    .events-container {
        display: flex;
        flex-wrap: wrap;
        max-width: 1000px;
        margin: 0 auto;
        
    }

    .event-container {
        width: 30.3%;
        margin: 1.5%;
        display: flex;
        flex-direction: column;
    }

    .event-img {
        width: 100%;
        height: 200px; /* Permite que a imagem ajuste sua altura */
        min-height: 300px; /* Altura mínima para manter o layout */
        background-position: center;
        background-size: cover; /* Mantém a proporção da imagem */
    }

    .event-title {
        color: black;
        text-decoration: none;
        margin-bottom: 12px;
        white-space: nowrap;       /* Impede quebra de linha */
        overflow: hidden;          /* Esconde o texto excedente */
        text-overflow: ellipsis;   /* Adiciona '...' ao final do texto */
        display: block;
        max-width: 100%;           /* Define o tamanho máximo que o texto pode ocupar */
    }

    .event-date {
        color: #777;
        margin-bottom: 12px;
    }

    .event-details-btn {
        width: 100%;
        text-transform: uppercase;
        color: #fff;
        background-color: #25282e;
        transition: .5s;
        border: 0;
        padding: 12px;
        text-decoration: none;
        text-align: center;
    }

    .event-details-btn:hover {
        background-color: #141619;
    }
    
    
</style>
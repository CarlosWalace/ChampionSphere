<template>
   <div>
    <Message :msg="msg" :msgClass="msgClass" />
    <form id="event-form" enctype="multipart/form-data" @submit="page === 'newevent' ? 
    createEvent($event) : update($event)">
    
    <input type="hidden" id="id" name="id" v-model="id">
    <input type="hidden" id="user_id" name="user_id" v-model="user_id">
            <div class="input-container">
                <label for="title">Event Title:</label>
                <input type="text" id="title" name="title" v-model="title" placeholder="Event Title">
            </div>
            <div class="input-container">
                <label for="description">Description:</label>
                <textarea id="description" name="description" v-model="description" placeholder="What happend in the event"></textarea>
            </div>
            <div class="input-container">
                <label for="event_date">Event Data:</label>
                <input type="date" id="event_date" name="event_date" v-model="event_date">
            </div>
            <div class="input-container">
                <label for="photos">Images:</label>
                <input type="file" multiple="multiple" id="photos" name="photos" ref="file" @change="onChange">
            </div>
            <div v-if="page === 'editevent' && showMiniImages" class="mini-images">
                <p>Imagens atuais:</p>
                <img v-for="(photo, index) in photos" :src="`${photo}`" :key="index">
            </div>
            <div class="input-container checkbox-container">
                <label for="privacy">Private Event</label>
                <input type="checkbox" multiple id="privacy" name="privacy" v-model="privacy">
            </div>
            <InputSubmit :text="btnText" />
    </form>
   </div>
</template>

<script>
import InputSubmit from './form/InputSubmit'
import Message from './Message'

export default {
  name: "RegisterForm",
  components: {
    InputSubmit,
    Message
},
  data() {
    return {
        id: this.event._id || null,
        title: this.event.title || null,
        description: this.event.description || null,
        event_date: this.event.eventDate || null,
        photos: this.event.photos || [],
        privacy: this.event.privacy || false,
        user_id: this.event.userId || null,
        msg: null,
        msgClass: null,
        showMiniImages: true,
    }
},
  props: ["event", "page", "btnText"],
  methods: {
      async createEvent(e) {
        
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', this.title)
        formData.append('description', this.description)
        formData.append('event_date', this.event_date)
        formData.append('privacy', this.privacy)

        if(this.photos.length > 0) {
            for (const i of Object.keys(this.photos)) {
                formData.append('photos', this.photos[i])
            }
        }

        // get token from state
        const token = this.$store.getters.token;

        await fetch("http://localhost:3000/api/event", {
            method: "POST",
            headers: {
                "auth-token": token
            },
            body: formData
        })
        .then((resp) => resp.json())
        .then((data) => {

            if(data.error) {
                this.msg = data.error;
                this.msgClass = "error";
            } else {
                this.msg = data.msg;
                this.msgClass = "success";
            }
            
            setTimeout(() => {

                this.msg = null;   

                // redirect
                if(!data.error) {                    
                    this.$router.push('dashboard');
                }
                
            }, 2000);

        })
        .catch((err) => {
            console.log(err);
        })

    
      },
      onChange(e) {

        this.photos = e.target.files;
        this.showMiniImages = false;

      },
      async update(e) {

        e.preventDefault();

        const formData = new FormData();

        formData.append('id', this.id);
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('event_date', this.event_date);
        formData.append('privacy', this.privacy);
        formData.append('user_id', this.user_id);

        if(this.photos.length > 0) {
            for (const i of Object.keys(this.photos)) {
                formData.append('photos', this.photos[i])
            }
        }

        // get token from state
        const token = this.$store.getters.token;

        await fetch("http://localhost:3000/api/event", {
            method: "PATCH",
            headers: {
                "auth-token": token 
            },
            body: formData
        })
        .then((resp) => resp.json())
        .then((data) => {

            if(data.error) {
                this.msg = data.error;
                this.msgClass = "error"
            } else {
                this.msg = data.msg;
                this.msgClass = "success";
            }

        })
        setTimeout(() => {

            this.msg = null;     
            
        }, 2000);
    }
  }
}
</script>

<style scoped>
    #event-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        background-color: rgb(230, 230, 230);
        border-radius: 15px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.300);
    }

    .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        text-align: left;
    }

    input[type="submit"] {
        width: 100%;
        padding: 10px;
        background-color: blueviolet;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    input[type="text"],input[type="date"],textarea{
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        box-sizing: border-box;
        transition: border-color 0.3s ease;
    }

    .input-container label {
        margin-bottom: 10px;
        color: Black;
    }

    .checkbox-container {
        flex-direction: row;
        
    }

    .checkbox-container input[type='checkbox'] {
        margin-left: 15px;
        margin-bottom: 13px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        box-sizing: border-box;
        transition: border-color 0.3s ease;
    }

    .mini-images {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 0px;
    }

    .mini-images p {
        width: 100%;
        font-weight: bold;
        margin-bottom: 15px;
        text-align: left;
    }

    .mini-images img {
        height: 50px;
        margin-right: 15px;
        margin-bottom: 15px;
    }
    

</style>
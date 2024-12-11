<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
        <form id="event-form" enctype="multipart/form-data" @submit="page === 'newevent' ? createEvent($event) : update($event)">
        
        <input type="hidden" id="id" name="id" v-model="id">
        <input type="hidden" id="user_id" name="user_id" v-model="user_id">
        
        <div class="input-container">
            <label for="title">Título do Evento:</label>
            <input type="text" id="title" name="title" v-model="title" placeholder="Título do Evento">
        </div>
        <div class="input-container">
            <label for="description">Descrição:</label>
            <textarea id="description" name="description" v-model="description" placeholder="O que acontecerá no evento"></textarea>
        </div>
        <div class="input-container">
            <label for="eventDate">Data do Evento:</label>
            <input type="date" id="eventDate" name="eventDate" v-model="eventDate">
        </div>
        <div class="input-container">
            <label for="photos">Imagens:</label>
            <input type="file" multiple="multiple" id="photos" name="photos" ref="file" @change="onChange">
        </div>
        <div v-if="page === 'editevent' && showMiniImages" class="mini-images">
            <p>Imagens atuais:</p>
            <img v-for="(photo, index) in photos" :src="`${photo}`" :key="index" :alt="photo.description || 'Imagem do'">
        </div>
        <div class="input-container checkbox-container">
            <label for="privacy">Evento Privado</label>
            <input type="checkbox" multiple id="privacy" name="privacy" v-model="privacy">
        </div>
        <div class="input-container checkbox-container">
            <label for="accessibility">Evento tem formas de acessibilidade</label>
            <input type="checkbox" multiple id="accessibility" name="accessibility" v-model="accessibility">
        </div>
        <div v-if="accessibility" class="input-container">
            <label for="accessibilityDescription">Descreva as formas de acessibilidade:</label>
            <textarea id="accessibilityDescription" name="accessibilityDescription" v-model="accessibilityDescription" placeholder="Quais as formas de acessibilidade"></textarea>
        </div>
        <!-- Substituindo input[type="submit"] por button -->
        <button type="submit" class="submit-btn">{{ btnText }}</button>
    </form>
</div>
</template>


<script>
import InputSubmit from './form/InputSubmit'
import Message from './Message'
import SemImagem from '@/assets/Sem_Imagem.png'; // Importa a imagem do assets

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
            eventDate: this.event.eventDate || null,
            photos: this.event.photos || [],
            privacy: this.event.privacy || false,
            accessibility: this.event.accessibility || false,
            accessibilityDescription: this.event.accessibilityDescription || null,
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
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('eventDate', this.eventDate);
            formData.append('privacy', this.privacy);
            formData.append('accessibility', this.accessibility);
            formData.append('accessibilityDescription', this.accessibilityDescription);
            if (this.photos.length > 0) {
                for (const i of Object.keys(this.photos)) {
                    formData.append('photos', this.photos[i]);
                }
            } else {
                // Envia a imagem padrão
                formData.append('photos', SemImagem);
            }
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
                this.msg = data.msg;
                this.msgClass = data.error ? "error" : "success";
                setTimeout(() => {
                    this.msg = null;
                    if (!data.error) {
                        this.$router.push('dashboard');
                    }
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
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
            formData.append('eventDate', this.eventDate);
            formData.append('privacy', this.privacy);
            formData.append('accessibility', this.accessibility);
            formData.append('accessibilityDescription', this.accessibilityDescription);
            formData.append('user_id', this.user_id);
            if (this.photos.length > 0) {
                for (const i of Object.keys(this.photos)) {
                    formData.append('photos', this.photos[i]);
                }
            } else {
                // Envia a imagem padrão
                formData.append('photos', SemImagem);
            }
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
                this.msg = data.msg;
                this.msgClass = data.error ? "error" : "success";
            });
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
    /* Estilo para o botão */
    .submit-btn {
        width: 100%;
        padding: 10px;
        background-color: blueviolet;
        color: black;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }
    .submit-btn:hover {
        background-color: aquamarine; /* Cor de fundo no hover */
        color: black; /* Cor do texto no hover (muda para preto) */
        transform: scale(1.05); /* Leve ampliação no hover */
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Sombra mais intensa */
    }
    input[type="text"], input[type="date"], textarea {
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
        border: 1px solid rgb(230, 230, 230);
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

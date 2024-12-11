<template>
    <div class="data-container">
        <Message :msg="msg" :msgClass="msgClass" />
        <div class="data-table-body">
            <div class="data-row" v-for="(event, index) in events" :key="event._id">
                <div class="data-id-container">{{ index + 1 }}</div>
                <div class="data-title-container">
                    <router-link :to="`/event/${event._id}`">{{ event.title }}</router-link>
                </div>
                <div class="data-actions-container">
                    <router-link :to="`/editevent/${event._id}`" class="edit-btn">Editar</router-link>
                    <button class="remove-btn" @click="remove(event._id)">Remover</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from './Message';

export default {
    name: "DataTable",
    props: ["events"],
    components: {
        Message
    },
    data() {
        return {
            msg: null,
            msgClass: null,
        };
    },
    methods: {
        async remove(id) {
            const userId = this.$store.getters.userId;
            const token = this.$store.getters.token;

            const data = {
                id: id,
                userId: userId
            };

            const jsonData = JSON.stringify(data);

            await fetch(`http://localhost:3000/api/event`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": token
                },
                body: jsonData
            })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.error) {
                    this.msg = data.error;
                    this.msgClass = "error";
                } else {
                    this.msg = data.msg;
                    this.msgClass = "success";
                }

                setTimeout(() => {
                    this.msg = null;
                    this.$parent.getEvents();
                }, 50);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
};
</script>

<style scoped>
/* Estilo básico do container */
.data-container {
    padding: 20px;
    margin: 30px;
    background-color: rgb(230, 230, 230);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilo para as linhas da tabela */
.data-table-heading, .data-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap; /* Ajusta o layout em telas menores */
    height: auto;
    border-bottom: 1px solid rgb(230, 230, 230);
    padding: 10px 0;
}

.data-table-heading div, .data-row div {
    flex: 1 1 100px;
    text-align: center;
    word-wrap: break-word;
}

/* Ações (botões) */
.data-actions-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

/* Títulos com reticências para texto longo */
.data-title-container {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Estilo dos botões de ação */
.edit-btn, .remove-btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: black; /* Cor do texto */
    border: none;
    border-radius: 8px; /* Bordas arredondadas */
    cursor: pointer;
    transition: all 0.3s ease-in-out; /* Transição suave */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

/* Botão de editar */
.edit-btn {
    background-color: #007bff; /* Azul primário */
}

.edit-btn:hover {
    background-color: #0056b3; /* Azul escuro no hover */
    transform: scale(1.05); /* Leve ampliação no hover */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Sombra mais intensa */
}

/* Botão de remover */
.remove-btn {
    background-color: #dc3545; /* Vermelho de alerta */
}

.remove-btn:hover {
    background-color: #b21f2d; /* Vermelho escuro no hover */
    transform: scale(1.05); /* Leve ampliação no hover */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Sombra mais intensa */
}

/* Responsividade para telas até 768px */
@media (max-width: 768px) {
    .data-row {
        flex-direction: column; /* Empilha os itens verticalmente */
        align-items: flex-start; /* Alinha à esquerda */
    }

    .data-container {
        overflow: hidden;
        max-width: 100%;
    }

    .data-id-container {
        font-size: 14px;
    }

    .data-actions-container {
        gap: 10px;
    }
}

/* Responsividade para telas até 480px */
@media (max-width: 480px) {
    .data-container {
        padding: 10px;
        margin: 10px;
    }

    .edit-btn, .remove-btn {
        font-size: 12px;
        padding: 8px 12px; /* Ajusta o tamanho dos botões */
    }
}

</style>

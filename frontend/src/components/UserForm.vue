<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
        <form id="user-form" @submit="page === 'register' ? register($event): update($event) ">
        <!--Verifica se a página é igual ao register-->
            <input type="hidden" name="id" id="id" v-model="id" />
            <div class="input-container">
                <label for="name">Nome</label>
                <input type="text" id="name" name="name" v-model="name" placeholder="Digite seu name">
            </div>
            <div class="input-container">
                <label for="email">E-mail</label>
                <input type="text" id="email" name="email" v-model="email" placeholder="Digite seu e-mail">
            </div>
            <div class="input-container">
                <label for="password">Senha</label>
                <input type="password" id="password" name="password" v-model="password" placeholder="Digite sua senha">
            </div>
            <div class="input-container">
                <label for="confirmpassword">Confirme sua senha</label>
                <input type="password" id="confirmpassword" name="confirmpassword" v-model="confirmpassword" placeholder="Digite sua senha novamente">
            </div>
            <InputSubmit :text="btnText"/>
        </form>
    </div>
</template>

<script>


import InputSubmit from './form/InputSubmit.vue';
import Message from './Message.vue';



export default {
    name: "RegisterForm",
    data() {
        return {
            id: this.user._id || null,
            name: this.user.name || null,
            email: this.user.email || null,
            password: null,
            confirmpassword: null,
            msg: null,
            msgClass: null,
        }
    },
    props: ["user", "page", "btnText"],
    components : {
        InputSubmit,
        Message
    },
    methods: {
        async register(e){
            e.preventDefault();//Não faz submição por HTML
            
            const data ={
                name:this.name,
                email: this.email,
                password: this.password,
                confirmpassword: this.confirmpassword
            }

            const jsonData = JSON.stringify(data) // é transformado em um json válido

            //fetch retorna uma promise alternativa ao axios por exemplo
            await fetch("http://localhost:3000/api/auth/register",{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: jsonData
            })
            .then((resp)=>resp.json())
            .then((data)=>{

                let auth = false;

                if(data.error){
                this.msg = data.error;
                this.msgClass = "error";
                } else {
                

                    auth = true;

                    this.msg = data.msg;
                    this.msgClass = "success";

                    // send a event to auth and the user 
                    this.$store.commit("authenticate", { token: data.token, userId: data.userId})

                }

                setTimeout(() => {

                    if(!auth){
                    this.msg = null
                    } else {
                       // redirect
                    this.$router.push("dashboard");
                    }
                    
                }, 2000);


            })
            .catch((err) =>{
                console.log(err)
            })
        },
        async update(e){

            e.preventDefault();

            const data ={
                id: this.id,
                name:this.name,
                email: this.email,
                password: this.password,
                confirmpassword: this.confirmpassword
            }

            const jsonData = JSON.stringify(data) // é transformado em um json válido

            //get token
            const token = this.$store.getters.token;

            await fetch("http://localhost:3000/api/user",{
                method: "PATCH",
                headers: {"content-type":"application/json",
                "auth-token": token 
                },
                body: jsonData
            })
            .then((resp)=>resp.json())
            .then((data)=>{

                if(data.error){
                    this.msg = data.error;
                    this.msgClass = "error";
                } else {

                    this.msg = data.msg;
                    this.msgClass = "success";
                }

                setTimeout(() => {

                    this.msg = null;
                    
                }, 2000);
            })
            .catch((err) =>{
                console.log(err)
            })
            
        }
    }
}
</script>

<style scoped>

#user-form {
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
    text-align: left;
}

input[type="text"], input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid rgb(230,230,230);
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
}

input[type="text"]:focus, input[type="password"]:focus {
    border-color: blueviolet;
    outline: none;
}

label {
    margin-bottom: 5px;
    font-size: 14px;
    color:black;
}

input[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: blueviolet;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

input[type="submit"]:hover {
    background-color: aquamarine; /* Cor de fundo no hover */
    color: black; /* Cor do texto no hover (muda para preto) */
    transform: scale(1.05); /* Leve ampliação no hover */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Sombra mais intensa */
}


</style>
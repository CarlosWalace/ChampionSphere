<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
        <form id="user-form" @submit="page === 'register' ? register($event): update($event) ">
        <!--Verifica se a página é igual ao register-->
            <div class="input-container">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" v-model="name" placeholder="Enter your name">
            </div>
            <div class="input-container">
                <label for="name">E-mail</label>
                <input type="text" id="email" name="email" v-model="email" placeholder="Enter your e-mail">
            </div>
            <div class="input-container">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" v-model="password" placeholder="Enter your password">
            </div>
            <div class="input-container">
                <label for="confirmpassword">Confirm Your Password</label>
                <input type="password" id="confirmpassword" name="confirmpassword" v-model="confirmpassword" placeholder="Confirm password">
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
            name: null,
            email:null,
            password:null,
            confirmpassword:null,
            msg: null,
            msgClass: null
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

            const jasonData = JSON.stringify(data) // é transformado em um json válido

            //fetch retorna uma promise alternativa ao axios por exemplo
            await fetch("http://localhost:3000/api/auth/register",{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: jasonData
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
    border: 1px solid #ccc;
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
    color: #333;
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

input[type="submit"]:hover {
    background-color: aquamarine;
}


</style>
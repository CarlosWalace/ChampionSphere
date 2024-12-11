<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
        <form id="login-form" @submit="login($event)">
            <div class="input-container">
                <label for="email">E-mail:</label>
                <input type="email" name="email" id="email" v-model="email" placeholder="Digite o seu e-mail">
            </div>
            <div class="input-container">
                <label for="password">Senha:</label>
                <input type="password" name="password" id="password" v-model="password" placeholder="Digite sua senha">
            </div>
            <button type="submit" class="submit-btn">Login</button> <!-- Substituído -->
        </form>
    </div>
</template>

<script>
import Message from './Message.vue';

export default {
    name: "LoginForm",
    components: {
        Message
    },
    data() {
        return {
            email: null,
            password: null,
            msg: null,
            msgClass: null
        };
    },
    methods: {
        async login(e) {
            e.preventDefault();

            const data = {
                email: this.email,
                password: this.password
            };

            const jsonData = JSON.stringify(data);

            await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: jsonData
            })
            .then((resp) => resp.json())
            .then((data) => {
                let auth = false;

                if (data.error) {
                    this.msg = data.error;
                    this.msgClass = "error";
                } else {
                    auth = true;
                    this.msg = data.msg;
                    this.msgClass = "success";
                    this.$store.commit("authenticate", { token: data.token, userId: data.userId });
                }

                setTimeout(() => {
                    if (!auth) {
                        this.msg = null;
                    } else {
                        this.$router.push("dashboard");
                    }
                }, 2000);
            });
        }
    }
};
</script>

<style scoped>
#login-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgb(230, 230, 230);
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.input-container {
    display: flex;
    flex-direction: column;
    text-align: left;
}

input[type="email"], input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid rgb(230,230,230);
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
}

input[type="email"]:focus, input[type="password"]:focus {
    border-color: blueviolet;
    outline: none;
}

label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
}

.submit-btn {
    width: 100%;
    padding: 10px;
    background-color: blueviolet;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.2s;
}

.submit-btn:hover {
    background-color: aquamarine;
    transform: scale(1.05);
}
</style>

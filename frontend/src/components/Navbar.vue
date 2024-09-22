<template>
    <div id="nav">
        <router-link to="/" id="logo-container">
        <img src="img/logo.png" alt="ChampionSphere">
        </router-link>
        <h2 id="nav-title">ChampionSphere</h2>
        <div id="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/login" v-show="!authenticated">Login</router-link>
        <router-link to="/register" v-show="!authenticated">Sign-Up</router-link>
        <router-link to="/dashboard" v-show="authenticated">Dashboard</router-link>
        <router-link to="/profile" v-show="authenticated">Profile</router-link>
        <button @click="logout($event)" v-show="authenticated">Logout</button>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';


export default{
    name: "Navbar",
    methods: {
        logout(e){
            
            e.preventDefault();

            //event to lout the user
            this.$store.commit("logout")
            //redirect
            this.$router.push("/")
        }
    },
    //life cicle hoock
    computed: {
        ...mapState([
            "authenticated"
        ])
    }
}
</script>

<style scoped>
#nav{
    display: flex;
    align-items : center;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid blueviolet
}

#nav a {
    text-decoration:dashed;
    margin-right: 10px;
}

#nav img {
    width: 100px;
}

#nav-title {
    font-size:2rem ;
    font-weight: 500;
}

#logo-container, #nav-links{
    width: 300px;
}

#nav-links {
    display: flex;
    justify-content: flex-end;
}

button {
    background-color: blueviolet;
    border: none;
    font-size: 12px;
    cursor: pointer;
}

button:hover{
    color:aquamarine;
}
</style>
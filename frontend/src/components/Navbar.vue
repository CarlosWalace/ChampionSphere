<template>
    <div id="nav">
        <router-link to="/" id="logo-container">
        <img src="img/logo.png" alt="ChampionSphere">
        </router-link>
        <h2 id="nav-title">ChampionSphere</h2>
        <div id="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/about">Login</router-link>
        <router-link to="/register">Sign-Up</router-link>
        </div>
    </div>
</template>

<script>


export default{
    name: "Navbar"
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
    width: 300 px;
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
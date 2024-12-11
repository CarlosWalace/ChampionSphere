<template>
  <header id="nav">
    <!-- Logo -->
    <div id="logo-container">
      <router-link to="/">
        <img src="/img/Logo.png" alt="ChampionSphere">
      </router-link>
    </div>

    <!-- Título -->
    <div id="nav-title">
      <h1>ChampionSphere</h1>
    </div>

    <!-- Links de navegação -->
    <nav id="nav-links">
      <router-link to="/">
        <i class="fas fa-home"></i> Início
      </router-link>
      <router-link to="/login" v-show="!authenticated">
        <i class="fas fa-sign-in-alt"></i> Login
      </router-link>
      <router-link to="/register" v-show="!authenticated">
        <i class="fas fa-user-plus"></i> Registar-se
      </router-link>
      <router-link to="/dashboard" v-show="authenticated">
        <i class="fas fa-tachometer-alt"></i> Painel
      </router-link>
      <router-link to="/profile" v-show="authenticated">
        <i class="fas fa-user"></i> Perfil
      </router-link>
      <button @click="logout($event)" v-show="authenticated">
        <i class="fas fa-sign-out-alt"></i> Sair
      </button>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default{
  name: "Navbar",
  methods: {
    logout(e){
      e.preventDefault();
      // event to logout the user
      this.$store.commit("logout");
      // redirect
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState([
      "authenticated"
    ])
  }
}
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 2px solid blueviolet;
  background-color: rgb(230, 230, 230);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
}

#nav a {
  text-decoration: dashed;
  margin-right: 10px;
}

#nav img {
  width: 100px;
}

#nav-title {
  font-size: 2rem;
  font-weight: 200px;
}

#logo-container, #nav-links {
  width: 400px;
}

#nav-links {
  display: flex;
  justify-content: flex-end;
}

button {
  background-color: rgb(230, 230, 230);
  border: none;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  color: blueviolet
}

@media screen and (max-width: 768px) {
  #footer_content {
    grid_content {
      grid-template-columns: re;
    }
  }
}
</style>

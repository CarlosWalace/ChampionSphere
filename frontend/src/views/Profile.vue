<template>
    <div class="profile">
      <h1>Editar perfil</h1>
      <UserForm page="profile" :user="user" btnText="Edit" :key="componentKey"/>
    </div>
  </template>
  
  <script>
  import UserForm from '../components/UserForm.vue';
  
  export default{
    components:{
      UserForm
    },
    data(){
      return{
        user: {},
        componentKey: 0
      }
    },
    created(){
      //load user
      this.getUser();  
    },
    methods:{
      async getUser() {

       //
       const id = this.$store.getters.userId;
       const token = this.$store.getters.token;

       await fetch(`http://localhost:3000/api/user/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": token
        }
       })
       .then((resp) => resp.json())
       .then((data) => {

        this.user = data.user;
        
       })
       .catch((err) =>{
        console.log(err)       
      })

      }
    }
  }
  </script>
  
  <style scoped>
    .profile{
      text-align: center;
      padding-top: 40px;
      padding: 100px;
    }

    .profile{
      margin-bottom: 40px;
    }

</style>
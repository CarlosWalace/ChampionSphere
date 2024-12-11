
<template>
    <div class="register">
        <h1>Criar Nova Conta</h1>
        <UserForm :user="{}" page="register" btnText="Sign-Up" />
    </div>
</template>

<script>

import UserForm from"../components/UserForm.vue"

export default{
    name:"Register",
    components:{
        UserForm
    }
}
</script>

<style scoped>
    .register {
        text-align: center;
        padding-top: 35px;
        padding-bottom: 100px;
    }

    .register.h1 {
    margin-bottom: 40px;
    }
</style>


<template>
    <div>
        <form action ="" id="user-form">
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
            
        </form>
    </div>
    <InputSubmit :text="btnText"/>
</template>

<script>


import InputSubmit from './form/InputSubmit.vue';


export default {
    name: "RegisterForm",
    data() {
        return {
            name: null,
            email:null,
            password:null,
            confirmpassword:null,
            btnText:"sign up"
        }
    },
    components : {
        InputSubmit
    }
}
</script>

<style scoped>

</style>
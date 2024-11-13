<template>
   <p class="msg" :class="msgClass" v-if="msg">{{ msg }}</p>
</template>

<script>
export default {
   name: "Message",
   props: ["msg","msgClass"]
}
</script>

<style scoped>
.msg {
   max-width: 500px;
   margin: 20px auto;
   padding: 20px;
   text-align: center;
   border: 1px solid rgb(11, 11, 11);
   border-radius: 5px;
}

.success {
   color: green;
   background-color:rgb(130, 255, 130);
   border-color: rgb(130, 255, 130);
   border-radius: 5px;
}

.error {
   color: red;
   background-color:rgb(250, 130, 130);
   border-color: rgb(250, 130, 130);
   border-radius: 5px;
}
</style>


<template>
  <form class="sign-in__container">
    <Login/>
    <Password/>
    <div class="password-confirmation">
    <label>Password confirmation</label>
    <input name="password-confirmation"/>
    </div>
  </form>
</template>
<script setup>
import Login from "../shared/Login.vue";
import Password from "../shared/Password.vue";
</script>
<style scoped>
.sign-in__container {
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

}

</style>
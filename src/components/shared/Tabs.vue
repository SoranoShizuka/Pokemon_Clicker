<template>
  <div class="btn">
  <a href="#" class="link" @click="handleClick">Sign in</a>
  </div>
  <div class="btn">
  <a href="#" class="link">Sign up</a>
  </div>
</template>
<script setup>
import {ref} from "vue";
import SignIn from "../pages/SignIn.vue";

</script>
<style scoped>
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.link {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 12px 0;
  text-decoration: none;
  color: #000000;
  position: relative;
}
.link:hover {
  color: #365FAC;
}
.link:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -12px;
  height: 2px;
  background-color: #365FAC;
}
</style>
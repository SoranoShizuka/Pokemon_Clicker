<template>
  <button type="submit">
    <slot :info="buttonInfo"></slot>
  </button>
</template>
<script lang="ts">
import {ref} from "vue";
const buttonInfo = ref({
  signUp: 'Sign Up',
  signIn: 'Sign In',
});
</script>
<style scoped>
button {
  background-color: #365FAC;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #224f9e;
}
</style>
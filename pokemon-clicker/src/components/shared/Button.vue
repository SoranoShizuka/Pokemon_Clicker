<template>
  <button type="submit">
    <slot :buttonInfo="buttonInfo"></slot>
  </button>
</template>
<script lang="ts">
import { ref } from "vue";
const buttonInfo = ref({
  signUp: "Sign Up",
  signIn: "Sign In",
});
</script>
<style scoped></style>

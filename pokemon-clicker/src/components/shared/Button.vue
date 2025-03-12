<template>
  <button type="submit">
    <slot :buttonInfo="buttonInfo"></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Button",
  emits: ["showPokemon"],
  setup() {
    const buttonInfo = ref({
      signUp: "Sign Up",
      signIn: "Sign In",
    });
    return {
      buttonInfo,
    };
  },
});
</script>
<style scoped></style>

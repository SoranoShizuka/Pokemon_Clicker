<template>
    <div class="pokemon-container">
      <Images/>
      <LoginRegisterPage/>
    </div>
</template>
<script lang="ts">

import {defineComponent} from "vue";
import LoginRegisterPage from "./pages/LoginRegisterPage.vue";
import Images from "./shared/Images.vue"
export default defineComponent({
  components: {LoginRegisterPage, Images}
})
</script>
<style scoped>
.pokemon-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 195px 520px;
  gap: 20px;
  flex-direction: column;
}
</style>

<template>
  <div class="pokemon-container">
    <Images/>
    <LoginRegisterPage/>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import LoginRegisterPage from "@/components/pages/LoginRegisterPage.vue";
import Images from '@/components/shared/Images.vue'
export default defineComponent({
  components: {Images, LoginRegisterPage}
})
</script>
<style scoped>
.pokemon-container {
  width: 440px;
  display: flex;
  justify-content: center;
  margin: 195px 520px;
  gap: 20px;
  flex-direction: column;
}
</style>

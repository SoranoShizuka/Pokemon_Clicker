<template>
    <div class="pokemon-container">
    <Images/>
    <Authorisation/>
    </div>
</template>
<script setup>
import Images from "./components/shared/Images.vue";
import Authorisation from "./components/pages/Authorisation.vue";
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

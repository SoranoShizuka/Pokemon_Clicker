<template>
  <div class="pokemon-container">
    <div class="images">
      <img src="./img/pokemon.png" />
      <div class="border"></div>
      <img src="./img/clicker.png" />
    </div>
    <router-view />
  </div>
</template>
<script lang="ts"></script>
<style scoped>
.pokemon-container {
  width: 440px;
  display: flex;
  justify-content: center;
  margin: 195px 520px;
  gap: 20px;
  flex-direction: column;
}
.images {
  width: 328px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 0 35px;
}
.border {
  border: 2px solid #efefef;
}
</style>

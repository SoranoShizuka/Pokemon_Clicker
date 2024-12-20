<template>
  <!-- Линия под активной вкладкой -->
  <div class="indicator"></div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.indicator {
  height: 2px;
  background-color: #365FAC;
  width: 47px;
  transition: transform 0.3s ease-in-out;
}
</style>
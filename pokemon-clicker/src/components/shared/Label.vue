<template>
  <label>
    <span :class="{ required: props.required }"></span>
    <slot />
  </label>
</template>
<script setup lang="ts">
const props = defineProps(["required"]);
</script>
<style scoped>
input {
  display: flex;
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 2px;
  gap: 24px;
}
.required::after {
  content: " *";
  color: red;
  margin-right: 5px;
}
</style>

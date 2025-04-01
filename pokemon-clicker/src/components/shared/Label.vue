<template>
  <label>
    <span :class="{ required: required }"></span>
    <slot />
  </label>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Label",
  setup() {
    /* нужно, чтобы иметь
    доступ к required через props.required
    */
    const props = defineProps<{
      required: boolean;
    }>();
    return { ...props };
  },
});
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

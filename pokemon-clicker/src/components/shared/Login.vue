<template>
  <span class="gap">
  <RedStar/>
    <span>Login</span>
  </span>
  <input type="login" placeholder="Input login"/>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";
import RedStar from "../shared/RedStar.vue";
export default defineComponent({
  components: {RedStar},
})

</script>
<style scoped>
input {
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 2px;
  gap: 24px;
}
.gap {
  display: flex;
  gap: 5px;
}
</style>
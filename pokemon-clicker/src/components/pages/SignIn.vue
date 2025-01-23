<template>
  <!-- Здесь будет форма входа -->
  <form>
    <Label title="login" :required="true">
      <span class="text">Login</span>
      <input
        type="login"
        placeholder="input login"
        v-model="signInData.login"
      />
    </Label>
    <Label title="password" :required="true">
      <span class="text">Password</span>
      <input
        type="password"
        placeholder="input password"
        v-model="signInData.password"
      />
    </Label>
    <Button>
      <span>Sign In</span>
    </Button>
  </form>
</template>
<script>
import { defineComponent, ref } from "vue";
import Button from "../shared/Button.vue";
import Label from "../shared/Label.vue";
export default defineComponent({
  components: { Label, Button },
  name: "SignIn",
  setup() {
    const signInData = ref({ login: "", password: "" });
    return {
      signInData,
    };
  },
});
</script>
<style scoped>
form {
  display: flex;
}
input {
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 2px;
  gap: 24px;
  width: 95%;
}
.gap {
  display: flex;
  gap: 5px;
}
.required {
  color: red;
}
button {
  background-color: #365fac;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #224f9e;
}
</style>

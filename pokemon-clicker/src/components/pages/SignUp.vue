<template>
    <!-- Здесь будет форма регистрации -->
    <form>
      <span class="gap">
      <span class="required">*</span>
      <span class="text">Login</span>
      </span>
      <Input type="login"
             placeholder="input login"
             v-model="signUpData.login">
      </Input>
      <span class="gap">
      <span class="required">*</span>
      <span class="text">Password</span>
      </span>
      <Input type="password"
             placeholder="input password"
             v-model="signUpData.password">
      </Input>
      <span class="gap">
      <span class="required">*</span>
      <span class="text">Password confirmation</span>
      </span>
      <Input type="password"
             placeholder="input password again"
             v-model="signUpData.password_confirmation">
      </Input>
      <Button>
        <span>Sign Up</span>
      </Button>
    </form>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";
import Button from "../shared/Button.vue"
import Input from "../shared/Input.vue";
export default defineComponent({
  components: {Input, Button},
  name: "SignUp",
  setup() {
    const signUpData = ref({ login: "", password: "", password_confirmation: "" });
    return {
      signUpData,
    };
  },
})

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
}
.gap {
  display: flex;
  gap: 5px;
}
.required {
  color: red;
}
button {
  background-color: #365FAC;
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
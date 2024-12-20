<template>
    <!-- Здесь будет форма регистрации -->
    <form>
      <Login v-model="signUpData.login"/>
      <Password v-model="signUpData.password"/>
      <PasswordConfirm v-model="signUpData.password_confirmation"/>
      <BlueButton>
        <span>Sign Up</span>
      </BlueButton>
    </form>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";
import Login from "../shared/Login.vue";
import Password from "../shared/Password.vue";
import PasswordConfirm from "../shared/PasswordConfirm.vue";
import BlueButton from "../shared/BlueButton.vue"
export default defineComponent({
  components: {Login, Password, PasswordConfirm, BlueButton},
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
  flex-direction: column;
}
</style>
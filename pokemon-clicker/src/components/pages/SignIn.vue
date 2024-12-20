<template>
    <!-- Здесь будет форма входа -->
      <form>
        <Login v-model="signInData.login"/>
        <Password v-model="signInData.password"/>
        <BlueButton #default="{ info }">
          <span>Sign In</span>
        </BlueButton>
      </form>
</template>
<script>
import {defineComponent, ref} from "vue";
import Login from "../shared/Login.vue";
import Password from "../shared/Password.vue";
import BlueButton from "../shared/BlueButton.vue";
export default defineComponent({
  components: {Password, Login, BlueButton},
  name: "SignIn",
  setup() {
    const signInData = ref({ login: "", password: "" });
    return {
      signInData,
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
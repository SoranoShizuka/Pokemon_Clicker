<template>
  <div class="auth-container">
    <div class="tabs-border-bottom">
    <!-- Вкладки -->
    <div class="tabs">
      <span
          :class="['tab', { active: currentTab === 'signup' }]"
          @click="setTab('signup')">
        Sign up
      </span>
      <span
          :class="['tab', { active: currentTab === 'signin' }]"
          @click="setTab('signin')">
        Sign in
      </span>
    </div>
      <BlueIndicator :style="indicatorStyle"/>
    </div>
    <!-- Содержимое вкладок -->
    <div class="tab-content">
      <div class="currentTab" v-if="currentTab === 'signup'">
        <router-link
            v-model="signUpData"
            @submit.prevent="onSubmitSignUp"
            to="/login">
        </router-link>
      </div>
      <div class="currentTab" v-if="currentTab === 'signin'">
        <router-link
            @submit.prevent="onSubmitSignIn"
            to="/register">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import BlueIndicator from "../shared/BlueIndicator.vue";
export default defineComponent({
  components: {BlueIndicator, SignUp, SignIn},
  name: "AuthTabs",
  setup() {
    const slots = ref([
      'Login',
      'Password',
      'PasswordConfirm',
    ]);
    // Текущая активная вкладка
    const currentTab = ref<"signup" | "signin">("signup");

    // Данные форм
    const signUpData = ref({ login: "", password: "", password_confirmation: "" });
    const signInData = ref({ login: "", password: "" });

    // Стиль индикатора для подчеркивания активной вкладки
    const indicatorStyle = computed(() => {
      return {
        transform: currentTab.value === "signup" ? "translateX(102px)" : "translateX(184px)",
      };
    });

    // Обработчики переключения вкладок
    const setTab = (tab: "signup" | "signin") => {
      currentTab.value = tab;
    };

    // Обработка отправки форм
    const onSubmitSignUp = () => {
      console.log("Sign Up Data:", signUpData.value);
      // Логика отправки данных для регистрации
    };

    const onSubmitSignIn = () => {
      console.log("Sign In Data:", signInData.value);
      // Логика отправки данных для входа
    };

    return {
      currentTab,
      setTab,
      indicatorStyle,
      signUpData,
      signInData,
      onSubmitSignUp,
      onSubmitSignIn,
    };
  },
});
</script>

<style scoped>
.auth-container {
  width: 352px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  gap: 16px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 0 16px 0 rgba(58, 58, 58, 0.1);
  background: #FFFFFF;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
}
.tabs {
  display: flex;
  margin: 0 100px;
  position: relative;
  gap: 32px;
}
.tabs-border-bottom {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #0000000F;
}
.tab {
  cursor: pointer;
  font-size: 16px;
  color: #000000;
}
.tab.active {
  color: #365FAC;
}
.tab-content {
  width: 352px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}
form {
  display: flex;
  flex-direction: column;
}
input {
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 2px;
}
</style>

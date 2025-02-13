<template>
  <div class="auth-container">
    <div class="tabs-border-bottom">
      <!-- Вкладки -->
      <div class="tabs">
        <router-link
          to="/auth/sign-up"
          :class="['tab', { active: currentTab === 'sign-up' }]"
          @click="setTab('sign-up')"
        >
          Sign up
        </router-link>
        <router-link
          to="/auth/sign-in"
          :class="['tab', { active: currentTab === 'sign-in' }]"
          @click="setTab('sign-in')"
        >
          Sign in
        </router-link>
      </div>
      <Tabs
        :style="indicatorStyle"
        items="[{ name: 'Sign In', link: '/auth/sign-in'}]' },
            { name: 'Sign Up', link: '/auth/sign-up' }]"
      />
    </div>
    <!-- Содержимое вкладок -->
    <div class="tab-content">
      <div class="currentTab">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import Tabs from "@/components/shared/Tabs.vue";
export default defineComponent({
  components: { Tabs, SignUp, SignIn },
  name: "AuthTabs",
  setup() {
    const slots = ref(["Login", "Password", "PasswordConfirm"]);
    // Текущая активная вкладка
    const currentTab = ref<"sign-up" | "sign-in">("sign-up");

    // Данные форм
    const signUpData = ref({
      login: "",
      password: "",
      password_confirmation: "",
    });
    const signInData = ref({ login: "", password: "" });

    // Стиль индикатора для подчеркивания активной вкладки
    const indicatorStyle = computed(() => {
      return {
        transform:
          currentTab.value === "sign-up"
            ? "translateX(102px)"
            : "translateX(184px)",
      };
    });

    // Обработчики переключения вкладок
    const setTab = (tab: "sign-up" | "sign-in") => {
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
  background: #ffffff;
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
  border-bottom: 1px solid #0000000f;
}
.tab {
  cursor: pointer;
  font-size: 16px;
  color: #000000;
}
.tab.active {
  color: #365fac;
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
router-link,
router-link-active {
  text-decoration: none; /* Убирает подчеркивание */
  color: inherit; /* Наследует цвет текста */
}

router-link:hover {
  text-decoration: none; /* Убирает подчеркивание при наведении */
}
</style>

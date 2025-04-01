<template>
  <div class="pokemon-container">
    <div class="images">
      <img src="/pokemon.png" />
      <div class="border"></div>
      <img src="/clicker.png" />
    </div>
    <div class="auth-container">
      <div class="tabs-border-bottom">
        <!-- Вкладки -->
        <div class="tabs">
          <router-link
            to="/auth/sign-up"
            :class="{ active: currentTab === 'sign-up' }"
            @click="setTab('sign-up')"
          >
            Sign up
          </router-link>
          <router-link
            to="/auth/sign-in"
            :class="{ active: currentTab === 'sign-in' }"
            @click="setTab('sign-in')"
          >
            Sign in
          </router-link>
        </div>
        <Tabs
          class="indicator"
          :style="indicatorStyle"
          items="[{ name: 'Sign In', link: '/auth/sign-in'}',
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import Tabs from "@/components/shared/IndicatorTabs.vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  components: { Tabs, SignUp, SignIn },
  name: "AuthTabs",
  setup() {
    const slots = ref(["Login", "Password", "PasswordConfirm"]);
    // Текущая активная вкладка
    const router = useRouter();
    const route = useRoute();
    const tabs = ["sign-up", "sign-in"];
    const currentTab = computed(() => {
      const path = route.path.split("/").pop();
      return path || "sign-in";
    });

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
            ? "translateX(100px)"
            : "translateX(177px)",
      };
    });

    // Обработчики переключения вкладок
    const setTab = (tab: "sign-up" | "sign-in") => {
      router.push(`/auth/${tab}`);
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
.pokemon-container {
  width: 440px;
  display: flex;
  justify-content: center;
  margin: 195px 520px;
  gap: 20px;
  flex-direction: column;
}
.images {
  width: 328px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 0 35px;
}
.border {
  border: 2px solid #efefef;
}
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
a {
  color: #365fac;
  text-decoration: none;
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
  color: #365fac; /* Наследует цвет текста */
}

router-link:hover {
  text-decoration: none; /* Убирает подчеркивание при наведении */
}
</style>

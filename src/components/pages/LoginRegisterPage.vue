<template>
  <div class="auth-container">
    <!-- Вкладки -->
    <div class="tabs">
      <span
          :class="['tab', { active: currentTab === 'signup' }]"
          @click="setTab('signup')"
      >
        Sign up
      </span>
      <span
          :class="['tab', { active: currentTab === 'signin' }]"
          @click="setTab('signin')"
      >
        Sign in
      </span>
    </div>
    <!-- Линия под активной вкладкой -->
    <div class="indicator" :style="indicatorStyle"></div>
    <!-- Содержимое вкладок -->
    <div class="tab-content">
      <div v-if="currentTab === 'signup'">
        <!-- Здесь будет форма регистрации -->
        <form @submit.prevent="onSubmitSignUp">
          <span class="text">
          <span class="text-star">*</span>
          <span class="text-subtitle">Login</span>
          </span>
          <input
              type="login"
              placeholder="Input login"
              v-model="signUpData.login" />
          <span class="text">
          <span class="text-star">*</span>
          <span class="text-subtitle">Password</span>
          </span>
          <input
              type="password"
              placeholder="Input password"
              v-model="signUpData.password"
          />
          <span class="text">
          <span class="text-star">*</span>
          <span class="text-subtitle">Password confirmation</span>
          </span>
          <input
              type="password"
              placeholder="Input password again"
              v-model="signUpData.passwordConfirm" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div v-if="currentTab === 'signin'">
        <!-- Здесь будет форма входа -->
        <form @submit.prevent="onSubmitSignIn">
          <span class="text">
          <span class="text-star">*</span>
          <span class="text-subtitle">Login</span>
          </span>
          <input
              type="login"
              placeholder="Input login"
              v-model="signInData.login" />
          <span class="text">
          <span class="text-star">*</span>
          <span class="text-subtitle">Password</span>
          </span>
          <input
              type="password"
              placeholder="Input password"
              v-model="signInData.password"
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "AuthTabs",
  setup() {
    // Текущая активная вкладка
    const currentTab = ref<"signup" | "signin">("signup");

    // Данные форм
    const signUpData = ref({ login: "", password: "" , passwordConfirm: "" });
    const signInData = ref({ login: "", password: "" });

    // Стиль индикатора для подчеркивания активной вкладки
    const indicatorStyle = computed(() => {
      return {
        transform: currentTab.value === "signup" ? "translateX(115px)" : "translateX(210px)",
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
  width: 440px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  gap: 10px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 0 16px 0 rgba(58, 58, 58, 0.1);
  background: #FFFFFF;
  font-family: Roboto,sans-serif;
  font-weight: 400;
  font-size: 14px;

}
.tabs {
  display: flex;
  margin: 0 115px;
  position: relative;
}

.tab {
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  color: #000000;
}
.tab.active {
  color: #365FAC;
}
.indicator {
  height: 3px;
  background-color: #365FAC;
  width: 20%;
  transition: transform 0.3s ease-in-out;
}
.tab-content {
  width: 400px;
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
  border-radius: 4px;
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
.text {
  display: flex;
  gap: 5px;
}
.text-star {
  color: red;
}
</style>

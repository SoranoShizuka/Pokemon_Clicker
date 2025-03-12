<template>
  <div class="container">
    <form @submit.prevent="submitSignIn">
      <Label title="email" :required="true">
        <span class="text">Email</span>
        <input
          type="text"
          placeholder="input email"
          v-model="signInData.email"
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
      <Button type="submit" @click="handleSignInClick">
        <span>{{ loading ? "Submitting..." : "Sign In" }}</span>
      </Button>
    </form>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import Button from "../shared/Button.vue";
import Label from "../shared/Label.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: { Label, Button },
  name: "SignIn",
  setup() {
    const router = useRouter();
    const signInData = ref({ email: "", password: "" });
    const loading = ref(false);
    const currentPokemon = ref(null);

    // сохранение email текушего пользователя в локалсторежд
    const saveUserEmail = (email) => {
      localStorage.setItem("email", email);
    };

    // получение email текушего пользователя из локалстредж
    const getUserEmail = () => {
      return localStorage.getItem("email");
    };

    // проверка и загрузка покемона при входе
    const loadOrAssignPokemonForUser = async (email) => {
      saveUserEmail(email); // сохранение email пользователя
      const storageKey = `pokemon_${email}`;
      const storedPokemon = localStorage.getItem(storageKey);
      if (storedPokemon) {
        currentPokemon.value = JSON.parse(storedPokemon);
        console.log(`Loaded pokemon for user ${email}:`, currentPokemon.value);
      } else {
        console.log(`No pokemon found for user ${email}`);
      }
      router.push({ name: "pokemon-game" });
    };

    // получение покемона текущего пользователя
    const getPokemonForCurrentUser = () => {
      const email = getUserEmail();
      if (!email) return null;

      const storageKey = `pokemon_${email}`;
      const storedPokemon = localStorage.getItem(storageKey);

      return storedPokemon ? JSON.parse(storedPokemon) : null;
    };

    const handleSignInClick = async () => {
      const email = signInData.value.email;
      if (!email || !signInData.value.password) {
        alert("provide both email and password");
        return;
      }
      await submitSignIn();
      if (!loading.value) {
        await loadOrAssignPokemonForUser(email);
      }
    };

    const submitSignIn = async () => {
      loading.value = true;
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await fetch(`${API_BASE_URL}/auth/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInData.value),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.message || "Sign-in failed";
          alert(`error: ${errorMessage}`);
          throw new Error(errorMessage);
        }
        alert("sign-in successful!");
      } catch (error) {
        console.error("Error during sign-in:", error);
      } finally {
        loading.value = false;
      }
    };
    return {
      signInData,
      handleSignInClick,
      submitSignIn,
      loading,
      currentPokemon,
      getPokemonForCurrentUser,
      loadOrAssignPokemonForUser,
    };
  },
});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
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

<template>
  <div class="container">
    <form @submit.prevent="submitSignUp">
      <Label title="companyName" :required="true">
        <span class="text">Company name</span>
        <input
          type="text"
          placeholder="input company name"
          v-model="signUpData.companyName"
          required
        />
      </Label>
      <Label title="userName" :required="true">
        <span class="text">User name</span>
        <input
          type="text"
          placeholder="input user name"
          v-model="signUpData.userName"
          required
        />
      </Label>
      <Label title="email" :required="true">
        <span class="text">Email</span>
        <input
          type="text"
          placeholder="input email"
          v-model="signUpData.email"
          required
        />
      </Label>
      <Label title="password" :required="true">
        <span class="text">Password</span>
        <input
          type="password"
          placeholder="input password"
          v-model="signUpData.password"
          required
        />
      </Label>
      <Button type="submit" :disabled="loading" @click="handleSignUpClick">
        <span>{{ loading ? "Submitting..." : "Sign Up" }}</span>
      </Button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../shared/Button.vue";
import Label from "../shared/Label.vue";
import type { Pokemon } from "@/stores/typesStore.ts";
export default defineComponent({
  components: { Button, Label },
  setup() {
    const pokemonList = ref<Pokemon[]>([]);
    const router = useRouter();
    const signUpData = ref({
      companyName: "",
      userName: "",
      email: "",
      password: "",
    });
    // Индикатор загрузки для отображения состояния ожидания
    const loading = ref(false);

    // сохранение email текушего пользователя в локалсторежд
    const saveUserEmail = (email) => {
      localStorage.setItem("email", email);
    };

    // получение email текушего пользователя из локалстредж
    const getUserEmail = () => {
      return localStorage.getItem("email");
    };

    // сохранение покемона в локалсторедж
    const savePokemonForUser = (email, pokemon) => {
      const storageKey = `pokemon_${email}`;
      localStorage.setItem(storageKey, JSON.stringify(pokemon));
    };

    // получение покемона по email
    const getPokemonForUser = (email) => {
      const storageKey = `pokemon_${email}`;
      const storedPokemon = localStorage.getItem(storageKey);
      return storedPokemon ? JSON.parse(storedPokemon) : null;
    };

    // Функция перехода к экрану игры
    const openGamePage = () => {
      router.push({ name: "pokemon-game" });
    };

    // Функция обработки клика по регистрации и назначения покемона
    const handleSignUpClick = async () => {
      const email = signUpData.value.email.trim();
      if (!email) {
        alert("Please provide a valid email.");
        return;
      }
      const isRegistered = await submitSignUp();
      if (isRegistered) {
        saveUserEmail(email);
        let pokemon = getPokemonForUser(email);
        if (!pokemon) {
          const assigned = await assignPokemonToUser(email);
          if (assigned) {
            openGamePage();
          } else {
            alert("Failed to assign a Pokémon. Please try again.");
          }
        } else {
          openGamePage();
        }
      }
    };

    // регистрация пользователя
    const submitSignUp = async () => {
      loading.value = true;
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      if (
        !signUpData.value.companyName ||
        !signUpData.value.userName ||
        !signUpData.value.email ||
        !signUpData.value.password
      ) {
        alert("Please fill all fields.");
        loading.value = false;
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/sign-up`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData.value),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.message || "Registration failed";
          if (errorMessage.includes("User already exists")) {
            alert("This user already exists. Please use a different email.");
          } else {
            alert(`Error: ${errorMessage}`);
          }
          return false;
        }

        alert("Registration successful!");
        return true;
      } catch (error) {
        console.error("Error during registration:", error);
      } finally {
        loading.value = false;
      }
    };

    // Назначение покемона пользователю
    const assignPokemonToUser = async (email) => {
      try {
        const API_POKEMON = import.meta.env.VITE_API_POKEMON;
        const randomId = Math.floor(Math.random() * 1000) + 1;
        const response = await fetch(`${API_POKEMON}/pokemon/${randomId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch pokemon");
        }

        const data = await response.json();
        const pokemon = [
          {
            name: data.name,
            image: data.sprites.front_default,
            weight: data.weight,
            moneyPerSec: data.weight,
          },
        ];
        savePokemonForUser(email, pokemon);
        console.log(`Pokemon assigned to ${email}:`, pokemon);
        return true;
      } catch (error) {
        console.error("Error fetching pokemon:", error);
        return false;
      }
    };

    return {
      pokemonList,
      signUpData,
      handleSignUpClick,
      submitSignUp,
      loading,
      getPokemonForUser,
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
.text {
  color: black;
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
button {
  transition: background-color 0.3s;
}
button:hover {
  background-color: #2563eb;
}
</style>

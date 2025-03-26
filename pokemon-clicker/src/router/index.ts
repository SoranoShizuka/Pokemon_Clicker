import { createRouter, createWebHistory } from "vue-router";
import SignIn from "@/components/pages/SignIn.vue";
import SignUp from "@/components/pages/SignUp.vue";
import AuthLayout from "@/components/pages/AuthLayout.vue";
import pokemonGame from "@/components/pages/PokemonGame.vue";
import PokemonSettings from "@/components/shared/PokemonSettings.vue";
import PokemonFeed from "@/components/shared/PokemonFeed.vue";
import PokemonStats from "@/components/shared/PokemonStats.vue";

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "/auth/sign-in", name: "SignIn", component: SignIn },
      { path: "/auth/sign-up", name: "SignUp", component: SignUp },
    ],
  },
  {
    path: "/pokemon-game",
    name: "pokemon-game",
    component: pokemonGame,
  },
];
// Создание роутера
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

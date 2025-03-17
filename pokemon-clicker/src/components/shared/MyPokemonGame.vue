<template>
  <div class="my-pokemon_container">
    <span class="my-pokemon_text">
      <p class="title">My Pokemons</p>
      <button
        @click="isOpen = !isOpen"
        class="btn"
        :class="{ open: isOpen }"
      ></button>
    </span>
    <div class="my-pokemon" v-if="isOpen">
      <div
        class="my-pokemon_card"
        v-for="pokemon in pokemons"
        :key="pokemon.id"
      >
        <div class="my-pokemon_card-setting">
          <p class="my-pokemon_name">
            {{ pokemon.name }}
          </p>
          <img
            class="my-pokemon_settings-image"
            src="C:\Users\vklus\Рабочий стол\Pokemon_Clicker\pokemon-clicker\src\img\setting.png"
          />
        </div>
        <img
          class="my-pokemon_image"
          width="140"
          height="140"
          :src="pokemon.image"
        />
        <div class="my-pokemon_card-text">
          <span>Вес</span>
          <span>{{ pokemon.weight }}</span>
        </div>
        <div class="my-pokemon_card-text">
          <span>Денег/сек</span>
          <span>{{ pokemon.moneyPerSec }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore.ts";
import { useBalanceStore } from "@/stores/balanceStore.ts";

interface Pokemon {
  name: string;
  image: string;
  weight: number;
  moneyPerSec: number;
}

export default {
  setup() {
    const isOpen = ref(false);
    const pokemonStore = usePokemonStore();
    const balanceStore = useBalanceStore();

    onMounted(() => {
      pokemonStore.loadPokemons();
      if (pokemonStore.pokemons.length > 0) {
        // беру первого покемона и добавляем 6 копий этого покемона
        pokemonStore.addSixPokemons(pokemonStore.pokemons[0]); // Добавляем 6 копий первого покемона
      }
      balanceStore.startEarning();
    });

    onUnmounted(() => {
      balanceStore.stopEarning();
    });

    return {
      isOpen,
      pokemons: computed(() => pokemonStore.pokemons),
      totalBalance: balanceStore.totalBalance,
    };
  },
};
</script>
<style scoped>
.my-pokemon_container {
  display: flex;
  flex-direction: column;
  width: 50%;
  box-shadow: 0px 0px 16px 0px #3a3a3a1a;
  border-radius: 16px;
  position: relative;
}
.my-pokemon_text {
  display: flex;
  margin: 16px;
  gap: 430px;
}
.title {
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #ffcc01;
  text-shadow:
    2px 2px 0 #365fac,
    -2px 2px 0 #365fac,
    2px -2px 0 #365fac,
    -2px -2px 0 #365fac,
    2px 0px 0 #365fac,
    -2px 0px 0 #365fac,
    0px 2px 0 #365fac,
    0px -2px 0 #365fac;
}
.btn {
  border: none;
  background: transparent;
  border-radius: 2px;
  position: relative;
  right: 0;
  top: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.btn::before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-right: 3px solid #365fac;
  border-bottom: 3px solid #365fac;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

.btn.open::before {
  transform: rotate(225deg);
}
.my-pokemon {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin: 16px;
  gap: 12px;
}
.my-pokemon_card {
  display: flex;
  margin: 16px;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0px 0px 16px 0px #3a3a3a1a;
  border-radius: 16px;
}
.my-pokemon_card-setting {
  display: flex;
  flex-direction: row;
  margin: 12px 12px 8px 12px;
  gap: 60px;
  justify-content: center;
  align-items: center;
}
.my-pokemon_name {
  margin: 0;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
}
.my-pokemon_settings-image {
  width: 20px;
  height: 20px;
}
.my-pokemon_image {
  margin: 8px 12px;
}
.my-pokemon_card-text {
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 0px 8px 8px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
}
</style>

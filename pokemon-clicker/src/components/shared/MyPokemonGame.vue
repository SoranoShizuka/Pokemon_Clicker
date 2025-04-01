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
          <button class="btn-settings" @click="isOpenSettings(pokemon)">
            <img class="my-pokemon_settings-image" src="/setting.png" />
          </button>
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
    <PokemonSettings
      v-if="isModalOpen"
      :pokemon="selectedPokemon"
      @close="isModalOpen = false"
      :email="email"
      @feed="feedPokemon"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore.ts";
import { useBalanceStore } from "@/stores/balanceStore.ts";
import PokemonSettings from "@/components/shared/PokemonSettings.vue";
import type { Pokemon } from "@/stores/typesStore.ts";

export default defineComponent({
  name: "MyPokemonGame",
  components: { PokemonSettings },
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const pokemonStore = usePokemonStore();
    const balanceStore = useBalanceStore();
    const selectedPokemon = ref(null);
    const isModalOpen = ref(false);

    const email = ref("");
    const storageKey = `pokemon_${email}`;
    onMounted(() => {
      email.value = localStorage.getItem(storageKey) || "default@gmail.com";
    });

    const isOpenSettings = (pokemon: any) => {
      console.log("выбранный покемон:", pokemon);
      if (!pokemon.id) {
        console.error("у этого покемона нет id!", pokemon);
      }
      selectedPokemon.value = { ...pokemon };
      isModalOpen.value = true;
    };

    onMounted(async () => {
      await pokemonStore.loadPokemons(); // дожидаюсь загрузки покемонов

      if (pokemonStore.pokemons.length > 0) {
        console.log(
          "покемоны загружены, добавляем 6 копий",
          pokemonStore.pokemons[0],
        );
        pokemonStore.addSixPokemons(pokemonStore.pokemons[0]);
      } else {
        console.error("покемоны не загружены!");
      }

      balanceStore.startEarning();
    });

    const openModal = (pokemon: Pokemon) => {
      selectedPokemon.value = { ...pokemon }; // копирую объект покемона с id
      isModalOpen.value = true;
    };

    // Метод для увеличения веса покемона
    const feedPokemon = (pokemon: any, weightIncrease: number) => {
      console.log("начинаю кормление:", pokemon.id, "на", weightIncrease, "кг");

      const updatedPokemon = pokemonStore.pokemons.find(
        (p) => p.id === pokemon.id,
      );
      if (!updatedPokemon) {
        console.error("покемон не найден в store!", pokemon);
        return;
      }

      updatedPokemon.weight += weightIncrease; // увеличивается вес покемона
      pokemonStore.updatePokemons(updatedPokemon);

      console.log("Новый вес:", updatedPokemon.weight);
    };

    return {
      isOpen,
      pokemons: computed(() => pokemonStore.pokemons),
      totalBalance: balanceStore.totalBalance,
      selectedPokemon,
      isOpenSettings,
      isModalOpen,
      storageKey,
      feedPokemon,
      openModal,
    };
  },
});
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
.btn-settings {
  display: flex;
  border: none;
  background: none;
  cursor: pointer;
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

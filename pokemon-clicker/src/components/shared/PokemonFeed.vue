<template>
  <div class="settings_feed">
    <div class="feed-item" v-for="(berry, index) in berries" :key="index">
      <img class="feed-img" :src="berry.image" width="59px" height="59px" />
      <div class="feed-text">
        <h2>Ягода {{ berry.name }} уровня</h2>
        <p>Накорми ей покемона для увеличения веса на {{ berry.weight }} кг</p>
      </div>
      <button class="settings-btn" @click="feedPokemon(berry.weight)">
        Накормить
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import type { Berry } from "@/stores/typesStore.ts";

export default defineComponent({
  name: "PokemonFeed",
  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
  },
  emits: ["feed"],
  setup(props, { emit }) {
    const berries = ref<Berry[]>([]);
    const API_GET_BERRY = "https://pokeapi.co/api/v2/berry/";

    // Функция для загрузки данных ягод с использованием fetch
    const loadBerries = async () => {
      try {
        const response = await fetch(`${API_GET_BERRY}`);
        if (!response.ok) {
          throw new Error("Не удалось загрузить данные");
        }
        const data = await response.json();

        // проверяю, что в data есть ключ "results", который является массивом
        if (Array.isArray(data.results)) {
          // обрабатываю каждый элемент массива
          berries.value = data.results.slice(0, 3).map((berry: any) => ({
            name: berry.name,
            weight: 1,
            image: "/berry.png",
          }));
        } else {
          console.error("данные не содержат ожидаемого массива results");
        }
      } catch (error) {
        console.error("ошибка при загрузке данных ягод:", error);
      }
    };

    // Загружаю ягоды при монтировании компонента
    onMounted(() => {
      loadBerries();
    });

    const feedPokemon = (weight: number) => {
      console.log("покормить покемона на", weight, "кг");
      emit("feed", props.pokemonId, weight);
    };

    return { berries, feedPokemon };
  },
});
</script>

<style scoped>
p,
h2 {
  margin: 0;
  padding: 0;
}
h2 {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
}
.settings_feed {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 256px);
  grid-template-rows: repeat(2, 161px);
  gap: 12px;
}
.feed-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-radius: 16px;
  gap: 10px;
  padding: 12px;
  box-shadow: 0px 0px 16px 0px #3a3a3a1a;
}
.feed-img {
  background-color: #efefef;
  border-radius: 4px;
  margin-right: 23px;
}
.feed-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 6px;
  text-align: left;
}
.settings-btn {
  width: 232px;
  height: 32px;
  background: #365fac;
  border: none;
  border-radius: 2px;
  color: #fff;
  padding: 4px 78px;
  align-items: center;
  cursor: pointer;
}
</style>

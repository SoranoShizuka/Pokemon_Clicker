<template>
  <div class="stats_container" v-if="pokemon">
    <img class="stats_img" :src="pokemon.image" />
    <div class="stats_pokemon-info">
      <span>
        <h2>Вид:</h2>
        {{ pokemon.name }}</span
      >
      <span
        ><h2>Вес:</h2>
        {{ pokemon.weight }} кг</span
      >
      <span
        ><h2>Суммарно заработано:</h2>
        >{{ pokemon.weight }}</span
      >
      <span
        ><h2>Денег/сек:</h2>
        {{ pokemon.moneyPerSec }}</span
      >
      <span
        ><h2>Возраст:</h2>
        1 день</span
      >
    </div>
    <div class="stats-actions">
      <button class="delete-btn" @click="deletePokemon">
        Удалить покемона
      </button>
      <input v-model="newName" placeholder="Псевдоним покемона" />
      <button class="save-btn" @click="saveName">Сохранить</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    email: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: ["delete", "rename"],
  setup(props, { emit }) {
    const pokemon = ref<any>(props.pokemon); // использую переданный покемон, если есть
    const newName = ref("");

    // Функция загрузки покемона из localStorage
    const loadPokemon = () => {
      const storageKey = `pokemon_${props.email}`;
      const storedData = localStorage.getItem(storageKey);

      if (storedData) {
        try {
          const pokemonArray = JSON.parse(storedData); // получаю массив покемонов
          if (Array.isArray(pokemonArray) && pokemonArray.length > 0) {
            pokemon.value = pokemonArray[0]; // беру первого покемона
          } else {
            console.error("в localStorage нет покемонов.");
          }
        } catch (error) {
          console.error("ошибка при разборе данных из localStorage:", error);
        }
      }
    };

    onMounted(() => {
      if (!props.pokemon) {
        loadPokemon(); // если покемон не передан как пропс, загружаю из localStorage
      }
    });

    const deletePokemon = () => {
      emit("delete", props.pokemon); // отправляю ID покемона родителю для удаления
    };

    const saveName = () => {
      if (newName.value.trim()) {
        emit("rename", { pokemon: props.pokemon, newName: newName.value });
        newName.value = ""; // сбрасываю поле после сохранения
      }
    };

    return { pokemon, newName, deletePokemon, saveName };
  },
});
</script>
<style scoped>
p,
h2 {
  margin: 0;
  padding: 0;
}
p {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 16px;
}
h2 {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
}
span {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.stats_container {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}
.stats_img {
  width: 143px;
  background-color: #efefef;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}
.stats_pokemon-info {
  width: 370px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
  position: absolute;
  top: 0;
  right: 0;
}
.stats-actions {
  display: flex;
  gap: 15px;
  flex-direction: row;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
}
button {
  background: #365fac;
  border: 1px solid #365fac;
  border-radius: 2px;
  color: #fff;
  align-items: center;
  cursor: pointer;
  padding: 4px 10px;
  gap: 8px;
}
input {
  width: 255px;
  border-radius: 2px;
  border: 2px solid #efefef;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #40a9ff;
  outline: none;
  border-radius: 2px;
}
input::placeholder {
  color: #00000040;
}
.delete-btn {
  width: 143px;
  height: 32px;
}
</style>

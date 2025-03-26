import { defineStore } from "pinia";
import { useBalanceStore } from "@/stores/balanceStore";

// Интерфейс для покемона
interface Pokemon {
  id: string;
  name: string;
  image: string;
  weight: number;
  moneyPerSec: number;
}

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemons: [] as Pokemon[], // массив с покемонами
    earningInterval: null as ReturnType<typeof setInterval> | null, // интервал для начисления денег
    isEarning: false, // процесс начисления денег
  }),
  actions: {
    // Метод для добавления 6 одинаковых покемонов, полученных от пользователя
    addSixPokemons(newPokemon: Pokemon) {
      this.pokemons = Array(6)
        .fill(null)
        .map((_, index) => ({
          ...newPokemon,
          id: Date.now() + index, // генерирую уникальный id
        }));

      this.savePokemons();
    },
    // Загрузка покемонов из localStorage
    loadPokemons() {
      const email = localStorage.getItem("email");
      if (!email) return;

      const storageKey = `pokemon_${email}`;
      const storedData = localStorage.getItem(storageKey);

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          if (Array.isArray(parsedData)) {
            this.pokemons = parsedData.map((pokemon, index) => ({
              ...pokemon,
              id: pokemon.id ?? Date.now() + index, // если id нет, создаю новый
            }));

            // если покемонов меньше 6, заполняю список до 6 копиями первого
            if (this.pokemons.length > 0 && this.pokemons.length < 6) {
              console.warn(
                `загружено ${this.pokemons.length} покемонов, дополняем до 6!`,
              );
              while (this.pokemons.length < 6) {
                this.pokemons.push({
                  ...this.pokemons[0],
                  id: Date.now() + this.pokemons.length,
                });
              }
              this.savePokemons();
            }
          }
          console.log("загруженные покемоны:", this.pokemons);
        } catch (error) {
          console.error("ошибка парсинга JSON:", error);
          this.pokemons = [];
        }
      }
    },

    deletePokemon(pokemonId: string) {
      // удаляю покемона из массива покемонов в хранилище
      this.pokemons = this.pokemons.filter(
        (pokemon) => pokemon.id !== pokemonId,
      );

      // если покемонов меньше 6, добавляю новых, копируя первого покемона
      if (this.pokemons.length < 6) {
        const additionalPokemonsCount = 6 - this.pokemons.length;
        const newPokemons = Array(additionalPokemonsCount)
          .fill(this.pokemons[0])
          .map((pokemon, index) => ({
            ...pokemon,
            id: Date.now() + index + this.pokemons.length, // генерирую уникальный ID
          }));

        this.pokemons.push(...newPokemons); // добавляю новые покемоны
      }

      // сохраняю обновленный список покемонов в localStorage
      this.savePokemons();
    },

    savePokemons() {
      const email = localStorage.getItem("email");
      if (!email) return;

      const storageKey = `pokemon_${email}`;
      console.log(
        "сохраняю покемонов в localStorage:",
        JSON.stringify(this.pokemons),
      ); // логирую перед сохранением
      localStorage.setItem(storageKey, JSON.stringify(this.pokemons));
    },

    // Начисление денег
    addMoney() {
      const balanceStore = useBalanceStore();
      // суммирую значение покемонов
      const totalMoney = this.pokemons.reduce(
        (sum, pokemon) => sum + (pokemon.moneyPerSec || 0),
        0,
      );
      // добавляю к общему балансу
      balanceStore.addBalance(totalMoney);
    },

    // Запуск начисления денег
    startEarning() {
      if (this.earningInterval) return; // не запускаю несколько раз
      this.earningInterval = setInterval(() => {
        this.addMoney();
      }, 1000);
    },

    // Остановка начисления денег
    stopEarning() {
      if (this.earningInterval) {
        clearInterval(this.earningInterval);
        this.earningInterval = null;
      }
    },
    updatePokemons(updatedPokemon: Pokemon) {
      const index = this.pokemons.findIndex((p) => p.id === updatedPokemon.id);
      if (index !== -1) {
        this.pokemons[index] = { ...updatedPokemon };
        this.savePokemons(); // сохраняю изменения
      } else {
        console.error(
          "не удалось обновить покемона, id не найден:",
          updatedPokemon.id,
        );
      }
    },
  },
});

import { defineStore } from "pinia";
import { useBalanceStore } from "@/stores/balanceStore";

// Интерфейс для покемона
interface Pokemon {
  id: number;
  name: string;
  image: string;
  weight: number;
  moneyPerSec: number;
}

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemons: [] as Pokemon[], // Массив с покемонами
    earningInterval: null as ReturnType<typeof setInterval> | null, // интервал для начисления денег
    isEarning: false, // процесс начисления денег
  }),
  actions: {
    // Метод для добавления 6 одинаковых покемонов, полученных от пользователя
    addSixPokemons(newPokemon: Pokemon) {
      // Добавляем 6 одинаковых покемонов в массив, создавая новые объекты
      this.pokemons = Array(6)
        .fill(null)
        .map(() => ({ ...newPokemon }));

      // Сохраняем покемонов в localStorage
      this.savePokemons();
    },
    // Загрузка покемонов из localStorage
    loadPokemons() {
      const email = localStorage.getItem("email");
      if (!email) return;

      const storageKey = `pokemon_${email}`;
      const storedData = localStorage.getItem(storageKey);
      console.log(storedData);

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          console.log(parsedData);

          if (Array.isArray(parsedData)) {
            this.pokemons = parsedData;
          } else {
            console.warn("Данные покемонов в неверном формате.");
            this.pokemons = [];
          }
        } catch (error) {
          console.error("Ошибка парсинга JSON:", error);
          this.pokemons = [];
        }
      } else {
        console.log("Нет покемонов в localStorage.");
        this.pokemons = [];
      }
    },

    // Сохранение покемонов в localStorage
    savePokemons() {
      const email = localStorage.getItem("email");
      if (!email) return;

      const storageKey = `pokemon_${email}`;
      console.log(
        "Сохранение данных в localStorage:",
        JSON.stringify(this.pokemons),
      );
      localStorage.setItem(storageKey, JSON.stringify(this.pokemons));
    },

    // Начисление денег
    addMoney() {
      const balanceStore = useBalanceStore();
      // Суммируем значение покемонов
      const totalMoney = this.pokemons.reduce(
        (sum, pokemon) => sum + (pokemon.moneyPerSec || 0),
        0,
      );
      // Добавляем к общему балансу
      balanceStore.addBalance(totalMoney);
    },

    // Запуск начисления денег
    startEarning() {
      if (this.earningInterval) return; // Не запускаем несколько раз
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
  },
});

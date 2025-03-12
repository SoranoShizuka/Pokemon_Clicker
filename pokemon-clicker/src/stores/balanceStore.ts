import { defineStore } from "pinia";
import { usePokemonStore } from "@/stores/pokemonStore.ts";

export const useBalanceStore = defineStore("balance", {
  state: () => ({
    totalBalance: 0,
    earningInterval: null as ReturnType<typeof setInterval> | null, // таймер
    isEarning: false, // флаг работы таймера
  }),
  actions: {
    addBalance(amount: number) {
      this.totalBalance += amount;
      console.log(`общий баланс: ${this.totalBalance}`);
    },
    // запуск начисления денег
    startEarning() {
      if (this.earningInterval) return; // Если уже запущен — выходим

      console.log("💰 Начисление денег запущено...");
      this.isEarning = true;

      const pokemonStore = usePokemonStore();
      this.earningInterval = setInterval(() => {
        if (!this.isEarning) return; // если флаг false — выходим

        const totalMoneyPerSec = pokemonStore.pokemons.reduce(
          (sum, pokemon) => sum + (pokemon.moneyPerSec || 0),
          0,
        );
        this.addBalance(totalMoneyPerSec);
      }, 1000);
    },

    // остановка начисления денег
    stopEarning() {
      if (this.earningInterval) {
        console.log("Начисление денег остановлено");
        clearInterval(this.earningInterval);
        this.earningInterval = null;
        this.isEarning = false; // ставлю флаг в false
      }
    },
  },
});

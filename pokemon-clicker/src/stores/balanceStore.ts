import { defineStore } from "pinia";
import { usePokemonStore } from "@/stores/pokemonStore.ts";

export const useBalanceStore = defineStore("balance", {
  state: () => ({
    totalBalance: 0,
    earningInterval: null as ReturnType<typeof setInterval> | null, // таймер
  }),
  actions: {
    addBalance(amount: number) {
      this.totalBalance += amount;
      console.log(`общий баланс: ${this.totalBalance}`);
    },

    spendBalance(amount: number) {
      if (this.totalBalance >= amount) {
        this.totalBalance -= amount;
        console.log("new balance", this.totalBalance);
      } else {
        console.error("no money");
      }
    },

    // запуск начисления денег
    startEarning() {
      if (this.earningInterval) return; // Если уже запущен — выходим

      console.log("Начисление денег запущено...");

      const pokemonStore = usePokemonStore();
      this.earningInterval = setInterval(() => {
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
      }
    },
  },
});

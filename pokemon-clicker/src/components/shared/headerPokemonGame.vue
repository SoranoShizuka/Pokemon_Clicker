<template>
  <div class="header">
    <div class="images">
      <img
        src="C:\Users\vklus\Рабочий стол\Pokemon_Clicker\pokemon-clicker\src\img\pokemon.png"
      />
      <div class="border"></div>
      <img
        src="C:\Users\vklus\Рабочий стол\Pokemon_Clicker\pokemon-clicker\src\img\clicker.png"
      />
    </div>
    <div class="header-money">
      <img
        class="icon-pokemon"
        src="C:\Users\vklus\Рабочий стол\Pokemon_Clicker\pokemon-clicker\src\img\icon-pokemon.png"
      />
      <span class="text-container">
        <span class="text" data-content="100 000 000">{{ totalBalance }}</span>
        <button class="text" data-content="+" @click="startEarning">+</button>
        <button class="text" data-content="-" @click="stopEarning">-</button>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { useBalanceStore } from "@/stores/balanceStore.ts";
import { computed } from "vue";

export default {
  setup() {
    const balanceStore = useBalanceStore();

    return {
      totalBalance: computed(() => balanceStore.totalBalance),
      startEarning: () => balanceStore.startEarning(),
      stopEarning: () => balanceStore.stopEarning(),
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  box-shadow: 0px 0px 16px 0px #3a3a3a1a;
  position: relative;
  border-radius: 16px;
}
.images {
  width: 194px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 16px;
}
.border {
  border: 2px solid #efefef;
}
.header-money {
  display: flex;
  position: absolute;
  right: 0;
  gap: 15px;
  align-items: center;
  margin: 28px 20px;
}
.icon-pokemon {
  width: 32px;
  height: 32px;
}
.text-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
button {
  border: none;
  background: none;
}
.text {
  font-family: Inter, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
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
</style>

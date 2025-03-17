<template>
  <div class="pokemon-container">
    <HeaderPokemonGame />
    <div class="pokemon-game">
      <InventoryPokemonGame />
      <MyPokemonGame />
      <ShopPokemonGame />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HeaderPokemonGame from "../shared/HeaderPokemonGame.vue";
import MyPokemonGame from "../shared/MyPokemonGame.vue";
import InventoryPokemonGame from "../shared/InventoryPokemonGame.vue";
import ShopPokemonGame from "../shared/ShopPokemonGame.vue";
export default defineComponent({
  components: {
    HeaderPokemonGame,
    MyPokemonGame,
    InventoryPokemonGame,
    ShopPokemonGame,
  },
  name: "PokemonGame",
});
</script>
<style scoped>
.pokemon-container {
  width: 1440px;
  display: flex;
  margin: 32px;
  flex-direction: column;
}
.pokemon-game {
  display: flex;
  margin-top: 20px;
  gap: 20px;
}
</style>

<template>
  <div class="pokemon-container">
    <headerPokemonGame />
    <div class="pokemon-game">
      <inventoryPokemonGame />
      <myPokemonGame />
      <shopPokemonGame />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import headerPokemonGame from "../shared/headerPokemonGame.vue";
import myPokemonGame from "../shared/myPokemonGame.vue";
import inventoryPokemonGame from "../shared/inventoryPokemonGame.vue";
import shopPokemonGame from "../shared/shopPokemonGame.vue";
export default defineComponent({
  components: {
    headerPokemonGame,
    myPokemonGame,
    inventoryPokemonGame,
    shopPokemonGame,
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

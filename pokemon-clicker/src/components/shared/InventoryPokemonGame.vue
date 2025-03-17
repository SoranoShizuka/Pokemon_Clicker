<template>
  <div class="inventory_container">
    <p class="inventory_text">Inventory</p>
    <div class="inventory_items-grid">
      <div v-for="slot in gridSize" :key="slot" class="grid-slot"></div>
      <div
        class="inventory_item"
        v-for="item in inventory"
        :style="getItemStyle(item)"
        draggable="true"
        @dragstart="startDrag(item)"
        @dragover.prevent
        @drop="dropItem"
      >
        <img class="inventory_item_img" :src="item.image" />
      </div>
    </div>
    <div class="coin-display">
      <img class="coin-icon" />
      {{ coins }}
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useInventoryStore } from "@/stores/inventory.ts";
export default defineComponent({
  name: "InventoryPokemonGame",
  setup() {
    const inventoryStore = useInventoryStore();
    const coins = computed(() => inventoryStore.coins);
    const draggedItem = ref<InventoryItem | null>(null);

    const startDrag = (item: InventoryItem) => {
      draggedItem.value = item;
    };

    const dropItem = (event: DragEvent) => {
      if (!draggedItem.value) return;

      const dropX = Math.floor(event.offsetX / 50);
      const dropY = Math.floor(event.offsetY / 50);

      draggedItem.value.x = dropX;
      draggedItem.value.y = dropY;

      draggedItem.value = null;
    };

    const getItemStyle = (item: InventoryItem) => ({
      width: `${item.width * 50}px`,
      height: `${item.height * 50}px`,
      left: `${item.x * 50}px`,
      top: `${item.y * 50}px`,
    });
  },
});
</script>
<style scoped>
.inventory_container {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 16px 0px #3a3a3a1a;
  border-radius: 16px;
  width: 25%;
}
.inventory_text {
  margin: 16px 0 0 16px;
  font-family: "Inter", sans-serif;
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
.inventory_items-grid {
  display: grid;
  margin: 16px 16px 12px 16px;
  grid-template-columns: repeat(5, 50px);
  grid-template-rows: repeat(5, 50px);
  gap: 12px;
  position: relative;
}
.inventory_item {
  background-color: #efefef;
  border-radius: 4px;
  position: absolute;
}
</style>

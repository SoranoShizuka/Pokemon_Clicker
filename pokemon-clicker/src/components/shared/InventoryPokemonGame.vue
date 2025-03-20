<template>
  <div class="inventory_container">
    <p class="inventory_text">Inventory</p>
    <div class="inventory_grid">
      <div
        class="inventory_cell"
        v-for="(cell, index) in grid"
        :key="index"
        :class="{ occupied: cell.occupied }"
        @dragover.prevent
        @drop="onDrop($event, index)"
      >
        <div
          class="inventory_item"
          v-if="cell.item && isTopLeftCell(index, cell.item)"
          :class="{ berry: cell.item.type === 'Ягоды' }"
          :style="{
            gridColumn: `span ${cell.item.width}`,
            gridRow: `span ${cell.item.height}`,
          }"
          draggable="true"
          @dragstart="onDragStart($event, cell.item.id)"
        >
          <img class="inventory_item-img" :src="cell.item.image" />
        </div>
      </div>
    </div>
    <div class="coins-display">
      <img
        class="coins-icon"
        src="C:\Users\vklus\Рабочий стол\Pokemon_Clicker\pokemon-clicker\src\img\icon-pokemon.png"
      />
      {{ inventoryStore.coins }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useInventoryStore } from "@/stores/inventory.ts";
interface InventoryItem {
  id: string;
  width: number;
  height: number;
  image: string;
  x: number;
  y: number;
  type: string;
}

interface GridCell {
  occupied: boolean;
  item: InventoryItem | null;
}

export default defineComponent({
  setup() {
    const inventoryStore = useInventoryStore();

    // создаю ячейки
    const grid = ref(
      Array(25)
        .fill(null)
        .map(() => ({
          occupied: false,
          item: null,
        })),
    );

    // слежу за обновлениями инвентаря и перерисовываю сетку
    watch(
      () => inventoryStore.inventory,
      () => {
        console.log("Inventory updated, refreshing grid...");
        grid.value = grid.value.map(() => ({ occupied: false, item: null }));

        inventoryStore.inventory.forEach((item) => {
          for (let i = 0; i < item.height; i++) {
            for (let j = 0; j < item.width; j++) {
              const subIndex = (item.y + i) * 5 + (item.x + j);
              grid.value[subIndex].occupied = true;
              if (i === 0 && j === 0) {
                grid.value[subIndex].item = item;
              }
            }
          }
        });
      },
      { deep: true },
    );
    // проверяю является ли ячейка частью предмета при перетаскивании
    const isTopLeftCell = (cellIndex: number, item: InventoryItem) => {
      return cellIndex === item.y * 5 + item.x;
    };

    // перетаскивание предмета
    const onDragStart = (event: DragEvent, itemId: string) => {
      event.dataTransfer?.setData("text/plain", itemId);
    };

    // проверяю могу ли разместить предмет в новой позиции
    const canPlaceItem = (
      x: number,
      y: number,
      width: number,
      height: number,
    ) => {
      if (x + width > 5 || y + height > 5) return false;

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const index = (y + i) * 5 + (x + j);
          if (grid.value[index].occupied) return false;
        }
      }
      return true;
    };

    // перемещение предмета
    const onDrop = (event: DragEvent, targetIndex: number) => {
      const itemId = event.dataTransfer?.getData("text/plain");
      if (!itemId) return;

      const targetX = targetIndex % 5;
      const targetY = Math.floor(targetIndex / 5);

      const item = inventoryStore.inventory.find((i) => i.id === itemId);
      if (!item) return;

      if (canPlaceItem(targetX, targetY, item.width, item.height)) {
        // Перемещаем в новую
        inventoryStore.moveItem(itemId, targetX, targetY);
      } else {
        alert("Невозможно переместить предмет в это место. Не хватает места.");
      }
    };

    return {
      inventoryStore,
      coins: inventoryStore.coins,
      grid,
      onDragStart,
      onDrop,
      isTopLeftCell,
    };
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
.inventory_grid {
  display: grid;
  margin: 16px 16px 12px 16px;
  gap: 12px;
  --cell-size: min(50px); /* Динамический размер */
  grid-template-columns: repeat(5, var(--cell-size));
  grid-template-rows: repeat(5, var(--cell-size));
  position: relative;
}
.inventory_cell {
  display: flex;
  width: var(--cell-size);
  height: var(--cell-size);
  background-color: #efefef;
  border-radius: 4px;
  position: relative;
  align-items: center;
  justify-content: center;
}
.inventory_cell.occupied {
  display: grid;
  background-color: #efefef;
}

.inventory_item {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: grab;
  z-index: 2;
  transition: all 0.2s ease-in-out;
}
.inventory_item-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.inventory_item.berry {
  width: 112px;
  height: 112px;
  background-color: #efefef;
  border-radius: 4px;
  top: 0;
}
.inventory_item.berry .inventory_item-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.coins-display {
  margin: 10px 16px;
  display: flex;
  padding: 5px 100px;
  border: 3px solid #365fac;
  border-radius: 4px;
  align-items: center;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
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

.coins-icon {
  width: 32px;
  height: 32px;
  margin-right: 5px;
}
</style>

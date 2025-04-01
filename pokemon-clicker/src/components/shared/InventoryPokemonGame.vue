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
        <!--span тут нужен, чтобы ягода могла рястягиваться
          на несколько ячеек, если не будет span, то
          каждый предмет будет занимать одну ячейку -
          нужно растянуть предмет-->
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
    <button class="inventory-expand" @click="increaseInventory">
      <img class="coins-icon" src="/icon-pokemon.png" />
      {{ inventoryStore.coins }}
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect, computed } from "vue";
import { useInventoryStore } from "@/stores/inventoryStore.ts";
import type { Item } from "@/stores/typesStore.ts";

export default defineComponent({
  name: "InventoryPokemonGame",
  setup() {
    const inventoryStore = useInventoryStore();
    /* мне нужно, чтобы ряды автоматически обновлялись, т.к.
    они увеличиваются, если я их оставлю в ref, то ряды не обновятся,
    потому что ref не следит за изменениями в pinia автоматически,
    поэтому здесь computed
     */
    const rows = computed(() => inventoryStore.rows);
    const cols = computed(() => inventoryStore.cols);
    /*
    с ref значение у рядов устанавливается при заргрузке
    компонента и больше не изменится, даже если будет
    увеличение рядов
     */

    // генерация сетки инвентаря
    const generateGrid = () => {
      return Array(rows.value * cols.value)
        .fill(null)
        .map(() => ({
          occupied: false,
          item: null as Item | null,
        }));
    };

    // создаю ячейки
    const grid = ref(generateGrid());

    // расширение инвентаря и списание денег за расширение
    const increaseInventory = () => {
      inventoryStore.expandInventory();
    };
    // слежу за обновлениями инвентаря и перерисовываю сетку
    /*
    watchEffect - автоматически отслеживает все реактивные переменные
    внутри функции - если инвентарь изменится, то код перезапуститься и
    обновит grid.value
     */
    watchEffect(() => {
      /*
      grid.value - реактивная переменная, которая содежит
      массив ячеек инвентаря
      generateGrid - создает пустую сетку grid -
      создает массив клеток где
      occupied: false - клетки свободны,
      item: null - в клетке нет предмета
       */
      grid.value = generateGrid();
      // перебираю все предметы в инвентаре
      inventoryStore.inventory.forEach((item) => {
        for (let row = 0; row < item.height; row++) {
          for (let col = 0; col < item.width; col++) {
            const index = (item.y + row) * cols.value + (item.x + col);
            // отмечаю занятые клетки
            grid.value[index].occupied = true;
            /* привязываю предмет к верхнему левому углу,
            то есть вся информация о предмете хранится
            в одной клетке, остальные помечаются как занятые
            occupied = true, item = null
             */
            if (row === 0 && col === 0) {
              grid.value[index].item = item;
            }
          }
        }
      });
    });
    // проверяю является ли ячейка частью предмета при перетаскивании
    const isTopLeftCell = (cellIndex: number, item: Item) => {
      return cellIndex === item.y * 5 + item.x;
    };

    /* перетаскивание предмета -
    при начале перетаскивания предмета
     сохраняю itemId в dataTransfer
     использую формат text/plain,
     потому что это самы подходящий формат
     позже в drop смогу получить itemId и понять,
     какой предмет перетащила
     */

    const onDragStart = (event: DragEvent, itemId: string) => {
      /*
      event.dataTransfer - это объект,который позволяет передавать
      данные между элементами при перетаскивании
      .setData(format, data) - сохраняет данные в определенном формате
      text/plain - тип данных, в этом случае просто тектс, id предмета,
      универсальный формат, который поддреживают все браузеры
       */
      event.dataTransfer?.setData("text/plain", itemId);
    };

    // проверяю могу ли разместить предмет в новой позиции
    /*
    x, y — верхний левый угол предмета.
    width, height — размер предмета в клетках.
     */
    const canPlaceItem = (
      x: number,
      y: number,
      width: number,
      height: number,
    ) => {
      // проверяю - выходит ли предмет за границы сетки
      const isOutOfBounds = x + width > cols.value || y + height > rows.value;
      if (isOutOfBounds) {
        // если выходит за границы, то размещение невозможно
        return false;
      }
      // проверяю заняты ли ячейки в новой позиции
      for (let rowOffset = 0; rowOffset < height; rowOffset++) {
        for (let colOffset = 0; colOffset < width; colOffset++) {
          // вычисляю индекс ячейки в сетке
          const cellIndex = (y + rowOffset) * cols.value + (x + colOffset);
          // если ячейка занята, то предмет нельзя разместить
          if (grid.value[cellIndex].occupied) {
            return false;
          }
        }
      }
      return true;
    };

    // перемещение предмета
    const onDrop = (event: DragEvent, targetIndex: number) => {
      // получаю id перетаскиваемого предмета
      const itemId = event.dataTransfer?.getData("text/plain");
      // если не получаю id, то выхожу из функции
      if (!itemId) return;

      // определяю кол-во колонок в инвентаре
      /* вычисляю координаты по индексу ячейки -
      делю индекс ячейки на кол-во столбцов -
      % - дает остаток от деления, который будет
      горизонтальной позицией ячейки в столбце
      позволяет вычислить в какой столбце находится
      ячейка с данным индексом */
      const targetX = targetIndex % cols.value;
      // определяю строку ряд в инветаре
      const targetY = Math.floor(targetIndex / cols.value);

      // ищу предмет в инвентаре по id
      const item = inventoryStore.inventory.find((i) => i.id === itemId);
      // если предмет не нашелся, то выхожу из функции
      if (!item) return;

      // проверяю могу ли переместить предмет в новую позицию
      const canMoveItem = canPlaceItem(
        targetX,
        targetY,
        item.width,
        item.height,
      );
      if (canMoveItem) {
        // перемещаю в новую позицию
        inventoryStore.moveItem(itemId, targetX, targetY);
      } else {
        alert("невозможно переместить предмет в это место. Не хватает места.");
      }
    };

    return {
      inventoryStore,
      coins: inventoryStore.coins,
      grid,
      onDragStart,
      onDrop,
      isTopLeftCell,
      increaseInventory,
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
  grid-template-rows: repeat(3, var(--cell-size));
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
.inventory-expand {
  cursor: pointer;
  background: #ffffff;
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

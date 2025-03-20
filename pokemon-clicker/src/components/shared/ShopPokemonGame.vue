<template>
  <div class="shop_container">
    <div class="shop_text-container">
      <p class="shop_text">Shop</p>
      <div class="shop_filters">
        <button
          class="filters-btn btn-text"
          v-for="filter in filters"
          :key="filter"
          @click="toggleFilter(filter)"
        >
          {{ filter }}
          <span class="filters-close" v-if="selectedFilters.includes(filter)"
            >✖</span
          >
        </button>
      </div>
    </div>
    <div class="shop_items-container">
      <div class="shop_item-card" v-for="item in filteredItems" :key="item.id">
        <div class="shop_item-card_content">
          <img class="shop_item-image" :src="item.image" />
          <div class="shop_item-text">
            <p class="shop_item-title">{{ item.title }}</p>
            <p class="shop_item-description">{{ item.description }}</p>
          </div>
        </div>
        <button class="shop_buy-btn" @click="buyItem(item)">
          Купить за {{ item.price.toLocaleString() }}
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useInventoryStore } from "@/stores/inventory.ts";
interface ShopItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  type: string;
  width: number;
  height: number;
}
export default defineComponent({
  name: "Shop",
  setup() {
    const inventoryStore = useInventoryStore();
    const API_SHOP_ITEM = "https://pokeapi.co/api/v2/item/";
    // список ягод
    const berriesList = ref(["cheri-berry"]);
    // список покеболлов
    const pokeballsList = ref(["ultra-ball", "master-ball"]);

    // состояние загрузки предметов
    const loading = ref(true);
    // содержимое предметов
    const items = ref<ShopItem[]>([]);
    // фильтры
    const filters = ["Ягоды", "Покеболлы"];
    // выбранные фильтры
    const selectedFilters = ref(["Ягоды", "Покеболлы"]);

    // функция загрузки айтемов с апи
    const fetchItemData = async (
      itemName: string,
    ): Promise<ShopItem | null> => {
      try {
        const response = await fetch(`${API_SHOP_ITEM}${itemName}`);
        if (!response.ok) throw new Error(`Ошибка загрузки ${itemName}`);
        const data = await response.json();
        return {
          id: itemName,
          title: ItemTitle(data.name),
          description: getDescription(data),
          price: calculatePrice(data.name),
          image: data.sprites?.default || "",
          type: pokeballsList.value.includes(itemName) ? "Покеболлы" : "Ягоды",
          width: pokeballsList.value.includes(itemName) ? 1 : 2,
          height: pokeballsList.value.includes(itemName) ? 1 : 2,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    // заголовок
    const ItemTitle = (name: string) => {
      return name.includes("ball") ? "Покеболл" : "Ягода";
    };

    // описание покеболла и ягоды
    const getDescription = (data: any) => {
      if (data.category.name.includes("ball")) {
        return `Во время охоты ловит покемона с шансом ${getCatchRate(data.name)}%`;
      }
      return `Накорми ей покемона для увеличения веса на 0.1 кг`;
    };

    // цена покеболла и ягоды
    const calculatePrice = (name: string) => {
      return name.includes("ball") ? 5000 : 1000;
    };

    // шанс ловли покемонов
    const getCatchRate = (name: string) => {
      return name.includes("master") ? 15 : name.includes("ultra") ? 7 : 5;
    };

    // загрузка всех айтемов
    const loadItems = async () => {
      const allItems = await Promise.all([
        ...pokeballsList.value.map(fetchItemData),
        ...berriesList.value.map(fetchItemData),
      ]);
      items.value = allItems.filter((item) => item !== null) as any[];
      loading.value = false;
    };

    // фильтр предметов
    const filteredItems = computed(() => {
      return items.value.filter((item) =>
        selectedFilters.value.includes(item.type),
      );
    });

    // обработчик фильтров
    const toggleFilter = (filter: string) => {
      if (selectedFilters.value.includes(filter)) {
        selectedFilters.value = selectedFilters.value.filter(
          (f) => f !== filter,
        );
      } else {
        selectedFilters.value.push(filter);
      }
    };

    // функция покупки айтема
    const buyItem = (item: any) => {
      // добавляю предмет в инвентарь через хранилище pinia
      console.log(item);
      inventoryStore.buyItem(item);
    };
    console.log(inventoryStore.inventory);

    onMounted(() => {
      loadItems();
    });

    return {
      loading,
      items,
      filteredItems,
      filters,
      selectedFilters,
      toggleFilter,
      buyItem,
    };
  },
});
</script>
<style scoped>
.shop_container {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 16px 0px #3a3a3a1a;
  border-radius: 16px;
  width: 25%;
}
.shop_text-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.shop_text {
  font-family: "Inter", sans-serif;
  font-size: 24px;
  margin: 16px 0 0 16px;
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
.shop_filters {
  display: flex;
  flex-direction: row;
  margin: 0 12px 12px 12px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
}
.filters-btn {
  display: flex;
  margin: 4px;
  color: #f5f5f5;
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  gap: 4px;
  padding: 2px 4px 2px 8px;
}
.btn-text {
  color: black;
  font-size: 12px;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
}
.filters-close {
  width: 10px;
  height: 10px;
  color: #00000073;
}
.shop_items-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
}
.shop_item-card {
  display: flex;
  margin: 12px;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 0px 16px 0px #3a3a3a1a;
  border-radius: 16px;
}
.shop_item-card_content {
  margin: 12px;
  display: flex;
  gap: 10px;
}
.shop_item-image {
  margin-right: 23px;
  width: 59px;
  height: 59px;
  background-color: #efefef;
  border-radius: 4px;
}
.shop_item-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.shop_item-title {
  margin: 0;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
}
.shop_item-description {
  margin: 0;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 14px;
}
.shop_buy-btn {
  background-color: #365fac;
  color: white;
  border: none;
  padding: 4px 15px;
  border-radius: 2px;
  font-weight: 400;
  cursor: pointer;
  margin: 12px;
}
</style>

<template>
  <div class="settings_container" @click.self="$emit('close')">
    <div class="settings_modal">
      <!-- header -->
      <div class="settings_modal-header">
        <p class="settings_modal-text">
          Управление покемоном {{ pokemon.name }}
        </p>
        <button @click="closeModal" class="settings_close-modal">
          <img src="/close.png" />
        </button>
      </div>
      <!-- Вкладки -->
      <div class="settings_tabs-border-bottom">
        <div class="settings_modal-tabs">
          <button
            class="settings_button"
            :class="{ active: currentTab === 'feed' }"
            @click="setTab('feed')"
          >
            Накормить
          </button>
          <button
            class="settings_button"
            :class="{ active: currentTab === 'stats' }"
            @click="setTab('stats')"
          >
            Статистика
          </button>
        </div>

        <Tabs class="indicator" :style="indicatorStyle" />
      </div>
      <!-- Содержимое вкладок -->
      <div class="tab-content">
        <PokemonFeed
          v-if="currentTab === 'feed'"
          @feed="feedPokemon"
          :pokemonId="pokemon.id"
        />
        <PokemonStats
          v-if="currentTab === 'stats'"
          :pokemon="pokemon"
          :email="email"
          @delete="deletePokemon"
        />
      </div>
      <!-- footer -->
      <div class="settings_modal-footer">
        <button class="footer-btn" @click="closeModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import PokemonFeed from "@/components/shared/PokemonFeed.vue";
import PokemonStats from "@/components/shared/PokemonStats.vue";
import Tabs from "@/components/shared/IndicatorTabs.vue";
import { usePokemonStore } from "@/stores/pokemonStore.ts";

export default defineComponent({
  name: "PokemonSettings",
  components: { PokemonStats, PokemonFeed, Tabs },
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    email: {
      type: String,
      default: "",
    },
  },
  emits: ["close", "feed"],
  setup(props, { emit }) {
    const currentTab = ref("feed");
    const pokemonStore = usePokemonStore();

    const setTab = (tab: "feed" | "stats") => {
      currentTab.value = tab;
    };

    const closeModal = () => {
      emit("close");
    };

    // Стиль индикатора (ползунок)
    const indicatorStyle = computed(() => ({
      transform:
        currentTab.value === "feed" ? "translateX(165px)" : "translateX(284px)",
      transition: "transform 0.3s ease",
    }));

    // Функция для кормления покемона
    const feedPokemon = () => {
      const weightIncrease = 1;
      emit("feed", props.pokemon, weightIncrease);
    };

    const deletePokemon = (pokemon: any) => {
      // удаляю покемона из хранилища (store) и перезагружаю список
      pokemonStore.deletePokemon(pokemon.id);
      emit("close"); // закрыть модальное окно после удаления
    };

    return {
      currentTab,
      setTab,
      closeModal,
      indicatorStyle,
      feedPokemon,
      deletePokemon,
    };
  },
});
</script>
<style scoped>
.settings_container {
  position: fixed;
  margin: 40px 269px;
  top: 0;
  left: 0;
  width: 1440px;
  height: 852px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.settings_modal {
  background: white;
  position: relative;
  padding: 16px;
  width: 572px;
  height: 428px;
  text-align: center;
}
.settings_modal-header {
  display: flex;
  flex-direction: row;
  gap: 270px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;
}
.settings_modal-text {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  vertical-align: middle;
  color: #000000d9;
  margin: 0;
}
.settings_close-modal {
  width: 16px;
  height: 16px;
  background: none;
  border: none;
  color: #00000073;
}
.settings_modal-tabs {
  display: flex;
  justify-content: center;
  margin: 15px 24px 5px 24px;
  gap: 32px;
}
.settings_button {
  border: none;
  background: none;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}
.settings_button.active {
  color: #365fac;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}
.settings_tabs-border-bottom {
  display: flex;
  margin: 0 24px;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #0000000f;
}
.tab-content {
  display: flex;
  margin: 10px 24px;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 50px;
}
.indicator {
  height: 2px;
  background-color: #365fac;
  width: 75px;
  transition: transform 0.3s ease;
}
.settings_modal-footer {
  display: flex;
  border-top: 1px solid #f0f0f0;
  background: #ffffff;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.footer-btn {
  margin: 10px 16px;
  padding: 5px 16px;
  gap: 8px;
  border-radius: 2px;
  background: #365fac;
  color: #ffffff;
  display: flex;
  border: none;
  justify-content: center;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}
</style>

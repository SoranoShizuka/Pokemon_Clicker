import { defineStore } from "pinia";

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    coins: 10000,
    inventory: [] as {
      id: string;
      name: string;
      image: string;
      width: number;
      height: number;
      x: number;
      y: number;
      type: string;
    }[],
  }),

  actions: {
    buyItem(item: any) {
      if (this.coins >= item.price) {
        const position = this.findEmptySlot(item.width, item.height);
        if (!position) {
          alert("Нет места в инвентаре!");
          return;
        }

        this.inventory.push({ ...item, x: position.x, y: position.y });
        this.coins -= item.price;
      } else {
        alert("Недостаточно монет!");
      }
    },

    moveItem(itemId: string, targetX: number, targetY: number) {
      const item = this.inventory.find((i) => i.id === itemId);
      if (!item) return;

      // проверяю влезает ли предмет в границы и свободны ли клетки
      if (targetX + item.width > 5 || targetY + item.height > 5) return;
      if (!this.isSlotAvailable(targetX, targetY, item.width, item.height))
        return;

      // Обновляем координаты
      item.x = targetX;
      item.y = targetY;
    },

    findEmptySlot(width: number, height: number) {
      const occupied = new Set(
        this.inventory.flatMap((item) =>
          [...Array(item.height)].flatMap((_, dy) =>
            [...Array(item.width)].map(
              (_, dx) => `${item.x + dx}-${item.y + dy}`,
            ),
          ),
        ),
      );

      for (let y = 0; y < 5 - (height - 1); y++) {
        for (let x = 0; x < 5 - (width - 1); x++) {
          const isFree = [...Array(height)].every((_, dy) =>
            [...Array(width)].every(
              (_, dx) => !occupied.has(`${x + dx}-${y + dy}`),
            ),
          );
          if (isFree) return { x, y };
        }
      }
      return null;
    },

    isSlotAvailable(x: number, y: number, width: number, height: number) {
      return this.inventory.every(
        (item) =>
          !(
            x < item.x + item.width &&
            x + width > item.x &&
            y < item.y + item.height &&
            y + height > item.y
          ),
      );
    },
  },
});

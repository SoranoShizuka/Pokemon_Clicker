import { defineStore } from "pinia";
import { useBalanceStore } from "@/stores/balanceStore.ts";
import type { Item } from "@/stores/typesStore.ts";

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    coins: 1000,
    inventory: [] as Item[],
    cols: 5,
    rows: 3,
  }),

  actions: {
    /* реактивное добавление предметов в инвентарь
    здесь нужно реактивное добавление,
    чтобы можно было отслеживать обновление
    инвентаря и важно, чтобы интерфейс обновлялся
     */
    addItem(item: Item) {
      /*
      this.inventory - массив всех предметов в инвентаре
      здесь я копирую все текущие предметы,
      а item добавляет новый предмет -
      получается массив обновляется с новым предметом
       */
      this.inventory = [...this.inventory, item];
    },

    buyItem(item: Item) {
      // получаю общий баланс из хранилища
      const balanceStore = useBalanceStore();
      // проверяю хватает ли монет для покупки предмета
      // если денег не хватает, то выхожу из метода,
      // если хватает, то иду дальше
      if (balanceStore.totalBalance < item.price) {
        alert("no money");
        return;
      }

      // при успешной покупке предмета ищу место в инвентаре
      // если есть место возвращаю координаты
      // если нет, то выхожу из метода
      const position = this.findEmptySlot(item.width, item.height);
      if (!position) {
        alert("no vacant cell in inventory");
        return;
      }

      // если место есть, то добавляю предмет в инвентарь
      // создаю копию предмета
      //добавляю координаты, куда нужно положить предмет
      //вызываю метод, который добавляет предмет
      this.addItem({ ...item, x: position.x, y: position.y });
      // списыаю деньги из общего баланса - уменьшает общий баланс
      balanceStore.spendBalance(item.price);
    },

    moveItem(itemId: string, newX: number, newY: number) {
      // ищу предмет по id
      const index = this.inventory.findIndex((i) => i.id === itemId);
      // если не нахожу предмет, то метод прерывается
      if (index === -1) return;

      // проверяю не выходит ли предмет за границы инвентаря
      // чтобы проверить беру предмет по id (переменная index)
      const item = this.inventory[index];

      // смотрю не выходит ли предмет за границы инвентаря (ширина и высота)
      if (newX + item.width > this.cols || newY + item.height > this.rows)
        return;

      // Проверяем, свободно ли место
      // если место занято, то перемещение не происходит
      if (!this.isSlotAvailable(newX, newY, item.width, item.height)) return;

      // Обновляем координаты предмета -
      // создают новый массив, где заменяю старый предмет
      // на новый с измененными координатами
      this.inventory = [
        // беру элемент до изменяемого предмета
        ...this.inventory.slice(0, index),
        // вставляю обновленный предмет
        { ...item, x: newX, y: newY },
        // беру элементы после изменянемого предмета
        ...this.inventory.slice(index + 1),
      ];
    },

    /* ищу свободное место куда можно разместить предмет
    заданного размера - использую
    y (проходит по сторокам) и
    х (проходит по столбцам) -
    у - изменяется от 0 до this.rows - height,
    чтобы предмет не выходил за границы по высоте
    х - изменяется от 0 до this.cols - width,
    чтобы предмет не выходил за границы по ширине

     */
    findEmptySlot(width: number, height: number) {
      for (let y = 0; y <= this.rows - height; y++) {
        for (let x = 0; x <= this.cols - width; x++) {
          // проверяю свободно ли место для предмета
          if (this.isSlotAvailable(x, y, width, height)) {
            // если место есть возвращаю координаты
            return { x, y };
          }
        }
      }
      // если места нет - возращаю null
      return null;
    },

    isSlotAvailable(x: number, y: number, width: number, height: number) {
      /* проверяю каждый предмет в инвентаре
      мешает ли он разместить новый
       */
      for (const item of this.inventory) {
        // считаю границы текущего предмета
        const itemLeft = item.x; // левая граница предмета
        const itemRight = item.x + item.width; // правая граница предмета
        const itemTop = item.y; // верхняя граница предмета
        const itemBottom = item.y + item.height; // нижняя граница предмета

        /* считаю границы нового предмета,
        который хочу добавить
         */
        const slotLeft = x; // левая граница
        const slotRight = x + width; // правая
        const slotTop = y; // верхняя
        const slotBottom = y + height; // нижняя

        // проверяю пересекается ли новый предмет с текущим предметом
        const isOverlapping =
          /* 1
          левая граница нового предмета (slotLeft) меньше,
          чем правая граница существующего (itemRight)-
          значит, новый предмет начинается раньше,
          чем заканчивается старый
          */
          slotLeft < itemRight &&
          /* 2
            правая граница нового предмета (slotRight) больше,
            чем левая граница существующего (itemLeft) -
            значит, новый предмет заканчивается позже,
            чем начинается старый
            */
          slotRight > itemLeft &&
          /* 3 верхняя граница нового предмета (slotTop) меньше,
          чем нижняя граница существующего (itemBottom) -
          значит, новый предмет начинается выше,
          чем заканчивается старый
          */
          slotTop < itemBottom &&
          /* 4 нижняя граница нового предмета (slotBottom) больше,
          чем верхняя граница существующего (itemTop) -
          значит, новый предмет заканчивается ниже,
          чем начинается старый
            */
          slotBottom > itemTop;

        // если есть пересечение - место занято
        if (isOverlapping) {
          return false;
        }
      }
      // если пересечений нет, место свободно
      return true;
    },
    expandInventory() {
      const coinsExpand = 1000;
      const balanceStore = useBalanceStore();
      if (balanceStore.totalBalance >= coinsExpand) {
        balanceStore.spendBalance(coinsExpand);
        this.rows += 3;
        console.log("Инвентарь увеличен! Новые ряды:", this.rows);
      } else {
        alert("no money");
      }
    },
  },
});

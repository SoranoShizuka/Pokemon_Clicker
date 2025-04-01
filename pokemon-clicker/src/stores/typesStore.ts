// Интерфейс для покемона
export interface Pokemon {
  id: string;
  name: string;
  image: string;
  weight: number;
  moneyPerSec: number;
}

export interface Item {
  id: string;
  name: string;
  image: string;
  width: number;
  height: number;
  x: number;
  y: number;
  type: string;
  price: number;
}

export interface ShopItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  type: string;
  width: number;
  height: number;
}

export interface Berry {
  name: string;
  weight: number;
  image: string;
}


import Decimal from "decimal.js";
import type { CartItem } from "../cart/cartStore";

export type Order = {
  id: string;
  createdAt: string;
  wallet: string;
  items: CartItem[];
  subtotal: string;
  fee: string;
  total: string;
  status: "confirmed";
};

const STORAGE_KEY = "kurio_orders_v1";

function readOrders(): Order[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Order[]) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function createOrder(
  items: CartItem[],
  wallet: string
): Order {
  if (items.length === 0) {
    throw new Error("O carrinho está vazio.");
  }

  const subtotal = items.reduce(
    (sum, item) =>
      sum.plus(new Decimal(item.nft.price).times(item.quantity)),
    new Decimal(0)
  );

  const fee = new Decimal("0.005");
  const total = subtotal.plus(fee);

  const order: Order = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    wallet,
    items: items.map((item) => ({
      nft: { ...item.nft },
      quantity: item.quantity,
    })),
    subtotal: subtotal.toFixed(3),
    fee: fee.toFixed(3),
    total: total.toFixed(3),
    status: "confirmed",
  };

  saveOrders([...readOrders(), order]);

  return order;
}

export function getOrder(id: string): Order | undefined {
  return readOrders().find((order) => order.id === id);
}


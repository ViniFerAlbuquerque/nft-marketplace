
import { useSyncExternalStore } from "react";
import type { NFT } from "../../mocks/fixtures/nfts";

export type CartItem = {
  nft: NFT;
  quantity: number;
};

const STORAGE_KEY = "kurio_cart_v1";

function readCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
}

let items: CartItem[] = readCart();

const listeners = new Set<() => void>();

function emitChange() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return items;
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

export function addToCart(nft: NFT, quantity = 1) {
  if (!Number.isSafeInteger(quantity) || quantity < 1) return;

  const existing = items.find((item) => item.nft.id === nft.id);

  if (existing) {
    items = items.map((item) =>
      item.nft.id === nft.id
        ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
        : item
    );
  } else {
    items = [...items, { nft, quantity }];
  }

  emitChange();
}

export function removeFromCart(id: string) {
  items = items.filter((item) => item.nft.id !== id);
  emitChange();
}


export function updateCartQuantity(id: string, quantity: number) {
  // Aceita somente quantidades inteiras entre 1 e 99.
  if (
    !Number.isSafeInteger(quantity) ||
    quantity < 1 ||
    quantity > 99
  ) {
    return;
  }

  const existing = items.find((item) => item.nft.id === id);

  // Não altera produtos inexistentes.
  if (!existing || existing.quantity === quantity) {
    return;
  }

  // Cria um novo array para notificar o React.
  items = items.map((item) =>
    item.nft.id === id
      ? { ...item, quantity }
      : item
  );

  // Atualiza localStorage e componentes inscritos.
  emitChange();
}


export function clearCart() {
  items = [];
  emitChange();
}



import { useSyncExternalStore } from "react";
import type { NFT } from "../../mocks/fixtures/nfts";

export type CartItem = {
  nft: NFT;
  quantity: number;
};

let items: CartItem[] = [];

const listeners = new Set<() => void>();

function emitChange() {
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
        ? { ...item, quantity: item.quantity + quantity }
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

export function clearCart() {
  items = [];
  emitChange();
}

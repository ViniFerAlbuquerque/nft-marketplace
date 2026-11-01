

import { http, HttpResponse } from "msw";
import Decimal from "decimal.js";
import { nfts } from "../fixtures/nfts";
import type { Order } from "../../features/checkout/orderService";

type OrderRequest = {
  items: Array<{
    nftId: string;
    quantity: number;
  }>;
  wallet: string;
};

type StoredOrder = {
  key: string;
  fingerprint: string;
  order: Order;
};

const STORAGE_KEY = "kurio_mock_orders_v1";

function readOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: StoredOrder[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export const orderHandlers = [
  http.post("/api/orders", async ({ request }) => {
    const key = request.headers.get("Idempotency-Key");

    if (!key?.trim()) {
      return HttpResponse.json(
        { message: "Chave de idempotência obrigatória." },
        { status: 400 }
      );
    }

    let body: OrderRequest;

    try {
      body = (await request.json()) as OrderRequest;
    } catch {
      return HttpResponse.json(
        { message: "JSON inválido." },
        { status: 400 }
      );
    }

    if (
      !body ||
      !Array.isArray(body.items) ||
      body.items.length === 0 ||
      !["metamask", "walletconnect"].includes(body.wallet)
    ) {
      return HttpResponse.json(
        { message: "Dados do pedido inválidos." },
        { status: 400 }
      );
    }

    const uniqueIds = new Set<string>();

    for (const item of body.items) {
      if (
        !item ||
        typeof item.nftId !== "string" ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 99 ||
        uniqueIds.has(item.nftId) ||
        !nfts.some((nft) => nft.id === item.nftId)
      ) {
        return HttpResponse.json(
          { message: "NFT ou quantidade inválida." },
          { status: 400 }
        );
      }

      uniqueIds.add(item.nftId);
    }

    const normalizedItems = [...body.items].sort((a, b) =>
      a.nftId.localeCompare(b.nftId)
    );

    const fingerprint = JSON.stringify({
      wallet: body.wallet,
      items: normalizedItems,
    });

    const stored = readOrders();
    const existing = stored.find((entry) => entry.key === key);

    if (existing) {
      if (existing.fingerprint !== fingerprint) {
        return HttpResponse.json(
          { message: "Chave reutilizada com dados diferentes." },
          { status: 409 }
        );
      }

      return HttpResponse.json(existing.order, {
        status: 200,
      });
    }

    const items = normalizedItems.map(({ nftId, quantity }) => ({
      nft: { ...nfts.find((nft) => nft.id === nftId)! },
      quantity,
    }));

    const subtotal = items.reduce(
      (sum, item) =>
        sum.plus(new Decimal(item.nft.price).times(item.quantity)),
      new Decimal(0)
    );

    const fee = new Decimal("0.005");

    const order: Order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      wallet: body.wallet,
      items,
      subtotal: subtotal.toFixed(3),
      fee: fee.toFixed(3),
      total: subtotal.plus(fee).toFixed(3),
      status: "confirmed",
    };

    try {
      saveOrders([...stored, { key, fingerprint, order }]);
    } catch {
      return HttpResponse.json(
        { message: "Não foi possível salvar o pedido." },
        { status: 500 }
      );
    }

    return HttpResponse.json(order, { status: 201 });
  }),

  http.get("/api/orders/:orderId", ({ params }) => {
    const stored = readOrders();
    const entry = stored.find(
      ({ order }) => order.id === String(params.orderId)
    );

    if (!entry) {
      return HttpResponse.json(
        { message: "Pedido não encontrado." },
        { status: 404 }
      );
    }

    return HttpResponse.json(entry.order);
  }),
];



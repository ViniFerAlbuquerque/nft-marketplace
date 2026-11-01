
import { api } from "./api";
import type { Order } from "../features/checkout/orderService";

export type CreateOrderInput = {
  items: {
    nftId: string;
    quantity: number;
  }[];
  wallet: string;
  idempotencyKey: string;
};

export async function submitOrder(
  input: CreateOrderInput
): Promise<Order> {
  const { idempotencyKey, ...body } = input;

  const response = await api.post<Order>(
    "/orders",
    body,
    {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    }
  );

  return response.data;
}

export async function fetchOrder(
  orderId: string
): Promise<Order> {
  const response = await api.get<Order>(
    `/orders/${encodeURIComponent(orderId)}`
  );

  return response.data;
}

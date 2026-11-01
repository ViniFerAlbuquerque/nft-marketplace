
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import Decimal from "decimal.js";
import { ArrowLeft, Wallet } from "lucide-react";
import { useCart, clearCart } from "../features/cart/cartStore";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { submitOrder } from "../services/orders";

export default function Checkout() {
  const items = useCart();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState("metamask");
  const [error, setError] = useState("");

  const subtotal = items.reduce(
    (sum, item) =>
      sum.plus(new Decimal(item.nft.price).times(item.quantity)),
    new Decimal(0)
  );

  const idempotencyKey = useRef<string | null>(null);

const orderMutation = useMutation({
  mutationFn: submitOrder,
});

  const fee = new Decimal("0.005");
  const total = subtotal.plus(fee);

  
async function handleCheckout() {
  if (orderMutation.isPending || items.length === 0) {
    return;
  }

  setError("");

  if (!idempotencyKey.current) {
    idempotencyKey.current = crypto.randomUUID();
  }

  try {
    const order = await orderMutation.mutateAsync({
      items: items.map(({ nft, quantity }) => ({
        nftId: nft.id,
        quantity,
      })),
      wallet,
      idempotencyKey: idempotencyKey.current,
    });

    await navigate({
      to: "/orders/$orderId",
      params: { orderId: order.id },
    });

    clearCart();
  } catch (cause) {
    if (axios.isAxiosError(cause)) {
      const message = cause.response?.data?.message;

      setError(
        typeof message === "string"
          ? message
          : "Falha na comunicação com a API simulada."
      );
    } else {
      setError("Não foi possível concluir o pedido.");
    }
  }
}


  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16 text-white">
        <h1 className="mb-4 text-3xl font-bold">
          Seu carrinho está vazio
        </h1>
        <Link to="/" className="text-[#d9904b]">
          Voltar ao marketplace
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#120b08] text-[#f4e9d9]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
        <Link
          to="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#b99b79] hover:text-[#d9904b]"
        >
          <ArrowLeft size={17} />
          Voltar ao carrinho
        </Link>

        <h1 className="mb-10 text-3xl font-bold">
          Finalizar compra
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="rounded-xl border border-[#38251a] bg-[#21150f] p-6">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold">
              <Wallet className="text-[#d9904b]" />
              Selecionar carteira
            </h2>

            <div className="space-y-4">
              {[
                { id: "metamask", label: "MetaMask (simulada)" },
                { id: "walletconnect", label: "WalletConnect (simulada)" },
              ].map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-4 rounded-lg border border-[#493022] p-5"
                >
                  <input
                    type="radio"
                    name="wallet"
                    value={option.id}
                    checked={wallet === option.id}
                    onChange={() => setWallet(option.id)}
                    className="accent-[#d9904b]"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>

            <p className="mt-6 text-sm leading-6 text-[#b99b79]">
              Esta é uma demonstração. Nenhuma carteira real
              será conectada e nenhum pagamento será realizado.
            </p>
          </section>

          <aside className="h-fit rounded-xl border border-[#38251a] bg-[#21150f] p-6">
            <h2 className="mb-6 text-xl font-bold">
              Resumo do pedido
            </h2>

            <div className="mb-5 space-y-3">
              {items.map(({ nft, quantity }) => (
                <div
                  key={nft.id}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span className="text-[#b99b79]">
                    {nft.name} × {quantity}
                  </span>
                  <span>
                    {new Decimal(nft.price)
                      .times(quantity)
                      .toFixed(3)} ETH
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-[#38251a] pt-5">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(3)} ETH</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Taxa simulada</span>
                <span>{fee.toFixed(3)} ETH</span>
              </div>

              <div className="flex justify-between border-t border-[#38251a] pt-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-[#d9904b]">
                  {total.toFixed(3)} ETH
                </span>
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={orderMutation.isPending}
              className="mt-7 w-full rounded-lg bg-[#d9904b] px-6 py-4 font-bold text-[#120b08] disabled:opacity-50"
            >
              {orderMutation.isPending ? "Processando..." : "Confirmar compra"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}


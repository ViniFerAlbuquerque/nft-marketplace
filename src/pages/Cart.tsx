
import { Link } from "@tanstack/react-router";
import { Trash2, ArrowLeft } from "lucide-react";
import Decimal from "decimal.js";
import { useCart, removeFromCart } from "../features/cart/cartStore";

export default function Cart() {
  const items = useCart();

  const total = items.reduce(
    (sum, item) =>
      sum.plus(new Decimal(item.nft.price).times(item.quantity)),
    new Decimal(0)
  );

  return (
    <main className="min-h-screen bg-[#120b08] text-[#f4e9d9]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#b99b79] hover:text-[#d9904b]"
        >
          <ArrowLeft size={17} />
          Continuar explorando
        </Link>

        <h1 className="mb-10 text-3xl font-bold">
          Meu carrinho
        </h1>

        {items.length === 0 ? (
          <div className="rounded-xl border border-[#38251a] bg-[#21150f] p-10 text-center">
            <p className="mb-6 text-[#b99b79]">
              Seu carrinho está vazio.
            </p>

            <Link
              to="/"
              className="inline-block rounded-lg bg-[#d9904b] px-6 py-3 font-bold text-[#120b08]"
            >
              Explorar NFTs
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <section className="space-y-4">
              {items.map(({ nft, quantity }) => (
                <article
                  key={nft.id}
                  className="flex gap-5 rounded-xl border border-[#38251a] bg-[#21150f] p-4"
                >
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="h-24 w-24 rounded-lg object-cover sm:h-32 sm:w-32"
                  />

                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div>
                      <h2 className="font-bold">{nft.name}</h2>
                      <p className="mt-1 text-sm text-[#b99b79]">
                        {nft.collection}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="text-sm text-[#b99b79]">
                          Quantidade: {quantity}
                        </p>
                        <p className="font-bold text-[#d9904b]">
                          {new Decimal(nft.price)
                            .times(quantity)
                            .toFixed(2)} ETH
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(nft.id)}
                        aria-label={`Remover ${nft.name}`}
                        className="rounded-lg border border-[#493022] p-3 text-[#f4e9d9] hover:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-xl border border-[#38251a] bg-[#21150f] p-6">
              <h2 className="mb-6 text-xl font-bold">
                Resumo do pedido
              </h2>

              <div className="mb-4 flex justify-between text-sm text-[#b99b79]">
                <span>Itens</span>
                <span>
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <div className="mb-6 flex justify-between border-t border-[#38251a] pt-5">
                <span className="font-semibold">Subtotal</span>
                <span className="font-bold text-[#d9904b]">
                  {total.toFixed(2)} ETH
                </span>
              </div>

              <Link
                to="/checkout"
                className="block rounded-lg bg-[#d9904b] px-6 py-4 text-center font-bold text-[#120b08] hover:bg-[#e9a869]"
              >
                Finalizar compra
              </Link>

              <p className="mt-4 text-center text-xs text-[#b99b79]">
                Checkout demonstrativo. Nenhum pagamento real será realizado.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}


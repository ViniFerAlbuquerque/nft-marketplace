import { Link } from "@tanstack/react-router";
import { Trash2, Minus, Plus } from "lucide-react";
import Decimal from "decimal.js";

import {
  useCart,
  removeFromCart,
  updateCartQuantity,
} from "../features/cart/cartStore";
import { nfts } from "../mocks/fixtures/nfts";
import Footer from "../components/layout/Footer";
import { useState } from "react";

export default function Cart() {
  const items = useCart();
  const [relatedPage, setRelatedPage] = useState(0);
  const subtotal = items.reduce(
    (sum, item) =>
      sum.plus(new Decimal(item.nft.price).times(item.quantity)),
    new Decimal(0)
  );

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const relatedNFTs = nfts.filter(
    (nft) => !items.some((item) => item.nft.id === nft.id)
  );

  const visibleRelated = relatedNFTs.length
    ? Array.from(
      { length: Math.min(5, relatedNFTs.length) },
      (_, index) =>
        relatedNFTs[(relatedPage * 3 + index) % relatedNFTs.length]
    )
    : [];

  return (
    <main className="min-h-screen bg-[#120b08] font-mono text-[#f4e9d9]">
      <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-10 sm:px-6 lg:px-0">
        {/* CAMINHO */}
        <nav className="mb-5 flex items-center gap-2 text-[12px]">
          <Link to="/" className="hover:text-[#d9904b]">
            Início
          </Link>
          <span>/</span>
          <Link
            to="/"
            hash="marketplace"
            className="hover:text-[#d9904b]"
          >
            Mercado
          </Link>
          <span>/</span>
          <span className="text-[#d9904b]">Carrinho</span>
        </nav>

        {/* CARRINHO E RESUMO */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
          <section aria-label="NFTs no carrinho">
            <div className="grid grid-cols-[minmax(0,1fr)_95px_90px_95px_30px] gap-2 border-b border-[#805337] pb-3 text-[12px] font-bold max-sm:hidden">
              <span>NFTs</span>
              <span>Preço</span>
              <span>Edições</span>
              <span>Total</span>
              <span />
            </div>

            {items.length === 0 ? (
              <div className="border-b border-[#493022] py-12 text-center">
                <p className="text-[13px] text-[#b99b79]">
                  Seu carrinho está vazio.
                </p>
                <Link
                  to="/"
                  hash="marketplace"
                  className="mt-5 inline-flex rounded bg-[#d9904b] px-5 py-3 text-[12px] font-bold text-[#120b08]"
                >
                  Explorar NFTs
                </Link>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                {items.map(({ nft, quantity }) => (
                  <article
                    key={nft.id}
                    className="grid gap-3 bg-[#261813] p-3 sm:grid-cols-[minmax(0,1fr)_95px_90px_95px_30px] sm:items-center sm:gap-2"
                  >
                    <Link
                      to="/nft/$nftId"
                      params={{ nftId: nft.id }}
                      className="flex min-w-0 items-center gap-3"
                    >
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="h-[72px] w-[72px] shrink-0 rounded-md object-cover"
                      />

                      <div className="min-w-0">
                        <h2 className="truncate text-[12px] font-bold">
                          {nft.name}
                        </h2>
                        <p className="mt-1 truncate text-[10px] text-[#b99b79]">
                          {nft.collection}
                        </p>
                      </div>
                    </Link>

                    <p className="text-[12px] font-bold text-[#d9904b]">
                      {new Decimal(nft.price).toFixed(2)} ETH
                    </p>


                    <div className="inline-flex w-fit items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(nft.id, quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label={`Diminuir quantidade de ${nft.name}`}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9904b] text-[#120b08] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus size={13} />
                      </button>

                      <span className="min-w-5 text-center text-[12px] font-bold">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateCartQuantity(nft.id, quantity + 1)}
                        disabled={quantity >= 99}
                        aria-label={`Aumentar quantidade de ${nft.name}`}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9904b] text-[#120b08] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus size={13} />
                      </button>
                    </div>


                    <p className="text-[12px] font-bold text-[#d9904b]">
                      {new Decimal(nft.price)
                        .times(quantity)
                        .toFixed(2)}{" "}
                      ETH
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromCart(nft.id)}
                      aria-label={`Remover ${nft.name}`}
                      title="Remover NFT"
                      className="w-fit text-[#b99b79] hover:text-[#d9904b]"
                    >
                      <Trash2 size={17} />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* RESUMO DA CARTEIRA */}
          <aside className="min-w-0">
            <h2 className="border-b border-[#805337] pb-3 text-[14px] font-bold">
              Resumo da carteira
            </h2>

            <div className="mt-5">
              <label
                htmlFor="cart-coupon"
                className="mb-2 block text-[11px] font-bold"
              >
                Código promocional
              </label>

              <div className="flex">
                <input
                  id="cart-coupon"
                  type="text"
                  disabled
                  placeholder="Digite o código promocional..."
                  className="h-10 min-w-0 flex-1 border border-[#805337] bg-[#21150f] px-3 text-[10px] text-[#f4e9d9] placeholder:text-[#957a61]"
                />
                <button
                  type="button"
                  disabled
                  title="Cupons ainda não disponíveis"
                  className="h-10 cursor-not-allowed bg-[#d9904b]/60 px-4 text-[11px] font-bold text-[#120b08]"
                >
                  Aplicar
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-[12px]">
              <div className="flex justify-between gap-3">
                <span className="text-[#b99b79]">
                  Subtotal ({itemCount} itens)
                </span>
                <span>{subtotal.toFixed(2)} ETH</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-[#b99b79]">
                  Desconto de lançamento
                </span>
                <span>0.00 ETH</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-[#b99b79]">
                  Taxa de rede
                </span>
                <span className="text-[#b99b79]">
                  No checkout
                </span>
              </div>

              <div className="flex justify-between gap-3 border-t border-[#493022] pt-4 text-[14px] font-bold">
                <span>Total dos itens</span>
                <span className="text-[#d9904b]">
                  {subtotal.toFixed(2)} ETH
                </span>
              </div>
            </div>

            {items.length > 0 ? (
              <Link
                to="/checkout"
                className="mt-5 flex min-h-11 items-center justify-center rounded bg-[#d9904b] px-4 text-[12px] font-bold text-[#120b08] hover:bg-[#e9a869]"
              >
                Conectar e finalizar
              </Link>
            ) : (
              <span className="mt-5 flex min-h-11 items-center justify-center rounded bg-[#d9904b]/40 px-4 text-[12px] font-bold text-[#120b08]">
                Conectar e finalizar
              </span>
            )}

            <Link
              to="/"
              hash="marketplace"
              className="mt-3 block text-center text-[11px] text-[#d9904b] hover:underline"
            >
              Continuar explorando
            </Link>

            <p className="mt-4 text-[10px] leading-5 text-[#957a61]">
              Compra demonstrativa. A conexão com carteira
              blockchain e o pagamento real não estão habilitados.
            </p>
          </aside>
        </div>

        {/* COLECIONADORES TAMBÉM VIRAM */}
        <section className="mt-24 mb-20">
          <h2 className="mb-7 text-[14px] font-bold text-[#d9904b]">
            Colecionadores também viram
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {visibleRelated.map((nft) => (
              <Link
                key={nft.id}
                to="/nft/$nftId"
                params={{ nftId: nft.id }}
                className="group min-w-0"
              >
                <div className="overflow-hidden rounded-lg bg-[#261813]">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]"
                  />
                </div>

                <h3 className="mt-3 truncate text-[11px] group-hover:text-[#d9904b]">
                  {nft.name}
                </h3>

                <p className="mt-1 text-[11px] font-bold text-[#d9904b]">
                  {nft.price} ETH
                </p>
              </Link>
            ))}
          </div>

          {/* PAGINAÇÃO DOS PRODUTOS RELACIONADOS */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {[0, 1, 2].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setRelatedPage(page)}
                disabled={relatedNFTs.length <= 5}
                aria-label={`Exibir grupo ${page + 1} de NFTs`}
                aria-pressed={relatedPage === page}
                className={`h-[8px] w-[8px] rounded-full transition-colors ${
                  relatedPage === page
                    ? "bg-[#d9904b]"
                    : "border border-[#d9904b] bg-transparent"
                } disabled:cursor-default`}
              />
            ))}
          </div>
        </section>

      
      </div>

      <Footer />
    </main>
  );
}

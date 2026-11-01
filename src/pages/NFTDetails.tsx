
import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { nfts } from "../mocks/fixtures/nfts";
import { addToCart } from "../features/cart/cartStore";

export default function NFTDetails() {
  const { nftId } = useParams({ from: "/nft/$nftId" });
  const nft = nfts.find((item) => item.id === nftId);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!nft) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16 text-white">
        <h1 className="text-2xl font-bold">NFT não encontrado</h1>
        <Link to="/" className="mt-4 inline-block text-[#d9904b]">
          Voltar ao marketplace
        </Link>
      </main>
    );
  }

  function handleAddToCart() {
    if (!nft) return;
    addToCart(nft, quantity);
    setAdded(true);
  }

  return (
    <main className="min-h-screen bg-[#120b08] text-[#f4e9d9]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#b99b79] hover:text-[#d9904b]"
        >
          <ArrowLeft size={17} />
          Voltar ao marketplace
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-[#38251a] bg-[#21150f]">
            <img
              src={nft.image}
              alt={nft.name}
              className="aspect-square w-full object-cover"
            />
          </div>

          <section>
            <p className="mb-3 text-sm uppercase tracking-widest text-[#d9904b]">
              {nft.collection}
            </p>

            <h1 className="mb-4 text-4xl font-black lg:text-5xl">
              {nft.name}
            </h1>

            <p className="mb-8 text-[#b99b79]">
              Criado por {nft.creator}
            </p>

            <div className="mb-8 rounded-xl border border-[#38251a] bg-[#21150f] p-6">
              <p className="mb-2 text-sm text-[#b99b79]">
                Preço por unidade
              </p>

              <p className="text-4xl font-bold text-[#d9904b]">
                {nft.price} ETH
              </p>
            </div>

            <div className="mb-8">
              <p className="mb-3 font-semibold">Quantidade</p>

              <div className="inline-flex items-center overflow-hidden rounded-lg border border-[#493022]">
                <button
                  type="button"
                  onClick={() => {
                    setQuantity((current) => Math.max(1, current - 1));
                    setAdded(false);
                  }}
                  aria-label="Diminuir quantidade"
                  className="p-3 hover:bg-[#38251a]"
                >
                  <Minus size={18} />
                </button>

                <span className="min-w-14 text-center font-bold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setQuantity((current) => Math.min(99, current + 1));
                    setAdded(false);
                  }}
                  aria-label="Aumentar quantidade"
                  className="p-3 hover:bg-[#38251a]"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#d9904b] px-6 py-4 font-bold text-[#120b08] hover:bg-[#e9a869]"
            >
              <ShoppingCart size={20} />
              Adicionar ao carrinho
            </button>

            {added && (
              <div role="status" className="mt-5 rounded-lg border border-[#493022] p-4">
                <p className="mb-2 text-[#f4e9d9]">
                  NFT adicionado ao carrinho!
                </p>
                <Link to="/cart" className="font-semibold text-[#d9904b]">
                  Ver carrinho
                </Link>
              </div>
            )}

            <div className="mt-10 border-t border-[#38251a] pt-6">
              <h2 className="mb-3 text-xl font-bold">Sobre este NFT</h2>
              <p className="leading-7 text-[#b99b79]">
                Explore esta peça da coleção {nft.collection},
                criada por {nft.creator}. Esta é uma demonstração
                de compra de NFT, sem transações reais em blockchain.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}


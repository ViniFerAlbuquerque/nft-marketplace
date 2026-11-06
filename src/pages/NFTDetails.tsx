
import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  Star,
} from "lucide-react";

import { nfts } from "../mocks/fixtures/nfts";
import { addToCart } from "../features/cart/cartStore";
import Footer from "../components/layout/Footer";

export default function NFTDetails() {
  const { nftId } = useParams({ from: "/nft/$nftId" });
  const nft = nfts.find((item) => item.id === nftId);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">(
    "details"
  );
  const [relatedPage, setRelatedPage] = useState(0);
  const [shareMessage, setShareMessage] = useState("");

  if (!nft) {
    return (
      <main className="min-h-screen bg-[#120b08] text-[#f4e9d9]">
        <div className="mx-auto max-w-[1200px] px-5 py-16">
          <h1 className="text-2xl font-bold">NFT não encontrado</h1>
          <Link to="/" className="mt-4 inline-block text-[#d9904b]">
            Voltar ao marketplace
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const galleryImages = [nft.image, nft.image, nft.image, nft.image];

  const relatedNFTs = nfts.filter((item) => item.id !== nft.id);
  const visibleRelated = Array.from(
    { length: Math.min(5, relatedNFTs.length) },
    (_, index) =>
      relatedNFTs[(relatedPage + index) % relatedNFTs.length]
  );

  function handleAddToCart() {
    if (!nft) return;
    addToCart(nft, quantity);
    setAdded(true);
  }

  async function handleShare() {
    if (!navigator.clipboard) {
      setShareMessage("Copie o endereço desta página no navegador.");
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage("Link copiado!");
    } catch {
      setShareMessage("Não foi possível copiar o link.");
    }
  }

  return (
    <main className="min-h-screen bg-[#120b08] font-mono text-[#f4e9d9]">
      <div className="mx-auto max-w-[1200px] px-4 pb-12 pt-8 sm:px-6 lg:px-0">
        {/* TOPO: GALERIA E INFORMAÇÕES */}
        <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <nav className="mb-6 flex items-center gap-2 text-[12px]">
              <Link
                to="/"
                className="text-[#d9904b] hover:underline"
              >
                Início
              </Link>
              <span className="text-[#80624a]">/</span>
              <Link
                to="/"
                hash="marketplace"
                className="text-[#f4e9d9] hover:text-[#d9904b]"
              >
                Mercado
              </Link>
            </nav>

            <div className="grid grid-cols-[62px_minmax(0,1fr)] gap-4 sm:grid-cols-[90px_minmax(0,1fr)]">
              <div className="flex flex-col gap-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Visualizar imagem ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`overflow-hidden rounded-lg border-2 ${activeImage === index
                      ? "border-[#d9904b]"
                      : "border-transparent"
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${nft.name} - miniatura ${index + 1}`}
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-[20px] bg-[#241710]">
                <img
                  src={galleryImages[activeImage]}
                  alt={nft.name}
                  className="aspect-square h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    setActiveImage(
                      (current) => (current + 1) % galleryImages.length
                    )
                  }
                  aria-label="Próxima imagem"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#120b08]/80 text-[#f4e9d9] hover:bg-[#d9904b] hover:text-[#120b08]"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 lg:pt-12">
            <h1 className="text-[24px] font-bold leading-tight sm:text-[28px]">
              {nft.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#493022] pb-3">
              <p className="text-[19px] font-bold text-[#d9904b]">
                {nft.price} ETH
              </p>

              <div className="flex items-center gap-1 text-[10px]">
                <span className="flex gap-0.5 text-[#d9904b]">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={12}
                      fill="currentColor"
                    />
                  ))}
                </span>
                <span className="text-[#c8ad92]">
                  19 avaliações de colecionadores
                </span>
              </div>
            </div>

            <h2 className="mt-4 text-[12px] font-bold">
              Sobre este NFT:
            </h2>

            <p className="mt-3 text-[11px] leading-[1.8] text-[#b99b79]">
              Um colecionável digital finalizado à mão da coleção Kurio
              Editions, verificado na Ethereum, com arte desbloqueável
              e acesso para colecionadores.
            </p>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-bold">Edição:</p>
              <div className="flex flex-wrap gap-2">

                {["1/1", "1/10", "1/50", "ABERTA"].map((edition) => (
                  <span
                    key={edition}
                    className={`rounded-full border px-2 py-1 text-[10px] ${edition === "1/50"
                        ? "border-[#d9904b] bg-[#3b2517] text-[#d9904b]"
                        : "border-[#805337] text-[#d9b48b]"
                      }`}
                  >
                    {edition}
                  </span>
                ))}

              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center overflow-hidden rounded-full border border-[#805337]">
                <button
                  type="button"
                  onClick={() => {
                    setQuantity((value) => Math.max(1, value - 1));
                    setAdded(false);
                  }}
                  aria-label="Diminuir quantidade"
                  className="flex h-9 w-9 items-center justify-center bg-[#d9904b] text-[#120b08]"
                >
                  <Minus size={15} />
                </button>

                <span className="min-w-10 text-center text-[12px] font-bold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setQuantity((value) => Math.min(99, value + 1));
                    setAdded(false);
                  }}
                  aria-label="Aumentar quantidade"
                  className="flex h-9 w-9 items-center justify-center bg-[#d9904b] text-[#120b08]"
                >
                  <Plus size={15} />
                </button>
              </div>

              <div className="flex flex-1 flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[#d9904b] px-7 text-[12px] font-bold text-[#120b08] hover:bg-[#e9a869]"
                >
                  COMPRAR
                </button>

                <button
                  type="button"
                  onClick={() => setFavorite((value) => !value)}
                  aria-pressed={favorite}
                  className="inline-flex min-h-10 items-center gap-2 rounded-md border border-[#d9904b] px-4 text-[11px] text-[#d9904b] hover:bg-[#2c1a11]"
                >
                  <Heart
                    size={15}
                    fill={favorite ? "currentColor" : "none"}
                  />
                  {favorite ? "Favoritado" : "Favoritar"}
                </button>
              </div>
            </div>

            {added && (
              <div
                role="status"
                className="mt-3 rounded-md border border-[#805337] px-4 py-3 text-[11px]"
              >
                NFT adicionado ao carrinho.{" "}
                <Link
                  to="/cart"
                  className="font-bold text-[#d9904b] underline"
                >
                  Ver carrinho
                </Link>
              </div>
            )}

            <div className="mt-5 space-y-2 text-[11px] text-[#b99b79]">
              <p>
                <span className="text-[#d9904b]">ID do token:</span>{" "}
                #{nft.id.padStart(4, "0")}
              </p>
              <p>
                <span className="text-[#d9904b]">Coleção:</span>{" "}
                {nft.collection}
              </p>
              <p>
                <span className="text-[#d9904b]">Criador:</span>{" "}
                {nft.creator}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px]">
              <span>Compartilhar este NFT:</span>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1 text-[#d9904b] hover:text-[#f4e9d9]"
              >
                <Share2 size={15} />
                Copiar link
              </button>
              {shareMessage && (
                <span role="status" className="text-[#b99b79]">
                  {shareMessage}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* DESCRIÇÃO */}
        <section className="mt-12 min-h-[280px]">
          <div className="flex flex-wrap gap-7 border-b border-[#493022] text-[12px]">
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`border-b-2 pb-3 ${activeTab === "details"
                ? "border-[#d9904b] text-[#d9904b]"
                : "border-transparent text-[#c8ad92]"
                }`}
            >
              Detalhes do NFT
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`border-b-2 pb-3 ${activeTab === "reviews"
                ? "border-[#d9904b] text-[#d9904b]"
                : "border-transparent text-[#c8ad92]"
                }`}
            >
              Avaliações de colecionadores (19)
            </button>
          </div>

          {activeTab === "details" ? (
            <div className="space-y-5 pt-5 text-[11px] leading-[1.9] text-[#b99b79]">
              <p>
                {nft.name} é uma obra digital da coleção{" "}
                {nft.collection}. Cada atributo representa uma
                característica da peça e sua identidade dentro
                do universo da KURIO.
              </p>

              <p>
                A propriedade digital é um conceito associado
                a registros de procedência e colecionáveis.
                Nesta aplicação, os dados são demonstrativos
                e não representam registros reais em blockchain.
              </p>

              <div>
                <p className="font-bold text-[#f4e9d9]">Rede:</p>
                <p>Ethereum (referência visual do protótipo).</p>
              </div>

              <div>
                <p className="font-bold text-[#f4e9d9]">Contrato:</p>
                <p>
                  Contrato demonstrativo. Nenhum endereço real
                  foi associado a este NFT.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#f4e9d9]">
                  Direitos autorais:
                </p>
                <p>
                  A titularidade e as permissões dependem dos
                  termos definidos pelo criador.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-8 text-[12px] leading-6 text-[#b99b79]">
              <p>
                O layout de referência apresenta 19 avaliações.
                Os comentários ainda não estão disponíveis
                nos dados demonstrativos.
              </p>
            </div>
          )}
        </section>

        {/* MAIS DESTA COLEÇÃO */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#d9904b]">
              Mais desta coleção
            </h2>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setRelatedPage((value) =>
                    (value - 1 + relatedNFTs.length) %
                    relatedNFTs.length
                  )
                }
                aria-label="Produtos anteriores"
                className="rounded-full border border-[#805337] p-2 text-[#d9904b] hover:bg-[#2c1a11]"
              >
                <ChevronLeft size={15} />
              </button>

              <button
                type="button"
                onClick={() =>
                  setRelatedPage((value) =>
                    (value + 1) % relatedNFTs.length
                  )
                }
                aria-label="Próximos produtos"
                className="rounded-full border border-[#805337] p-2 text-[#d9904b] hover:bg-[#2c1a11]"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {visibleRelated.map((item) => (
              <Link
                key={item.id}
                to="/nft/$nftId"
                params={{ nftId: item.id }}
                className="group min-w-0"
              >
                <div className="overflow-hidden rounded-lg bg-[#241710]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform group-hover:scale-[1.035]"
                  />
                </div>

                <h3 className="mt-3 truncate text-[11px] text-[#f4e9d9] group-hover:text-[#d9904b]">
                  {item.name}
                </h3>

                <p className="mt-1 text-[11px] font-bold text-[#d9904b]">
                  {item.price} ETH
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {[0, 1, 2].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setRelatedPage(page)}
                aria-label={`Exibir grupo ${page + 1}`}
                aria-pressed={relatedPage === page}
                className={`h-2 w-2 rounded-full ${relatedPage === page
                  ? "bg-[#d9904b]"
                  : "border border-[#d9904b]"
                  }`}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

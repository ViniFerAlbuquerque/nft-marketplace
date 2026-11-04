import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import Footer from "../components/layout/Footer";
import Decimal from "decimal.js";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import NFTCard from "../components/nft/NFTCard";
import { nfts } from "../mocks/fixtures/nfts";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc";

type MarketplaceTab = "all" | "new" | "trending";

function readFilters() {
  const params = new URLSearchParams(window.location.search);

  const allowedSorts: SortOption[] = [
    "default",
    "price-asc",
    "price-desc",
    "name-asc",
  ];

  const requestedSort = params.get("sort") as SortOption;

  return {
    search: params.get("search") ?? "",
    collection: params.get("collection") ?? "Todas",
    sort: allowedSorts.includes(requestedSort)
      ? requestedSort
      : ("default" as SortOption),
  };
}


const figmaCategories = [
  { name: "Arte digital", count: 33 },
  { name: "Fotografia", count: 12 },
  { name: "Música", count: 65 },
  { name: "Arte 3D", count: 39 },
  { name: "Colecionáveis", count: 23 },
  { name: "Generativa", count: 17 },
  { name: "Jogos", count: 19 },
  { name: "Assinaturas", count: 13 },
  { name: "Utilidade", count: 18 },
] as const;


export default function Home() {
  const [initialFilters] = useState(readFilters);

  const [search, setSearch] = useState(initialFilters.search);
  const [collection, setCollection] = useState(
    initialFilters.collection,
  );
  const [sort, setSort] = useState<SortOption>(
    initialFilters.sort,
  );

  const [activeTab, setActiveTab] =
    useState<MarketplaceTab>("all");

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2.3);
  const [appliedPrice, setAppliedPrice] = useState<[number, number]>([0, 2.3]);
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const collectionCounts = useMemo(() =>
    new Map([...new Set(nfts.map((nft) => nft.collection))].map((name) => [name, nfts.filter((nft) => nft.collection === name).length])),
    []
  );


  const collections = useMemo(
    () => [
      "Todas",
      ...new Set(nfts.map((nft) => nft.collection)),
    ],
    [],
  );

  const featuredNFT = nfts[0];
  const secondaryNFT = nfts[1] ?? nfts[0];

  function updateFilters(
    nextSearch: string,
    nextCollection: string,
    nextSort: SortOption,
  ) {
    const params = new URLSearchParams();

    if (nextSearch.trim()) {
      params.set("search", nextSearch.trim());
    }

    if (nextCollection !== "Todas") {
      params.set("collection", nextCollection);
    }

    if (nextSort !== "default") {
      params.set("sort", nextSort);
    }

    const query = params.toString();

    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
    );
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
    updateFilters(value, collection, sort);
  }

  function handleCollection(value: string) {
    setCollection(value);
    setPage(1);
    updateFilters(search, value, sort);
    setMobileFiltersOpen(false);
  }

  function handleSort(value: SortOption) {
    setSort(value);
    setPage(1);
    updateFilters(search, collection, value);
  }

  function clearFilters() {
    setSearch("");
    setMinPrice(0);
    setMaxPrice(2.3);
    setAppliedPrice([0, 2.3]);
    setPage(1);
    setCollection("Todas");
    setSort("default");
    setActiveTab("all");
    setMobileFiltersOpen(false);
    updateFilters("", "Todas", "default");
  }

  const filteredNFTs = useMemo(() => {
    const term = search.trim().toLowerCase();

    const results = nfts.filter((nft) => {
      const matchesSearch =
        !term ||
        [nft.name, nft.collection, nft.creator].some(
          (value) => value.toLowerCase().includes(term),
        );

      const matchesCollection =
        collection === "Todas" ||
        nft.collection === collection;

      const price = Number(nft.price);
      const matchesPrice = price >= appliedPrice[0] && price <= appliedPrice[1];
      return matchesSearch && matchesCollection && matchesPrice;
    });

    if (activeTab === "new") {
      results.reverse();
    }

    if (activeTab === "trending") {
      results.sort((a, b) =>
        new Decimal(b.price).comparedTo(
          new Decimal(a.price),
        ),
      );
    }

    if (sort !== "default") {
      results.sort((a, b) => {
        switch (sort) {
          case "price-asc":
            return new Decimal(a.price).comparedTo(
              new Decimal(b.price),
            );

          case "price-desc":
            return new Decimal(b.price).comparedTo(
              new Decimal(a.price),
            );

          case "name-asc":
            return a.name.localeCompare(b.name);

          default:
            return 0;
        }
      });
    }

    return results;
  }, [search, collection, sort, activeTab, appliedPrice]);

  const hasActiveFilters =
    search.trim() !== "" ||
    collection !== "Todas" ||
    sort !== "default" ||
    activeTab !== "all" ||
    appliedPrice[0] !== 0 || appliedPrice[1] !== 2.3;

  const totalPages = Math.max(1, Math.ceil(filteredNFTs.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleNFTs = filteredNFTs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <main className="min-h-screen bg-[#120b08] font-mono text-[#f4e9d9]">
      <style>{`
        .price-range { pointer-events: none; }
        .price-range::-webkit-slider-thumb { pointer-events: auto; appearance: none; width: 15px; height: 15px; border-radius: 50%; background: #d9904b; border: 2px solid #f4c38c; cursor: ew-resize; }
        .price-range::-moz-range-thumb { pointer-events: auto; width: 12px; height: 12px; border-radius: 50%; background: #d9904b; border: 2px solid #f4c38c; cursor: ew-resize; }
      `}</style>
      <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-6 sm:px-6 lg:px-10">

        {/* BUSCA MOBILE */}
        <div className="mb-6 flex gap-3 lg:hidden">
          <div className="relative min-w-0 flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b99b79]"
            />

            <input
              type="search"
              aria-label="Buscar NFTs"
              placeholder="Explorar coleções"
              value={search}
              onChange={(event) =>
                handleSearch(event.target.value)
              }
              className="h-14 w-full rounded-xl border border-[#38251a] bg-[#261813] pl-12 pr-3 text-sm text-[#f4e9d9] placeholder:text-[#b99b79] focus:border-[#d9904b] focus:outline-none"
            />
          </div>

          <button
            type="button"
            aria-label="Abrir filtros"
            aria-expanded={mobileFiltersOpen}
            onClick={() =>
              setMobileFiltersOpen((previous) => !previous)
            }
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#d9904b] text-[#120b08]"
          >
            <SlidersHorizontal size={23} />
          </button>
        </div>

        {/* HERO */}
        <section className="relative mb-12 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#69452d] via-[#3b261b] to-[#21140f] px-5 py-7 sm:px-10 lg:mb-16 lg:rounded-none lg:bg-none lg:px-8 lg:py-10">
          <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full border-[55px] border-[#d9904b]/10 lg:hidden" />

          <div className="relative grid items-center gap-8 md:grid-cols-2 lg:min-h-[480px]">
            <div className="relative z-10">
              <p className="mb-4 text-sm tracking-wide text-[#f4e9d9]">
                Bem-vindo à Kurio
              </p>

              <h1 className="max-w-xl text-3xl font-extrabold uppercase leading-tight tracking-wide text-white sm:text-4xl lg:text-5xl">
                <span className="lg:hidden">
                  Seja dono da cultura digital
                </span>

                <span className="hidden lg:inline">
                  Seja dono do futuro da arte digital
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#d4b99c]">
                Descubra NFTs selecionados de criadores emergentes e consagrados.
                Colecione arte digital rara, apoie artistas e tenha uma parte da
                cultura da internet.
              </p>

              <a
                href="#marketplace"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-[#d9904b] px-7 py-3 font-mono text-sm font-extrabold uppercase tracking-wide text-[#120b08] transition hover:bg-[#edaa67]"
              >
                Explorar
              </a>
            </div>

            <div className="relative mx-auto w-full max-w-[540px]">
              <img
                src={featuredNFT.image}
                alt={featuredNFT.name}
                className="block h-[320px] w-full rounded-[24px] object-cover sm:h-[400px] lg:h-[470px]"
              />

              <img
                src={secondaryNFT.image}
                alt={secondaryNFT.name}
                className="absolute -bottom-3 -left-3 h-24 w-24 rounded-2xl border-4 border-[#3b261b] object-cover md:hidden"
              />
            </div>
          </div>
          {/* <div className="relative mt-3 flex justify-center gap-3 lg:justify-center">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className={`h-2.5 w-2.5 rounded-full ${dot === 0 ? "bg-[#d9904b]" : "bg-[#72513b]"
                  }`}
              />
            ))}
          </div> */}
          <div className="relative -mt-3 flex justify-center gap-3 lg:-mt-10 lg:justify-center">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className={`h-2.5 w-2.5 rounded-full ${dot === 0 ? "bg-[#d9904b]" : "bg-[#72513b]"
                  }`}
              />
            ))}
          </div>
        </section>

        {/* MARKETPLACE — Products Desktop / Figma */}
        <section id="marketplace" className="scroll-mt-24">
          <div className="grid gap-6 lg:grid-cols-[310px_minmax(0,1fr)] lg:gap-10">
            {/* SIDEBAR: filtros e NFT em destaque */}
            <aside className={`${mobileFiltersOpen ? "block" : "hidden"} self-start lg:block`}>
              <div className="border border-[#493022] bg-[#21150f] px-5 py-6 lg:px-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#f4e9d9]">Coleções</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="Fechar filtros"
                    className="text-[#b99b79] lg:hidden"
                  >
                    <X size={18} />
                  </button>
                </div>
                {/* 
                <div className="space-y-3">
                  {collections.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleCollection(item)}
                      aria-pressed={collection === item}
                      className={`flex w-full items-center justify-between gap-3 text-left text-xs transition-colors ${collection === item
                          ? "font-semibold text-[#d9904b]"
                          : "text-[#b99b79] hover:text-[#d9904b]"
                        }`}
                    >
                      <span className="truncate">{item === "Todas" ? "Todas as coleções" : item}</span>
                      <span className="shrink-0">({item === "Todas" ? nfts.length : collectionCounts.get(item) ?? 0})</span>
                    </button>
                  ))}
                </div> */}


                <div className="space-y-3">
                  {figmaCategories.map(({ name, count }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-3 text-xs text-[#c9ad90]"
                    >
                      <span>{name}</span>
                      <span className="tabular-nums">({count})</span>
                    </div>
                  ))}
                </div>


                <div className="mt-8 border-t border-[#493022] pt-6">
                  <h3 className="mb-4 text-sm font-bold text-[#f4e9d9]">Faixa de preço</h3>
                  <div className="space-y-4">
                    <div className="relative h-7" aria-label="Selecionar faixa de preço em ETH">
                      <div className="absolute inset-x-0 top-[13px] h-[3px] rounded-full bg-[#65452f]" />
                      <div
                        className="pointer-events-none absolute top-[13px] h-[3px] bg-[#d9904b]"
                        style={{ left: `${(minPrice / 2.3) * 100}%`, right: `${100 - (maxPrice / 2.3) * 100}%` }}
                      />
                      <input
                        type="range" min="0" max="2.3" step="0.01" value={minPrice}
                        onChange={(event) => setMinPrice(Math.min(Number(event.target.value), maxPrice))}
                        aria-label="Preço mínimo em ETH"
                        className="price-range absolute inset-x-0 top-0 h-7 w-full appearance-none bg-transparent accent-[#d9904b]"
                      />
                      <input
                        type="range" min="0" max="2.3" step="0.01" value={maxPrice}
                        onChange={(event) => setMaxPrice(Math.max(Number(event.target.value), minPrice))}
                        aria-label="Preço máximo em ETH"
                        className="price-range absolute inset-x-0 top-0 h-7 w-full appearance-none bg-transparent accent-[#d9904b]"
                      />
                    </div>
                    <p className="text-xs text-[#b99b79]">Preço: {minPrice.toFixed(2)} – {maxPrice.toFixed(2)} ETH</p>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedPrice([minPrice, maxPrice]);
                        setPage(1);
                        setMobileFiltersOpen(false);
                      }}
                      className="rounded bg-[#d9904b] px-5 py-2 text-xs font-bold text-[#120b08] hover:bg-[#edaa67]"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#493022] pt-6">
                  <h3 className="mb-4 text-sm font-bold text-[#f4e9d9]">Rede</h3>
                  <div className="space-y-3" aria-label="Redes exibidas como referência visual; filtro indisponível">
                    {([
                      ["Ethereum", "119"],
                      ["Polygon", "78"],
                      ["Solana", "86"],
                    ] as const).map(([network, figmaCount]) => (
                      <div key={network} className="flex items-center justify-between text-xs text-[#b99b79]">
                        <span>{network}</span>
                        <span>({figmaCount})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-7 w-full rounded border border-[#d9904b] px-3 py-2 text-xs font-bold text-[#d9904b] hover:bg-[#d9904b]/10"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>

              {/* NFT em destaque — segue a coluna lateral do Figma */}
              <div id="featured" className="mt-5 overflow-hidden bg-[#21150f] pb-4">
                <div className="px-3 pt-5 text-center">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[#d9904b]">NFT EM DESTAQUE</h3>
                  <p className="mt-2 text-xs font-bold uppercase text-[#f4e9d9]">OFERTA LIMITADA</p>
                </div>
                <Link to="/nft/$nftId" params={{ nftId: secondaryNFT.id }} className="mt-4 block overflow-hidden rounded-lg">
                  <img
                    src={secondaryNFT.image}
                    alt={secondaryNFT.name}
                    className="aspect-[310/470] w-full object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="px-3 pt-3">
                  <p className="text-sm text-[#f4e9d9]">{secondaryNFT.name}</p>
                  <p className="mt-1 text-sm font-bold text-[#d9904b]">{secondaryNFT.price} ETH</p>
                </div>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="min-w-0">
              <div className="relative mb-7 flex flex-col gap-4 border-b border-[#493022] pb-0 xl:flex-row xl:items-end xl:justify-between">
                <div role="group" aria-label="Categorias do marketplace" className="flex items-center gap-5 overflow-x-auto">
                  {([
                    ["all", "Todos os NFTs"],
                    ["new", "Novos lançamentos"],
                    ["trending", "Em alta"],
                  ] as const).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => { setActiveTab(value); setPage(1); }}
                      aria-pressed={activeTab === value}
                      className={`shrink-0 border-b-2 pb-3 text-xs transition-colors sm:text-sm ${activeTab === value
                        ? "border-[#d9904b] font-bold text-[#d9904b]"
                        : "border-transparent text-[#f4e9d9] hover:text-[#d9904b]"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <label className="flex shrink-0 items-center gap-2 text-xs text-[#b99b79]">
                  Ordenar por:
                  <select
                    aria-label="Ordenar NFTs"
                    value={sort}
                    onChange={(event) => handleSort(event.target.value as SortOption)}
                    className="max-w-[190px] border-0 bg-[#21150f] px-2 py-2 text-xs text-[#f4e9d9] focus:outline focus:outline-[#d9904b]"
                  >
                    <option value="default">Listados recentemente</option>
                    <option value="price-asc">Menor preço</option>
                    <option value="price-desc">Maior preço</option>
                    <option value="name-asc">Nome A–Z</option>
                  </select>
                </label>
              </div>

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p aria-live="polite" className="text-xs text-[#b99b79]">
                  {filteredNFTs.length} NFTs encontrados
                </p>
              </div>

              {filteredNFTs.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
                    {visibleNFTs.map((nft) => <NFTCard key={nft.id} nft={nft} />)}
                  </div>
                  {filteredNFTs.length > 0 && (
                    <nav aria-label="Paginação de NFTs" className="mt-10 flex items-center justify-center gap-2 border-t border-[#493022] pt-6">
                      <button
                        type="button"
                        aria-label="Página anterior"
                        disabled={currentPage === 1}
                        onClick={() => setPage((previous) => Math.max(1, previous - 1))}
                        className="flex h-9 w-9 items-center justify-center rounded border border-[#493022] text-[#d9904b] hover:border-[#d9904b] disabled:cursor-not-allowed disabled:opacity-30"
                      ><ChevronLeft size={17} /></button>
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                        <button
                          key={number}
                          type="button"
                          onClick={() => setPage(number)}
                          aria-current={number === currentPage ? "page" : undefined}
                          className={`h-9 w-9 rounded border text-xs ${number === currentPage ? "border-[#d9904b] bg-[#d9904b] font-bold text-[#120b08]" : "border-[#493022] text-[#b99b79] hover:border-[#d9904b] hover:text-[#d9904b]"}`}
                        >{number}</button>
                      ))}
                      <button
                        type="button"
                        aria-label="Próxima página"
                        disabled={currentPage === totalPages}
                        onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}
                        className="flex h-9 w-9 items-center justify-center rounded border border-[#493022] text-[#d9904b] hover:border-[#d9904b] disabled:cursor-not-allowed disabled:opacity-30"
                      ><ChevronRight size={17} /></button>
                    </nav>
                  )}
                </>
              ) : (
                <div className="rounded-lg border border-[#493022] bg-[#21150f] p-10 text-center">
                  <h3 className="text-lg font-bold">Nenhum NFT encontrado</h3>
                  <p className="mt-3 text-sm text-[#b99b79]">Tente outra busca, coleção ou faixa de preço.</p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded bg-[#d9904b] px-5 py-3 text-sm font-bold text-[#120b08]"
                  >Limpar filtros</button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BANNERS PROMOCIONAIS */}
        <section className="mt-20 grid gap-5 md:grid-cols-2">
          <div className="grid overflow-hidden rounded-lg bg-[#261813] sm:grid-cols-2">
            <img
              src={featuredNFT.image}
              alt={featuredNFT.name}
              loading="lazy"
              className="aspect-square h-full w-full object-cover"
            />

            <div className="flex flex-col items-center justify-center p-6 text-center">
              <h2 className="text-base font-bold">
                Lançamentos incríveis
                de edição limitada
              </h2>

              <p className="mt-3 text-xs leading-6 text-[#b99b79]">
                Descubra coleções digitais e encontre
                sua próxima obra.
              </p>

              <a
                href="#marketplace"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#d9904b] px-4 py-2 text-xs font-bold text-[#120b08]"
              >
                Explorar
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <div className="grid overflow-hidden rounded-lg bg-[#261813] sm:grid-cols-2">
            <img
              src={secondaryNFT.image}
              alt={secondaryNFT.name}
              loading="lazy"
              className="aspect-square h-full w-full object-cover"
            />

            <div className="flex flex-col items-center justify-center p-6 text-center">
              <h2 className="text-base font-bold">
                Arte digital selecionada
                e muito mais
              </h2>

              <p className="mt-3 text-xs leading-6 text-[#b99b79]">
                Explore NFTs de diferentes artistas
                e coleções.
              </p>

              <a
                href="#marketplace"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-[#d9904b] px-7 py-3 font-mono text-sm font-extrabold uppercase tracking-wide text-[#120b08] transition-colors hover:bg-[#edaa67]"
              >
                EXPLORAR
              </a>
            </div>
          </div>
        </section>

        {/* DIÁRIO DA CUNHAGEM */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Diário da Cunhagem
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-[#b99b79]">
              Histórias, guias e insights para colecionadores
              sobre o universo da propriedade digital.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Como funciona a propriedade de NFTs",
                description:
                  "Aprenda a colecionar e verificar ativos digitais.",
                nft: nfts[2] ?? featuredNFT,
              },
              {
                title: "10 artistas digitais para acompanhar",
                description:
                  "Conheça criadores que moldam a cultura digital.",
                nft: featuredNFT,
              },
              {
                title: "Raridade, atributos e procedência",
                description:
                  "Entenda raridade, procedência e utilidade.",
                nft: secondaryNFT,
              },
              {
                title: "Como proteger sua carteira",
                description:
                  "Proteja seus ativos e sua identidade.",
                nft: nfts[3] ?? featuredNFT,
              },
            ].map((article) => (
              <article
                key={article.title}
                className="overflow-hidden rounded-lg bg-[#261813]"
              >
                {/* <img
                  src={article.nft.image}
                  alt={article.nft.name}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                /> */}

                <img
                  src={featuredNFT.image}
                  alt={featuredNFT.name}
                  className="h-[320px] w-full rounded-[24px] object-cover sm:h-[400px] lg:h-[470px] lg:rounded-[24px]"
                />

                <div className="p-4">
                  <h3 className="text-sm font-bold">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#b99b79]">
                    {article.description}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#d9904b]">
                    Em breve
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>


      </div>
      <Footer />
    </main>
  );
}

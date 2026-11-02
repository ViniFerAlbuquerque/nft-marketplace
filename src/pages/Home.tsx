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
    updateFilters(value, collection, sort);
  }

  function handleCollection(value: string) {
    setCollection(value);
    updateFilters(search, value, sort);
    setMobileFiltersOpen(false);
  }

  function handleSort(value: SortOption) {
    setSort(value);
    updateFilters(search, collection, value);
  }

  function clearFilters() {
    setSearch("");
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

      return matchesSearch && matchesCollection;
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
  }, [search, collection, sort, activeTab]);

  const hasActiveFilters =
    search.trim() !== "" ||
    collection !== "Todas" ||
    sort !== "default" ||
    activeTab !== "all";

  return (
    <main className="min-h-screen bg-[#120b08] font-mono text-[#f4e9d9]">
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

          <div className="relative grid items-center gap-6 md:grid-cols-2 lg:min-h-[350px]">
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
                Descubra NFTs selecionados de criadores
                do mundo todo. Colecione arte digital
                e faça parte dessa comunidade.
              </p>

              <a
                href="#marketplace"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#d9904b] px-5 py-3 text-sm font-bold uppercase text-[#120b08] transition hover:bg-[#e9a869]"
              >
                Explorar
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="relative mx-auto w-full max-w-[350px]">
              <img
                src={featuredNFT.image}
                alt={featuredNFT.name}
                className="aspect-square w-full rounded-2xl object-cover"
              />

              <img
                src={secondaryNFT.image}
                alt={secondaryNFT.name}
                className="absolute -bottom-3 -left-3 h-24 w-24 rounded-2xl border-4 border-[#3b261b] object-cover md:hidden"
              />
            </div>
          </div>

          <div className="relative mt-7 flex justify-center gap-2 lg:justify-end">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-2.5 w-2.5 rounded-full bg-[#d9904b]"
              />
            ))}
          </div>
        </section>

        {/* MARKETPLACE */}
        <section id="marketplace" className="scroll-mt-24">
          <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* ABAS */}
            <div
              role="group"
              aria-label="Categorias do marketplace"
              className="flex items-center gap-5 overflow-x-auto border-b border-[#38251a] pb-3"
            >
              {(
                [
                  ["all", "Todos os NFTs"],
                  ["new", "Novos lançamentos"],
                  ["trending", "Em alta"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveTab(value)}
                  aria-pressed={activeTab === value}
                  className={`shrink-0 border-b-2 pb-2 text-sm transition ${activeTab === value
                    ? "border-[#d9904b] font-bold text-[#d9904b]"
                    : "border-transparent text-[#f4e9d9] hover:text-[#d9904b]"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b99b79]"
                />

                <input
                  type="search"
                  aria-label="Buscar NFTs"
                  placeholder="Buscar NFTs..."
                  value={search}
                  onChange={(event) =>
                    handleSearch(event.target.value)
                  }
                  className="h-10 w-56 rounded-md border border-[#493022] bg-[#21150f] pl-10 pr-3 text-sm text-[#f4e9d9]"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-[#b99b79]">
                Ordenar por
                <select
                  aria-label="Ordenar NFTs"
                  value={sort}
                  onChange={(event) =>
                    handleSort(
                      event.target.value as SortOption,
                    )
                  }
                  className="rounded-md border border-[#493022] bg-[#21150f] px-2 py-2 text-xs text-[#f4e9d9]"
                >
                  <option value="default">Padrão</option>
                  <option value="price-asc">
                    Menor preço
                  </option>
                  <option value="price-desc">
                    Maior preço
                  </option>
                  <option value="name-asc">
                    Nome A-Z
                  </option>
                </select>
              </label>
            </div>
          </div>

          <div className="grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[245px_minmax(0,1fr)]">

            {/* SIDEBAR */}
            <aside
              className={`${mobileFiltersOpen ? "block" : "hidden"
                } self-start lg:block`}
            >
              <div className="rounded-lg bg-[#261813] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-sm font-bold">
                    Coleções
                  </h2>

                  {mobileFiltersOpen && (
                    <button
                      type="button"
                      aria-label="Fechar filtros"
                      onClick={() =>
                        setMobileFiltersOpen(false)
                      }
                      className="lg:hidden"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {collections.map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-2 text-xs text-[#c9ad90] hover:text-[#d9904b]"
                    >
                      <input
                        type="radio"
                        name="collection"
                        checked={collection === item}
                        onChange={() =>
                          handleCollection(item)
                        }
                        className="accent-[#d9904b]"
                      />
                      {item}
                    </label>
                  ))}
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 w-full rounded-md border border-[#d9904b] px-3 py-2 text-xs font-bold text-[#d9904b]"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>

              {/* NFT EM DESTAQUE */}
              <div
                id="featured"
                className="mt-5 hidden rounded-lg bg-[#261813] p-4 lg:block"
              >
                <h3 className="mb-2 text-center text-sm font-bold uppercase text-[#d9904b]">
                  NFT em destaque
                </h3>

                <p className="mb-3 text-center text-xs font-bold">
                  Oferta limitada
                </p>

                <Link
                  to="/nft/$nftId"
                  params={{ nftId: secondaryNFT.id }}
                >
                  <img
                    src={secondaryNFT.image}
                    alt={secondaryNFT.name}
                    className="aspect-square w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                </Link>

                <p className="mt-3 text-sm font-bold">
                  {secondaryNFT.name}
                </p>

                <p className="mt-1 text-sm font-bold text-[#d9904b]">
                  {secondaryNFT.price} ETH
                </p>
              </div>
            </aside>

            {/* GRID */}
            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p
                  aria-live="polite"
                  className="text-xs text-[#b99b79]"
                >
                  {filteredNFTs.length} NFTs encontrados
                </p>

                <label className="flex items-center gap-2 text-xs text-[#b99b79] lg:hidden">
                  Ordenar
                  <select
                    aria-label="Ordenar NFTs"
                    value={sort}
                    onChange={(event) =>
                      handleSort(
                        event.target.value as SortOption,
                      )
                    }
                    className="rounded-md border border-[#493022] bg-[#21150f] px-2 py-2 text-xs text-[#f4e9d9]"
                  >
                    <option value="default">Padrão</option>
                    <option value="price-asc">
                      Menor preço
                    </option>
                    <option value="price-desc">
                      Maior preço
                    </option>
                    <option value="name-asc">
                      Nome A-Z
                    </option>
                  </select>
                </label>
              </div>

              {filteredNFTs.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 xl:grid-cols-3">
                  {filteredNFTs.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-[#38251a] bg-[#21150f] p-10 text-center">
                  <h3 className="text-lg font-bold">
                    Nenhum NFT encontrado
                  </h3>

                  <p className="mt-3 text-sm text-[#b99b79]">
                    Tente outra busca ou coleção.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-md bg-[#d9904b] px-5 py-3 text-sm font-bold text-[#120b08]"
                  >
                    Limpar filtros e tentar novamente
                  </button>
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
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#d9904b] px-4 py-2 text-xs font-bold text-[#120b08]"
              >
                Explorar
                <ArrowRight size={15} />
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
                <img
                  src={article.nft.image}
                  alt={article.nft.name}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
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

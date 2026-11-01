
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
// import { useNavigate } from "@tanstack/react-router";
import Decimal from "decimal.js";

import NFTCard from "../components/nft/NFTCard";
import { nfts } from "../mocks/fixtures/nfts";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc";

function readFilters() {
  const params = new URLSearchParams(window.location.search);
  const sort = params.get("sort");

  const validSort: SortOption =
    sort === "price-asc" ||
    sort === "price-desc" ||
    sort === "name-asc"
      ? sort
      : "default";

  return {
    search: params.get("search") ?? "",
    collection: params.get("collection") ?? "Todas",
    sort: validSort,
  };
}

export default function Home() {
//   const navigate = useNavigate();

  const [initialFilters] = useState(readFilters);

  const [search, setSearch] = useState(initialFilters.search);
  const [collection, setCollection] = useState(
    initialFilters.collection
  );
  const [sort, setSort] = useState<SortOption>(
    initialFilters.sort
  );

  const collections = useMemo(
    () => ["Todas", ...new Set(nfts.map((nft) => nft.collection))],
    []
  );

  function updateFilters(
    nextSearch: string,
    nextCollection: string,
    nextSort: SortOption
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
      `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`
    );
  }

  function handleSearch(value: string) {
    setSearch(value);
    updateFilters(value, collection, sort);
  }

  function handleCollection(value: string) {
    setCollection(value);
    updateFilters(search, value, sort);
  }

  function handleSort(value: SortOption) {
    setSort(value);
    updateFilters(search, collection, value);
  }

  function clearFilters() {
    setSearch("");
    setCollection("Todas");
    setSort("default");
    updateFilters("", "Todas", "default");
  }

  const filteredNFTs = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");

    const result = nfts.filter((nft) => {
      const matchesSearch =
        nft.name.toLocaleLowerCase("pt-BR").includes(normalizedSearch) ||
        nft.collection
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch) ||
        nft.creator
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch);

      const matchesCollection =
        collection === "Todas" || nft.collection === collection;

      return matchesSearch && matchesCollection;
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return new Decimal(a.price).comparedTo(
            new Decimal(b.price)
          );

        case "price-desc":
          return new Decimal(b.price).comparedTo(
            new Decimal(a.price)
          );

        case "name-asc":
          return a.name.localeCompare(b.name, "pt-BR");

        default:
          return 0;
      }
    });
  }, [search, collection, sort]);

  const hasActiveFilters =
    search.trim() !== "" ||
    collection !== "Todas" ||
    sort !== "default";

  return (
    <main className="min-h-screen bg-[#120b08] text-[#f4e9d9]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
        <section className="mb-14 grid items-center gap-10 rounded-2xl border border-[#38251a] bg-[#21150f] p-8 md:grid-cols-2 lg:p-14">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d9904b]">
              Explore o universo digital
            </p>

            <h1 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
              Descubra NFTs
              <span className="block text-[#d9904b]">
                extraordinários
              </span>
            </h1>

            <p className="mb-8 max-w-lg text-[#b99b79]">
              Explore coleções exclusivas, descubra novos criadores
              e encontre sua próxima obra digital favorita.
            </p>

            <a
              href="#marketplace"
              className="inline-block rounded-md bg-[#d9904b] px-7 py-3 font-bold text-[#120b08] hover:bg-[#e9a869]"
            >
              Explorar NFTs
            </a>
          </div>

          <div className="flex aspect-square max-h-80 items-center justify-center rounded-xl bg-gradient-to-br from-[#51301d] via-[#302015] to-[#120b08]">
            <div className="text-center">
              <span className="text-7xl">✦</span>
              <p className="mt-4 text-lg font-bold tracking-widest text-[#d9904b]">
                KURIO COLLECTION
              </p>
            </div>
          </div>
        </section>

        <section id="marketplace">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm text-[#d9904b]">
                Marketplace
              </p>

              <h2 className="text-3xl font-bold">
                Explore nossos NFTs
              </h2>
            </div>

            <label className="flex items-center gap-3 rounded-lg border border-[#493022] bg-[#21150f] px-4 py-3">
              <Search size={19} className="shrink-0 text-[#b99b79]" />

              <input
                value={search}
                onChange={(event) =>
                  handleSearch(event.target.value)
                }
                placeholder="Buscar NFTs..."
                aria-label="Buscar NFTs"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#b99b79] md:w-56"
              />
            </label>
          </div>

          <div className="grid gap-8 lg:grid-cols-[230px_1fr]">
            <aside className="h-fit rounded-xl border border-[#38251a] bg-[#21150f] p-5">
              <h3 className="mb-5 flex items-center gap-2 font-semibold">
                <SlidersHorizontal size={18} />
                Filtros
              </h3>

              <p className="mb-3 text-sm text-[#b99b79]">
                Coleções
              </p>

              <div className="space-y-3">
                {collections.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-3 text-sm"
                  >
                    <input
                      type="radio"
                      name="collection"
                      checked={collection === item}
                      onChange={() => handleCollection(item)}
                      className="accent-[#d9904b]"
                    />

                    <span>{item}</span>
                  </label>
                ))}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 flex items-center gap-2 text-sm text-[#d9904b] hover:underline"
                >
                  <X size={16} />
                  Limpar filtros
                </button>
              )}
            </aside>

            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <p
                  aria-live="polite"
                  className="text-sm text-[#b99b79]"
                >
                  {filteredNFTs.length} NFTs encontrados
                </p>

                <label className="flex items-center gap-3 text-sm">
                  <span className="text-[#b99b79]">
                    Ordenar por
                  </span>

                  <select
                    value={sort}
                    onChange={(event) =>
                      handleSort(event.target.value as SortOption)
                    }
                    aria-label="Ordenar NFTs"
                    className="max-w-full rounded-lg border border-[#493022] bg-[#21150f] px-3 py-2 text-[#f4e9d9] outline-none focus:border-[#d9904b]"
                  >
                    <option value="default">Padrão</option>
                    <option value="price-asc">
                      Menor preço
                    </option>
                    <option value="price-desc">
                      Maior preço
                    </option>
                    <option value="name-asc">
                      Nome A–Z
                    </option>
                  </select>
                </label>
              </div>

              {filteredNFTs.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
                  {filteredNFTs.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-[#38251a] p-10 text-center text-[#b99b79]">
                  <p className="mb-4">
                    Nenhum NFT encontrado.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="font-semibold text-[#d9904b] hover:underline"
                  >
                    Limpar filtros e tentar novamente
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}






// import { useMemo, useState } from "react";
// import { Search, SlidersHorizontal } from "lucide-react";
// import NFTCard from "../components/nft/NFTCard";
// import { nfts } from "../mocks/fixtures/nfts";

// export default function Home() {
//   const [search, setSearch] = useState("");
//   const [collection, setCollection] = useState("Todas");

//   const collections = [
//     "Todas",
//     ...new Set(nfts.map((nft) => nft.collection)),
//   ];

//   const filteredNFTs = useMemo(() => {
//     return nfts.filter((nft) => {
//       const matchesSearch = nft.name
//         .toLowerCase()
//         .includes(search.toLowerCase());

//       const matchesCollection =
//         collection === "Todas" || nft.collection === collection;

//       return matchesSearch && matchesCollection;
//     });
//   }, [search, collection]);

//   return (
//     <main className="min-h-screen bg-[#120b08] text-[#f4e9d9]">
//       <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
//         <section className="mb-14 grid items-center gap-10 rounded-2xl border border-[#38251a] bg-[#21150f] p-8 md:grid-cols-2 lg:p-14">
//           <div>
//             <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d9904b]">
//               Explore o universo digital
//             </p>

//             <h1 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
//               Descubra NFTs
//               <span className="block text-[#d9904b]">
//                 extraordinários
//               </span>
//             </h1>

//             <p className="mb-8 max-w-lg text-[#b99b79]">
//               Explore coleções exclusivas, descubra novos criadores
//               e encontre sua próxima obra digital favorita.
//             </p>

//             <a
//               href="#marketplace"
//               className="inline-block rounded-md bg-[#d9904b] px-7 py-3 font-bold text-[#120b08] hover:bg-[#e9a869]"
//             >
//               Explorar NFTs
//             </a>
//           </div>

//           <div className="flex aspect-square max-h-80 items-center justify-center rounded-xl bg-gradient-to-br from-[#51301d] via-[#302015] to-[#120b08]">
//             <div className="text-center">
//               <span className="text-7xl">✦</span>
//               <p className="mt-4 text-lg font-bold tracking-widest text-[#d9904b]">
//                 KURIO COLLECTION
//               </p>
//             </div>
//           </div>
//         </section>

//         <section id="marketplace">
//           <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
//             <div>
//               <p className="mb-2 text-sm text-[#d9904b]">
//                 Marketplace
//               </p>
//               <h2 className="text-3xl font-bold">
//                 Explore nossos NFTs
//               </h2>
//             </div>

//             <label className="flex items-center gap-3 rounded-lg border border-[#493022] bg-[#21150f] px-4 py-3">
//               <Search size={19} className="text-[#b99b79]" />
//               <input
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 placeholder="Buscar NFTs..."
//                 aria-label="Buscar NFTs"
//                 className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#b99b79] md:w-56"
//               />
//             </label>
//           </div>

//           <div className="grid gap-8 lg:grid-cols-[230px_1fr]">
//             <aside className="h-fit rounded-xl border border-[#38251a] bg-[#21150f] p-5">
//               <h3 className="mb-5 flex items-center gap-2 font-semibold">
//                 <SlidersHorizontal size={18} />
//                 Filtros
//               </h3>

//               <p className="mb-3 text-sm text-[#b99b79]">
//                 Coleções
//               </p>

//               <div className="space-y-3">
//                 {collections.map((item) => (
//                   <label
//                     key={item}
//                     className="flex cursor-pointer items-center gap-3 text-sm"
//                   >
//                     <input
//                       type="radio"
//                       name="collection"
//                       checked={collection === item}
//                       onChange={() => setCollection(item)}
//                       className="accent-[#d9904b]"
//                     />
//                     <span>{item}</span>
//                   </label>
//                 ))}
//               </div>
//             </aside>

//             <div>
//               <p className="mb-5 text-sm text-[#b99b79]">
//                 {filteredNFTs.length} NFTs encontrados
//               </p>

//               {filteredNFTs.length > 0 ? (
//                 <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
//                   {filteredNFTs.map((nft) => (
//                     <NFTCard key={nft.id} nft={nft} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="rounded-xl border border-[#38251a] p-10 text-center text-[#b99b79]">
//                   Nenhum NFT encontrado.
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

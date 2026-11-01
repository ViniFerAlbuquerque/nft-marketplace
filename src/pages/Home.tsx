import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import NFTCard from "../components/nft/NFTCard";
import { nfts } from "../mocks/fixtures/nfts";

export default function Home() {
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState("Todas");

  const collections = [
    "Todas",
    ...new Set(nfts.map((nft) => nft.collection)),
  ];

  const filteredNFTs = useMemo(() => {
    return nfts.filter((nft) => {
      const matchesSearch = nft.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCollection =
        collection === "Todas" || nft.collection === collection;

      return matchesSearch && matchesCollection;
    });
  }, [search, collection]);

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
              <Search size={19} className="text-[#b99b79]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
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
                      onChange={() => setCollection(item)}
                      className="accent-[#d9904b]"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </aside>

            <div>
              <p className="mb-5 text-sm text-[#b99b79]">
                {filteredNFTs.length} NFTs encontrados
              </p>

              {filteredNFTs.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
                  {filteredNFTs.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-[#38251a] p-10 text-center text-[#b99b79]">
                  Nenhum NFT encontrado.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

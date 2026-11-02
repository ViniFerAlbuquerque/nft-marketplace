
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { NFT } from "../../mocks/fixtures/nfts";

type NFTCardProps = {
  nft: NFT;
};

export default function NFTCard({ nft }: NFTCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-[#38251a] bg-[#21150f] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9904b] hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]">
      <Link
        to="/nft/$nftId"
        params={{ nftId: nft.id }}
        className="relative block overflow-hidden bg-[#2b1b14]"
      >
        <img
          src={nft.image}
          alt={nft.name}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-[#120b08]/85 px-3 py-1.5 text-xs font-medium text-[#f4e9d9] backdrop-blur-sm">
          {nft.collection}
        </span>
      </Link>

      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <Link
            to="/nft/$nftId"
            params={{ nftId: nft.id }}
            className="line-clamp-1 text-base font-bold text-[#f4e9d9] transition-colors hover:text-[#d9904b] sm:text-lg"
          >
            {nft.name}
          </Link>

          <p className="mt-1 text-xs text-[#b99b79]">
            Criado por {nft.creator}
          </p>
        </div>

        <div className="flex items-end justify-between gap-2 border-t border-[#38251a] pt-4">
          <div>
            <p className="mb-1 text-xs text-[#b99b79]">
              Preço atual
            </p>

            <p className="text-base font-bold text-[#d9904b] sm:text-lg">
              {nft.price} ETH
            </p>
          </div>

          <Link
            to="/nft/$nftId"
            params={{ nftId: nft.id }}
            aria-label={`Ver detalhes de ${nft.name}`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d9904b] text-[#120b08] transition-colors hover:bg-[#e9a869]"
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </article>
  );
}

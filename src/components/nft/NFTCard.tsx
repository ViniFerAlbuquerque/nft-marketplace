
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { NFT } from "../../mocks/fixtures/nfts";

type NFTCardProps = {
  nft: NFT;
};

export default function NFTCard({ nft }: NFTCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#38251a] bg-[#21150f] transition hover:border-[#d9904b]">
      <div className="relative">
        <Link
          to="/nft/$nftId"
          params={{ nftId: nft.id }}
        >
          <img
            src={nft.image}
            alt={nft.name}
            className="aspect-square w-full object-cover"
            loading="lazy"
          />
        </Link>

        <button
          type="button"
          aria-label={`Favoritar ${nft.name}`}
          className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white"
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="space-y-3 p-4">
        <p className="text-xs text-[#b99b79]">{nft.collection}</p>

        <Link
          to="/nft/$nftId"
          params={{ nftId: nft.id }}
          className="block text-lg font-semibold text-[#f4e9d9] hover:text-[#d9904b]"
        >
          {nft.name}
        </Link>

        <div className="flex items-center justify-between border-t border-[#38251a] pt-3">
          <div>
            <p className="text-xs text-[#b99b79]">Preço atual</p>
            <p className="font-bold text-[#d9904b]">
              {nft.price} ETH
            </p>
          </div>

          <Link
            to="/nft/$nftId"
            params={{ nftId: nft.id }}
            className="rounded-md bg-[#d9904b] px-4 py-2 text-sm font-semibold text-[#120b08] hover:bg-[#e9a869]"
          >
            Ver NFT
          </Link>
        </div>
      </div>
    </article>
  );
}

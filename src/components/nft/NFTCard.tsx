
import { Link } from "@tanstack/react-router";
import type { NFT } from "../../mocks/fixtures/nfts";

type NFTCardProps = {
  nft: NFT;
};

export default function NFTCard({ nft }: NFTCardProps) {
  return (
    <article className="group min-w-0">
      <Link
        to="/nft/$nftId"
        params={{ nftId: nft.id }}
        aria-label={`Ver detalhes de ${nft.name}`}
        className="block"
      >
        <div className="overflow-hidden rounded-[10px] bg-[#2b1b14]">
          <img
            src={nft.image}
            alt={nft.name}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]"
          />
        </div>

        <div className="pt-3">
          <h3 className="truncate text-[13px] font-medium text-[#f4e9d9] transition-colors group-hover:text-[#d9904b] sm:text-sm">
            {nft.name}
          </h3>

          <p className="mt-1 text-[12px] font-bold tracking-wide text-[#d9904b] sm:text-[13px]">
            {nft.price} ETH
          </p>
        </div>
      </Link>
    </article>
  );
}

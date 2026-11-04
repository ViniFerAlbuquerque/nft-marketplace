export type NFTCategory =
  | "Arte digital"
  | "Fotografia"
  | "Música"
  | "Arte 3D"
  | "Colecionáveis"
  | "Generativa"
  | "Jogos"
  | "Assinaturas"
  | "Utilidade";

export type NFTNetwork =
  | "Ethereum"
  | "Polygon"
  | "Solana";

export type NFT = {
  id: string;
  name: string;
  collection: string;
  price: string;
  image: string;
  creator: string;
  category?: NFTCategory;
  network?: NFTNetwork;
};


export const nfts: NFT[] = [
  {
    id: "1",
    name: "Emerald Ape #042",
    collection: "Bored Ape Collection",
    price: "1.19",
    image: "/images/nfts/emerald-ape.png",
    creator: "Kurio Studio",
  },
  {
    id: "2",
    name: "Sage Nomad #009",
    collection: "Bored Ape Collection",
    price: "1.69",
    image: "/images/nfts/sage-nomad.png",
    creator: "Kurio Studio",
  },
  {
    id: "3",
    name: "Neon Vessel #552",
    collection: "Cyber Collection",
    price: "1.99",
    image: "/images/nfts/neon-vessel.png",
    creator: "Digital Arts",
  },
  {
    id: "4",
    name: "Cosmic Bloom #118",
    collection: "Digital Dreams",
    price: "1.29",
    image: "/images/nfts/cosmic-bloom.png",
    creator: "Neo Creator",
  },
  {
    id: "5",
    name: "Violet Nomad #314",
    collection: "Abstract Collection",
    price: "1.39",
    image: "/images/nfts/violet-nomad.png",
    creator: "Art Studio",
  },
  {
    id: "6",
    name: "Ivory Baron #088",
    collection: "Future Collection",
    price: "1.79",
    image: "/images/nfts/ivory-baron.png",
    creator: "Future Labs",
  },
  {
    id: "7",
    name: "Golden Beat #207",
    collection: "Bored Ape Collection",
    price: "0.99",
    image: "/images/nfts/golden-beat.png",
    creator: "Kurio Studio",
  },
  {
    id: "8",
    name: "Golden Signal #166",
    collection: "Bored Ape Collection",
    price: "0.39",
    image: "/images/nfts/golden-signal.png",
    creator: "Kurio Studio",
  },
  {
    id: "9",
    name: "Golden Echo #215",
    collection: "Bored Ape Collection",
    price: "0.79",
    image: "/images/nfts/golden-echo.png",
    creator: "Kurio Studio",
  },
];

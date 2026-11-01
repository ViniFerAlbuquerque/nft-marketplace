
export type NFT = {
  id: string;
  name: string;
  collection: string;
  price: string;
  image: string;
  creator: string;
};

export const nfts: NFT[] = [
  {
    id: "1",
    name: "Emerald Ape #042",
    collection: "Bored Ape Collection",
    price: "1.19",
    image: "https://picsum.photos/seed/kurio-ape-1/600/600",
    creator: "Kurio Studio",
  },
  {
    id: "2",
    name: "Golden Ape #018",
    collection: "Bored Ape Collection",
    price: "2.45",
    image: "https://picsum.photos/seed/kurio-ape-2/600/600",
    creator: "Kurio Studio",
  },
  {
    id: "3",
    name: "Cyber Punk #207",
    collection: "Cyber Collection",
    price: "0.89",
    image: "https://picsum.photos/seed/kurio-cyber-3/600/600",
    creator: "Digital Arts",
  },
  {
    id: "4",
    name: "Neon Dreams #101",
    collection: "Digital Dreams",
    price: "1.75",
    image: "https://picsum.photos/seed/kurio-neon-4/600/600",
    creator: "Neo Creator",
  },
  {
    id: "5",
    name: "Abstract World #056",
    collection: "Abstract Collection",
    price: "0.65",
    image: "https://picsum.photos/seed/kurio-abstract-5/600/600",
    creator: "Art Studio",
  },
  {
    id: "6",
    name: "Future Vision #089",
    collection: "Future Collection",
    price: "3.20",
    image: "https://picsum.photos/seed/kurio-future-6/600/600",
    creator: "Future Labs",
  },
];

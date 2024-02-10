import { client, delay } from "@/lib/api/client";
import { type TAuctionInput } from "@/lib/schemas";

export type TAuctionsListItem = Omit<
  TAuctionInput,
  "price" | "endsAt" | "stepPrice"
> & {
  id: number;
};

export const possibleCategories = ["price", "popularity", "name"] as const;

export type TCategory = (typeof possibleCategories)[number];

const listItems: TAuctionsListItem[] = [
  {
    id: 31,
    title: "Auction 1",
    description: "Description 1",
    photos: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: 2,
    title: "Auction 2",
    description: "Description 1",
    photos: ["https://via.placeholder.com/150"],
  },
  {
    id: 2,
    title: "Auction 3",
    description: "Description 1",
    photos: ["https://via.placeholder.com/150"],
  },

  {
    id: 3,
    title: "Auction 1",
    description: "Description 1",
    photos: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: 4,
    title: "Auction 2",
    description: "Description 1",
    photos: ["https://via.placeholder.com/150"],
  },
  {
    id: 5,
    title: "Auction 3",
    description: "Description 1",
    photos: ["https://via.placeholder.com/150"],
  },
];
class AuctionApi {
  async getListOfAuctions(search = "", categories: TCategory[]) {
    console.log("from getListOfAuctions", search, categories);

    return delay(listItems);
    // return await client.get<TAuctionsListItem[]>("auction");
  }
}

export default new AuctionApi();

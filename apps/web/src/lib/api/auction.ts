import { client, delay } from "@/lib/api/client";
import { type TAuctionInput } from "@/lib/schemas";

export type TAuctionsListItem = Omit<
  TAuctionInput,
  "price" | "endsAt" | "stepPrice"
>;

export const possibleCategories = ["price", "popularity", "name"] as const;

export type TCategory = (typeof possibleCategories)[number];

const listItems: TAuctionsListItem[] = [
  {
    title: "Auction 1",
    description: "Description 1",
    photos: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    title: "Auction 2",
    description: "Description 1",
    photos: ["https://via.placeholder.com/150"],
  },
  {
    title: "Auction 3",
    description: "Description 1",
    photos: ["https://via.placeholder.com/150"],
  },

  {
    title: "Auction 1",
    description: "Description 1",
    photos: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    title: "Auction 2",
    description: "Description 1",
    photos: ["https://via.placeholder.com/150"],
  },
  {
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

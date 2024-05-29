import { client } from "@/lib/api/client";
import { type TAuctionInput } from "@/lib/schemas";

import { type TAuctionEndpoints } from "../../../../../libs/types";

export type TAuctionsListItem = TAuctionEndpoints["getAllAuctions"]['auctions'][0];
export const possibleCategories = ["bids", "currentPrice", "name"] as const;

export type TCategory = (typeof possibleCategories)[number];

class AuctionApi {
  async getAllAuctions(search = "", category?: TCategory) {
    return await client.get<TAuctionEndpoints["getAllAuctions"]>("/auctions", {
      params: {
        name: search,
        sortBy: category,
      },
    });
  }

  async getAuctionMessages(auctionId: string) {
    const { data } = await client.get<TAuctionEndpoints["getMessages"]>(
      `actions/${auctionId}/messages`,
    );
    return data;
  }

  async getBids(auctionId: string) {
    return await client.get<TAuctionEndpoints["getBids"]>(
      `auctions/${auctionId}/bids`,
    );
  }

  async getAuctionById(id: string) {
    return await client.get<TAuctionEndpoints["get"]>(
      `auctions/${id}`
      );
  }

  async create(body: TAuctionInput) {
    return await client.post<TAuctionEndpoints["createAuction"]>(
      "auctions",
      body,
    );
  }

  async edit(body: TAuctionInput, id: string) {
    console.log("edited an auction", body);
  }
}

export default new AuctionApi();

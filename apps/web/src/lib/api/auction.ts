import { client, delay } from "@/lib/api/client";
import { type TAuctionInput } from "@/lib/schemas";

import { type TAuctionEndpoints } from "../../../../../libs/types";
import { type Prettify } from "../../../../../libs/util-types";

export type TAuctionsListItem = TAuctionEndpoints["getAllAuctions"][0];

export const possibleCategories = ["price", "popularity", "name"] as const;

export type TCategory = (typeof possibleCategories)[number];

class AuctionApi {
  async getAllAuctions(search = "", categories: TCategory[]) {
    return await client.get<TAuctionEndpoints["getAllAuctions"]>("/auctions");
  }

  async getAuctionMessages(auctionId: string) {
    return await client.get<TAuctionEndpoints["getMessages"]>(
      `actions/${auctionId}/messages`,
    );
  }

  async getBids(auctionId: string) {
    return await client.get<TAuctionEndpoints["getBids"]>(
      `actions/${auctionId}/bids`,
    );
  }

  async getAuctionById(id: string) {
    return await client.get<TAuctionEndpoints["get"]>(id);
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

import { client } from "@/lib/api/client";
import { type TPhotoEndpoints } from "../../../../../libs/types";

class PhotoApi {
  async createPhoto(body: FormData, index: number) {
    console.log("created a photo", body);
    return await client.post<TPhotoEndpoints["createPhoto"]>(
      `/photos/${index}`,
      body,
      {
        headers: { "Content-Type": "image/jpeg" },
      },
    );
  }
}

export default new PhotoApi();

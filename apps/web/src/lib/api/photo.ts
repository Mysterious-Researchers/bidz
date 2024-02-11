import { client } from "@/lib/api/client";
import {} from "../../../../../libs/types";

class PhotoApi {
  async createPhoto(body: { photo: Blob }, index: number) {
    return await client.post(`/photos/${index}`, body);
  }
}

export default new PhotoApi();

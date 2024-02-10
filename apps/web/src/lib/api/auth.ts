import { client } from "@/lib/api/client";
import { type TLoginInput, type TSignupInput } from "@/lib/schemas";
class AuthApi {
  async login(body: TLoginInput) {
    return await client.post("/auth/login", body);
  }

  async register(body: TSignupInput) {
    return await client.post("/auth/register", body);
  }
}

export default new AuthApi();

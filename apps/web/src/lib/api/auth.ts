import { client } from "@/lib/api/client";
import { type TLoginInput, type TSignupInput } from "@/lib/schemas";
class AuthApi {
  async login(body: TLoginInput) {
    return await client.post("/auth/login", body);
  }

  // TODO: add logic of putting stuff into local storage
  async register(body: TSignupInput) {
    return await client.post("/auth/register", body);
  }

  async verifyEmail(token: string) {
    return await client.post(`/auth/verify/${token}`);
  }
}

export default new AuthApi();

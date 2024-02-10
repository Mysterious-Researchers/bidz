import { client } from "@/lib/api/client";
import { type TLoginInput } from "@/lib/schemas";
class AuthApi {
  async login(body: TLoginInput) {
    return await client.post("/auth/login", body);
  }
}

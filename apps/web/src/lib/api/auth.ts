import { client } from "@/lib/api/client";
import { type TLoginInput, type TSignupInput } from "@/lib/schemas";
import { type TAuthEndpoints } from "../../../../../libs/types";
import * as TelegramService from "@/lib/services/telegram";
class AuthApi {
  async login(body: TLoginInput) {
    return await client.post<TAuthEndpoints["login"]>("/auth/login", body);
  }

  async register(body: TSignupInput) {
    return await client.post<TAuthEndpoints["register"]>(
      "/auth/register",
      body,
    );
  }

  async verifyEmailAndSaveAuthTokens(token: string) {
    try {
      const response = await client.post<TAuthEndpoints["verify"]>(
        `/auth/verify/${token}`,
      );
      TelegramService.saveAuthTokens(response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthApi();

import { client } from "@/lib/api/client";
import { type TLoginInput, type TSignupInput } from "@/lib/schemas";
import { type TAuthEndpoints } from "../../../../../libs/types";
import * as TelegramService from "@/lib/services/telegram";
import {getAuthorizationHeader} from "@/lib/api/utils/utils";
import StorageUtil from '@/lib/api/utils/storage'

class AuthApi {
  async login(body: TLoginInput) {
    const { data } = await client.post<TAuthEndpoints["login"]>("/auth/login", body);
    StorageUtil.setTokens(data.accessToken, data.refreshToken);
  }

  async register(body: TSignupInput) {
    return await client.post<TAuthEndpoints["register"]>(
      "/auth/register",
      body,
    );
  }

  async getMe() {
    return await client.get<TAuthEndpoints["getUser"]>("/auth/me", getAuthorizationHeader())
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

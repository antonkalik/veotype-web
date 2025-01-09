import { BaseApi } from "./BaseApi";

export class AuthApi extends BaseApi {
  public static async login(email: string, password: string) {
    return await this.post<
      {
        token: string;
      },
      {
        email: string;
        password: string;
      }
    >("/auth/login", { email, password });
  }
}

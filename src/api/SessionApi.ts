import { BaseApi } from "./BaseApi";
import { Session } from "../types";

export class SessionApi extends BaseApi {
  public static async getSession() {
    return await this.get<Session | null>("/session");
  }

  public static async login(email: string, password: string) {
    return await this.post("/session/login", { email, password });
  }

  public static async logout() {
    return await this.post("/session/logout");
  }
}

import { BaseApi } from "./BaseApi";
import { Session } from "../types";

export class SessionApi extends BaseApi {
  public static async getSession() {
    return await this.get<Session | null>("/session");
  }
}

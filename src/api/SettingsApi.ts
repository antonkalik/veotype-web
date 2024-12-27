import { BaseApi } from "./BaseApi";

export class SettingsApi extends BaseApi {
  public static async getSettings() {
    return await this.get("/settings");
  }
}

import { BaseApi } from "./BaseApi";

export type ConstrainsResponse = {
  countries: string[];
  locales: string[];
  keyboard_types: string[];
};

export class ConstrainsApi extends BaseApi {
  public static async getConstrains() {
    return this.get<ConstrainsResponse>("/constrains");
  }
}

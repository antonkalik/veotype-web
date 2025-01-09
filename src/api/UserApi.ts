import { BaseApi } from "./BaseApi";

export class UserApi extends BaseApi {
    public static async logout() {
        return await this.post("/user/logout");
    }
}

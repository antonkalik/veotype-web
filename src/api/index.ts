import { SessionApi } from "src/api/SessionApi";
import { SettingsApi } from "src/api/SettingsApi";
import { AuthApi } from "src/api/AuthApi";
import { UserApi } from "src/api/UserApi";
import { ConstrainsApi } from "src/api/ConstrainsApi";

export const Api = {
  Session: SessionApi,
  Auth: AuthApi,
  User: UserApi,
  Settings: SettingsApi,
  Constrains: ConstrainsApi,
};

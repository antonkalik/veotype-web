import { SessionApi } from "src/api/SessionApi";
import { SettingsApi } from "src/api/SettingsApi";
import { AuthApi } from "src/api/AuthApi";

export const Api = {
  Session: SessionApi,
  Auth: AuthApi,
  Settings: SettingsApi,
};

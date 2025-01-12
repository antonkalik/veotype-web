import { KeyboardType, Locale } from "../types";

export const BASE_API_URL = "https://veotype.com/api/v1";
export const BASE_API_URL_DEV = "http://localhost:9999/api/v1";
export const CSRF_TOKEN_KEY = "csrf_token";
export const SESSION_DATA = "session_data";

export const SHIFT_CHARS = {
  [Locale.en]: {
    [KeyboardType.US]: {
      left: 'QWERASDFGZXCVB!@%^&*()_+{}:"<>?¿¡',
      right: "YTUIOPHJKLNMÁÉÍÓÚÑ$%#@!±",
    },
    [KeyboardType.UK]: {
      left: 'QWERASDFGZXCVB!@%^&*()_+{}:"<>?¿¡',
      right: "YTUIOPHJKLNMÁÉÍÓÚÑ$%#@!±",
    },
  },
  [Locale.es]: {
    [KeyboardType.ES]: {
      left: 'QWERASDFGZXCVB!@%^&*()_+{}:"<>?¿¡ç',
      right: "YTUIOPHJKLNMÁÉÍÓÚÑ$%#@!±€",
    },
    [KeyboardType.LATAM]: {
      left: 'QWERASDFGZXCVB!@%^&*()_+{}:"<>?¿¡ç¨´',
      right: "YTUIOPHJKLNMÁÉÍÓÚÑ$%#@!±€°",
    },
  },
};

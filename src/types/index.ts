export type Session = {
  id: number;
  name: string;
  email: string;
  token: string;
};

export type SessionData = {
  data: Session | null;
  logout: () => Promise<void>;
  setToken: (token: string) => void;
};

export enum Locale {
  en = "en",
  es = "es",
}

export enum KeyboardType {
  US = "US",
  UK = "UK",
  ES = "ES",
  LATAM = "LATAM",
}

export enum Theme {
  light = "light",
  dark = "dark",
}

export type Settings = {
  theme: Theme;
  locale: Locale;
  keyboardType: KeyboardType;
  difficulty: number;
  showTips: boolean;
};

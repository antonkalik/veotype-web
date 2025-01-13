import { atom } from "jotai";
import { KeyboardType, Locale } from "src/types";

export const constrainsAtom = atom({
  keyboardTypes: Object.values(KeyboardType),
  locales: Object.values(Locale),
  countries: [],
});

// export const setConstrainsAtom = atom()

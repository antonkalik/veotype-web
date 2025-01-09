import { atom } from "jotai";
import { KeyboardType, Locale, Settings, Theme } from "src/types";

const initialState = {
  theme: Theme.light,
  locale: Locale.en,
  keyboardType: KeyboardType.US,
  difficulty: 0,
  showTips: false,
};

export const settingsAtom = atom(initialState);

export const getSettingsAtom = atom((get) => get(settingsAtom));

export const setSettingsAtom = atom(
  null,
  (_get, set, settings: Partial<Settings>) => {
    set(settingsAtom, (prev) => {
      return { ...prev, ...settings };
    });
  },
);

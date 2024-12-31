import React from "react";
import { Locale, KeyboardType } from "src/types";
import { SHIFT_CHARS } from "src/constants";

interface TipsProps {
  char: string;
  locale: Locale;
  keyboardType: KeyboardType;
}

export const Tips: React.FC<TipsProps> = ({
  char,
  locale = Locale.en,
  keyboardType = KeyboardType.US,
}) => {
  if (!char) {
    return null;
  }

  const chars = SHIFT_CHARS[locale];

  if (!chars) {
    return;
  }

  const shifts = chars[keyboardType];

  if (!shifts) {
    return;
  }

  const { left, right } = shifts;

  let shiftTip = "";

  if (left.includes(char)) {
    shiftTip = "Left Shift";
  } else if (right.includes(char)) {
    shiftTip = "Right Shift";
  }

  return (
    <div className="relative w-full border-2 border-black">
      {shiftTip && <div>{shiftTip}</div>}
    </div>
  );
};

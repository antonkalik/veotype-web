import React from "react";
import classNames from "classnames";

type RenderTextProps = {
  text: string;
  typedText: string;
  errorIndex: number | null;
  isActiveRow: boolean;
  isFinishedRow: boolean;
  isLastRow: boolean;
};

export const RenderText: React.FC<RenderTextProps> = ({
  text,
  typedText,
  errorIndex,
  isActiveRow,
  isFinishedRow,
  isLastRow,
}) => {
  const currentIndex = typedText.length;
  const errorStyles = "border-b-2 border-red-700 bg-yellow-300 text-red-500";
  const rowStateStyle = isFinishedRow ? "text-black" : "text-gray-300";
  const rowActivityStyle = isActiveRow ? "text-gray-400" : rowStateStyle;

  return (
    <p className={isActiveRow || isFinishedRow ? "font-bold" : ""}>
      {text.split("").map((char: string, index: number) => {
        const isTyped = index < typedText.length;
        const isCurrent = index === typedText.length;
        const isCorrect = typedText[index] === char;
        const isError = index === errorIndex;

        const isSpaceError =
          (char === " " && typedText[index] && typedText[index] !== " ") ||
          (char === " " &&
            index === text.length - 1 &&
            isError &&
            typedText[index] === " ");
        const textColor = isCorrect ? "text-black" : errorStyles;
        const isEndRowError =
          index === text.length - 1 &&
          currentIndex === text.length &&
          char !== "\n" &&
          !isLastRow;

        const hasError = isError || isSpaceError || isEndRowError;

        return (
          <span
            key={index}
            className={classNames([
              isTyped ? textColor : rowActivityStyle,
              hasError && errorStyles,
            ])}
          >
            {isCurrent && isActiveRow && !isError && (
              <span className="inline-block w-px animate-blink bg-black">
                &nbsp;
              </span>
            )}
            {char}
          </span>
        );
      })}
    </p>
  );
};

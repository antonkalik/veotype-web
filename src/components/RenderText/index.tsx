import React from "react";
import classNames from "classnames";

type RenderTextProps = {
  text: string;
  typedText: string;
  errorIndex: number | null;
  isActiveRow: boolean;
  isFinishedRow: boolean;
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

  return text.split("").map((char: string, index: number) => {
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
    const textColor = isCorrect ? "text-black" : "text-red-500";
    const isEndRowError =
      index === text.length - 1 &&
      currentIndex === text.length &&
      char !== "\n" &&
      !isLastRow;

    const hasError = isError || isSpaceError || isEndRowError;

    console.log("isLastRow", {
      isLastRow,
      isSpaceError,
      isError,
      isEndRowError,
    });

    return (
      <span
        key={index}
        className={classNames([
          isTyped
            ? textColor
            : isActiveRow
              ? "text-gray-400"
              : isFinishedRow
                ? "text-black"
                : "text-gray-300",
          hasError && "border-b-2 border-red-700 bg-yellow-300 text-red-500",
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
  });
};

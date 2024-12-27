import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import texts from "./texts.json";

type RenderTextProps = {
  text: string;
  typedText: string;
  errorIndex: number | null;
  isActiveRow: boolean;
  isFinishedRow: boolean;
};

const RenderText: React.FC<RenderTextProps> = ({
  text,
  typedText,
  errorIndex,
  isActiveRow,
  isFinishedRow,
}) => {
  return text.split("").map((char: string, index: number) => {
    const isTyped = index < typedText.length;
    const isCurrent = index === typedText.length;
    const isCorrect = typedText[index] === char;
    const isError = index === errorIndex;
    const textColor = isCorrect ? "text-black" : "text-red-500";

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
          isError && "border-b-2 border-red-700 bg-yellow-300 text-red-500",
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

export const TrainPage = () => {
  const [typedText, setTypedText] = useState("");
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const [rowIndex, setRowIndex] = useState(0);
  const level = 0;
  const textRows = texts[level];
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const currentRow = textRows[rowIndex];

    if (input.length <= currentRow.length) {
      setTypedText(input);
      setErrorIndex(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentRow = textRows[rowIndex];
    const currentIndex = typedText.length;

    if (e.key === "Enter") {
      if (typedText === currentRow) {
        setTypedText("");
        setErrorIndex(null);
        setRowIndex((prev) => prev + 1);
      } else if (currentIndex === currentRow.length) {
        setErrorIndex(currentIndex);
      }
      e.preventDefault();
    } else if (e.key === "Backspace") {
      if (typedText.length === 0 && rowIndex > 0) {
        const prevRow = textRows[rowIndex - 1];
        setRowIndex((prev) => prev - 1);
        setTypedText(prevRow);
        setErrorIndex(null);
      }
    } else if (currentIndex === currentRow.length) {
      setErrorIndex(currentIndex);
    }
  };

  const handleDivClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Train</h1>
      <div
        className="f2qont-mono mt-4 w-full max-w-2xl cursor-text whitespace-pre-wrap text-lg"
        onClick={handleDivClick}
      >
        {textRows.map((row, index) => {
          const isActiveRow = index === rowIndex;
          const isFinishedRow = index < rowIndex;

          return (
            <p
              key={index}
              className={isActiveRow || isFinishedRow ? "font-bold" : ""}
            >
              <RenderText
                text={row}
                typedText={index === rowIndex ? typedText : ""}
                errorIndex={index === rowIndex ? errorIndex : null}
                isActiveRow={isActiveRow}
                isFinishedRow={isFinishedRow}
              />
            </p>
          );
        })}
        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="absolute left-[-9999px]"
        />
      </div>
      {rowIndex >= textRows.length && (
        <p className="mt-4 text-xl text-green-600">Training complete!</p>
      )}
    </div>
  );
};

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
      char !== "\n";

    console.log("isEndRowError", { isEndRowError, char });

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
          (isError || isSpaceError || isEndRowError) &&
            "border-b-2 border-red-700 bg-yellow-300 text-red-500",
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
  const [errorCounts, setErrorCounts] = useState({
    punctuation_marks: 0,
    letters: 0,
    enters: 0,
    spaces: 0,
  });
  const [startTime, setStartTime] = useState<number | null>(null);
  const [rowTimes, setRowTimes] = useState<number[]>([]);
  const level = 0;
  const [textRows, setTextRows] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    setStartTime(Date.now());

    const updatedTextRows = texts[level].map((row, index) => {
      if (index < texts[level].length - 1) {
        return row + " ";
      }
      return row;
    });
    setTextRows(updatedTextRows);
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
    const ignoredKeys = ["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab"];

    if (ignoredKeys.includes(e.key)) {
      return;
    }

    if (e.key === "Enter") {
      if (currentIndex < currentRow.length - 1) {
        setErrorIndex(currentIndex);
        setErrorCounts((prevCounts) => ({
          ...prevCounts,
          enters: prevCounts.enters + 1,
        }));
      } else if (typedText.trim() === currentRow.trim()) {
        const endTime = Date.now();
        const duration = (endTime - (startTime || endTime)) / 1000;
        setRowTimes((prevTimes) => [...prevTimes, duration]);
        setTypedText("");
        setErrorIndex(null);
        setRowIndex((prev) => prev + 1);
        setStartTime(Date.now());
      } else {
        setErrorIndex(currentIndex);
        setErrorCounts((prevCounts) => ({
          ...prevCounts,
          enters: prevCounts.enters + 1,
        }));
      }
      e.preventDefault();
    } else if (e.key === "Backspace") {
      if (typedText.length === 0 && rowIndex > 0) {
        const prevRow = textRows[rowIndex - 1];
        setRowIndex((prev) => prev - 1);
        setTypedText(prevRow);
        setErrorIndex(null);
      }
    } else if (e.key === " ") {
      if (currentIndex === currentRow.length - 1) {
        setErrorIndex(currentIndex);
        setErrorCounts((prevCounts) => ({
          ...prevCounts,
          spaces: prevCounts.spaces + 1,
        }));
      } else {
        const expectedChar = currentRow[currentIndex];
        if (expectedChar !== " ") {
          setErrorIndex(currentIndex);
          setErrorCounts((prevCounts) => ({
            ...prevCounts,
            spaces: prevCounts.spaces + 1,
          }));
        }
      }
    } else if (currentIndex < currentRow.length - 1) {
      const expectedChar = currentRow[currentIndex];
      const typedChar = e.key;

      if (typedChar !== expectedChar) {
        setErrorIndex(currentIndex);
        if (/[a-zA-Z]/.test(typedChar)) {
          if (
            typedChar.toLowerCase() !== expectedChar.toLowerCase() ||
            (typedChar !== expectedChar && !e.shiftKey)
          ) {
            setErrorCounts((prevCounts) => ({
              ...prevCounts,
              letters: prevCounts.letters + 1,
            }));
          }
        } else if (/[.,!?]/.test(typedChar)) {
          setErrorCounts((prevCounts) => ({
            ...prevCounts,
            punctuation_marks: prevCounts.punctuation_marks + 1,
          }));
        }
      }
    } else if (currentIndex === currentRow.length - 1) {
      setErrorIndex(currentIndex);
      setErrorCounts((prevCounts) => ({
        ...prevCounts,
        letters: prevCounts.letters + 1,
      }));
    }
  };

  const handleDivClick = () => {
    inputRef.current?.focus();
  };

  const getTotalTime = () => {
    return rowTimes.reduce((total, time) => total + time, 0).toFixed(2);
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
      <div className="mt-4 text-red-600">
        <h2 className="text-xl font-bold">Error Counts:</h2>
        <ul>
          <li>Punctuation Marks: {errorCounts.punctuation_marks}</li>
          <li>Letters: {errorCounts.letters}</li>
          <li>Enters: {errorCounts.enters}</li>
          <li>Spaces: {errorCounts.spaces}</li>
        </ul>
      </div>
      <div className="mt-4 text-blue-600">
        <h2 className="text-xl font-bold">Row Times:</h2>
        <ul>
          {rowTimes.map((time, index) => (
            <li key={index}>
              Row {index + 1}: {time.toFixed(2)} seconds
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold">Total Time: {getTotalTime()} seconds</p>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";
import texts from "./texts.json";
import { RenderText } from "src/components/RenderText";
import { Stats } from "src/components/Stats";
import { StepControl } from "src/components/StepControl";
import { Tips } from "src/components/Tips";

const [text] = texts;

const ignoredKeys = ["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab"];

enum ErrorType {
  PunctuationMarks = "punctuation_marks",
  Letters = "letters",
  Enters = "enters",
  Spaces = "spaces",
}

export const TrainPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [typedText, setTypedText] = useState("");
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [errorCounts, setErrorCounts] = useState({
    [ErrorType.PunctuationMarks]: 0,
    [ErrorType.Letters]: 0,
    [ErrorType.Enters]: 0,
    [ErrorType.Spaces]: 0,
  });
  const [startTime, setStartTime] = useState<number | null>(null);
  const [rowTimes, setRowTimes] = useState<Map<number, number>>(new Map());
  const [textRows, setTextRows] = useState<string[]>([]);

  const currentIndex = typedText.length;
  const isLastRow = rowIndex === textRows.length - 1;
  const isCompleted = typedText === text[text.length - 1];

  const nextCharToType = text[rowIndex][currentIndex];

  useEffect(() => {
    inputRef.current?.focus();
    setStartTime(Date.now());

    const updatedTextRows = text.map((row, index) => {
      if (index < text.length - 1) {
        return row + " ";
      }
      return row;
    });
    setTextRows(updatedTextRows);
  }, []);

  useEffect(() => {
    if (isCompleted) {
      inputRef.current?.blur();
      inputRef.current?.setAttribute("disabled", "true");
    }
  }, [isCompleted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const currentRow = textRows[rowIndex];

    if (input.length <= currentRow.length) {
      setTypedText(input);
      setErrorIndex(null);
    }
  };

  const setError = (type: ErrorType) => {
    setErrorIndex(currentIndex);
    setErrorCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentRow = textRows[rowIndex];

    if (ignoredKeys.includes(e.key)) {
      return;
    }

    const setTime = () => {
      const endTime = Date.now();
      const duration = (endTime - (startTime || endTime)) / 1000;
      setRowTimes((prevTimes) => new Map(prevTimes).set(rowIndex, duration));
    };

    if (e.key === "Enter") {
      if (currentIndex < currentRow.length - 1) {
        setError(ErrorType.Enters);
      } else if (typedText.trim() === currentRow.trim()) {
        setTime();
        setTypedText("");
        setErrorIndex(null);
        setRowIndex((prev) => prev + 1);
        setStartTime(Date.now());
      } else {
        setError(ErrorType.Enters);
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
      if (
        currentIndex === currentRow.length - 1 ||
        currentRow[currentIndex] !== " "
      ) {
        setError(ErrorType.Spaces);
      }
    } else if (currentIndex < currentRow.length - 1) {
      const expectedChar = currentRow[currentIndex];
      const typedChar = e.key;

      if (typedChar !== expectedChar) {
        if (/[a-zA-Z]/.test(typedChar)) {
          const isWrongType =
            typedChar.toLowerCase() !== expectedChar.toLowerCase();
          if (
            typedChar.toLowerCase() !== expectedChar.toLowerCase() ||
            (typedChar !== expectedChar && !e.shiftKey)
          ) {
            setError(ErrorType.Letters);
          }
        } else if (/[.,!?]/.test(typedChar)) {
          setError(ErrorType.PunctuationMarks);
        }
      }
    } else if (currentIndex === currentRow.length - 1 && !isLastRow) {
      setError(ErrorType.Letters);
    }
  };

  const handleDivClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center border-2 border-red-700">
      <Tips char={nextCharToType} />
      <div
        className="mt-4 w-full max-w-2xl cursor-text whitespace-pre-wrap font-mono text-lg"
        onClick={handleDivClick}
      >
        {textRows.map((row, index) => {
          const isActiveRow = index === rowIndex;
          const isFinishedRow = index < rowIndex;

          return (
            <RenderText
              key={index}
              text={row}
              typedText={index === rowIndex ? typedText : ""}
              errorIndex={index === rowIndex ? errorIndex : null}
              isActiveRow={isActiveRow}
              isFinishedRow={isFinishedRow}
              isLastRow={isLastRow}
            />
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
      {isCompleted ? <StepControl /> : null}
      <Stats errorCounts={errorCounts} rowTimes={rowTimes} />
    </div>
  );
};

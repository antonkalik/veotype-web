import { useState } from "react";

export const MenuButton = ({ onClick }: { onClick: () => void }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      onClick={onClick}
      className="flex h-full cursor-pointer flex-col items-center md:hidden"
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <div
        className="h-[3px] w-6 rounded bg-black"
        style={{ marginBottom: isPressed ? "5px" : "8px" }}
      />
      <div className="h-[3px] w-6 rounded bg-black" />
    </div>
  );
};

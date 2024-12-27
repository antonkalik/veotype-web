import React from "react";

export const LogoIcon: React.FC<{
  className?: string;
}> = ({ className }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 189H109L125.721 121H66.7207L50 189Z"
      fill="#4E019C"
    />
    <path
      d="M8 63.9998L21.099 11L191 11.0004L177.901 64L8 63.9998Z"
      fill="#7B01F5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M64.0176 64L50 121H109L123.018 64H64.0176Z"
      fill="#6301C6"
    />
  </svg>
);

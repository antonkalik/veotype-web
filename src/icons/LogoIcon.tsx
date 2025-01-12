import React from "react";

export const LogoIcon: React.FC<{
  className?: string;
}> = ({ className }) => (
  <svg
    className={className}
    width="50"
    height="26"
    viewBox="0 0 50 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.9961 8.74146H2.28432L0 0.381836H9.81068L11.9961 8.74146Z"
      fill="#7B01F5"
    />
    <path
      d="M15.4574 8.74146L19.3218 0.381836L50 0.381896L47.9339 8.74146H15.4574Z"
      fill="#7B01F5"
    />
    <path
      d="M6.80176 16.9436H22.3131L26.3425 8.7417H16.799L14.6697 13.3158L13.4867 8.7417H4.56055L6.80176 16.9436Z"
      fill="#6301C6"
    />
    <path
      d="M28.2343 16.9436L30.2512 8.7417H39.5572L37.5403 16.9436H28.2343Z"
      fill="#6301C6"
    />
    <path
      d="M11.3412 25.6184L8.9707 16.9434H23.8699L19.608 25.6184H11.3412Z"
      fill="#4E019C"
    />
    <path
      d="M28.5488 25.6184L30.7039 16.9434H39.5526L37.3975 25.6184H28.5488Z"
      fill="#4E019C"
    />
  </svg>
);

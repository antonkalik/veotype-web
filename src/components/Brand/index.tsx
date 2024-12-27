import { LogoIcon } from "src/icons/LogoIcon.tsx";

export const Brand = () => {
  return (
    <div className="flex items-center">
      <LogoIcon />
      <span className="ml-1 font-bold">Veotype</span>
    </div>
  );
};
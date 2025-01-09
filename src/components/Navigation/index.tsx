import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Drawer } from "flowbite-react";
import { IoCloseOutline } from "react-icons/io5";
import { Links } from "src/components/Links";
import { MenuButton } from "./components/MenuButton";
import { Brand } from "src/components/Brand";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex min-h-12 w-full items-center justify-between px-4 py-2">
      <NavLink to="/">
        <Brand />
      </NavLink>
      <div className="hidden flex-1 items-center justify-end md:flex">
        <Links />
      </div>
      <MenuButton onClick={() => setIsOpen(true)} />
      <Drawer position="right" open={isOpen} onClose={handleClose}>
        <div className="flex justify-end">
          <IoCloseOutline
            size={24}
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <Drawer.Items>
          <Links />
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

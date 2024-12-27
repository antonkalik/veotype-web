import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";

export const PrivateLinks = ({
  onLogout,
  isLoading,
}: {
  onLogout: () => void;
  isLoading: boolean;
}) => (
  <>
    <NavLink
      className="block w-full md:w-auto py-2 text-center hover:text-blue-500 md:mr-4 md:inline"
      to="/posts"
    >
      Posts
    </NavLink>
    <NavLink
      className="block w-full md:w-auto py-2 text-center hover:text-blue-500 md:mr-4 md:inline"
      to="/settings"
    >
      Settings
    </NavLink>
    <NavLink
      className="block w-full md:w-auto py-2 text-center hover:text-blue-500 md:mr-4 md:inline"
      to="/account"
    >
      My Profile
    </NavLink>
    <Button
      onClick={onLogout}
      disabled={isLoading}
      color="gray"
      className="w-full"
    >
      {isLoading ? "Loading..." : "Logout"}
    </Button>
  </>
);

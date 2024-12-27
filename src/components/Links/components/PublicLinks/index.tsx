import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

export const PublicLinks = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavLink
        className="block w-full py-2 text-center hover:text-blue-500 md:mr-6 md:inline md:w-auto"
        to="/about"
      >
        About
      </NavLink>
      <NavLink
        className="block w-full py-2 text-center hover:text-blue-500 md:mr-6 md:inline md:w-auto"
        to="/login"
      >
        Login
      </NavLink>
      <Button fullSized className="md:w-auto" onClick={() => navigate("/sign-up")} type="submit" color="blue">
        Sign Up
      </Button>
    </>
  );
};

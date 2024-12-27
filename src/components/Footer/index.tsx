import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center px-4 py-6 md:flex-row">
      <div className="w-full flex-1 text-center text-sm text-gray-500 md:text-left">
        <span>© {new Date().getFullYear()} Veotype™</span>
      </div>

      <div className="flex w-full flex-1 flex-col text-center text-sm text-gray-500 md:flex-row md:justify-end">
        <Link
          className="mt-4 md:mr-4 md:mt-0 md:hover:text-blue-500"
          to="/about"
        >
          About
        </Link>
        <Link
          className="mt-4 md:mr-4 md:mt-0 md:hover:text-blue-500"
          to="/privacy"
        >
          Privacy Policy
        </Link>
        <Link
          className="mt-4 md:mr-4 md:mt-0 md:hover:text-blue-500"
          to="/licensing"
        >
          Licensing
        </Link>
        <Link className="md:hove r:text-blue-500 mt-4 md:mt-0" to="/contact">
          Contact
        </Link>
      </div>
    </footer>
  );
};

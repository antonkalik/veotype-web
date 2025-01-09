import { Outlet, useOutletContext } from "react-router";
import { Navigation } from "src/components/Navigation";
import { Footer } from "src/components/Footer";
import { SessionData } from "src/types";

export const Layout = () => {
  const session = useOutletContext<SessionData>();
  
  return (
    <div className="m-auto flex min-h-screen max-w-5xl flex-col">
      <Navigation />
      <div className="flex flex-1 flex-col">
        <Outlet context={session} />
      </div>
      <Footer />
    </div>
  );
};

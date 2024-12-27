import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionData } from "src/types";
import { PrivateLinks } from "./components/PrivateLinks";
import { PublicLinks } from "./components/PublicLinks";

type LinksProps = {
  session: SessionData;
};

export const Links = ({ session }: LinksProps) => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    await session.logout();
    setLoading(false);
    navigate("/login");
  };

  return session.data ? (
    <PrivateLinks onLogout={handleLogout} isLoading={isLoading} />
  ) : (
    <PublicLinks />
  );
};

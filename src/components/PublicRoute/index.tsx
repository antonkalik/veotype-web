import { Outlet, useOutletContext } from "react-router";
import { Navigate } from "react-router-dom";
import React from "react";
import { SessionData } from "../../types";

export const PublicRoute: React.FC<{
  element?: React.ReactNode;
}> = ({ element }) => {
  const session = useOutletContext<SessionData>();

  return session.data ? <Navigate to="/" replace /> : element || <Outlet />;
};

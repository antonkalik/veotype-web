import React from "react";
import { Outlet, useOutletContext } from "react-router";
import { Navigate } from "react-router-dom";
import { SessionData } from "src/types";

export const ProtectedRoute: React.FC<{
  element?: React.ReactNode;
}> = ({ element }) => {
  const session = useOutletContext<SessionData>();

  return session.data ? (
    element || <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

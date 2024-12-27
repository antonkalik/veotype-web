import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Cookies from "js-cookie";
import { Api } from "src/api";
import { Session, SessionData } from "src/types";

export const SessionProvider = () => {
  const [data, login] = useState<Session | null>(null);

  useEffect(() => {
    Api.Session.getSession().then(login);
  }, []);

  useEffect(() => {
    const cachedSession = Cookies.get("session") || null;

    if (cachedSession) {
      login(JSON.parse(cachedSession));
    } else {
      Api.Session.getSession().then((session) => {
        if (session) {
          login(session);
          Cookies.set("session", JSON.stringify(session));
        }
      });
    }
  }, []);

  const logout = async () => {
    login(null);
    await Api.Session.logout();
  };

  return <Outlet context={{ data, login, logout } as SessionData} />;
};

import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Cookies from "js-cookie";
import { Api } from "src/api";
import { Session, SessionData } from "src/types";
import { CSRF_TOKEN_KEY, SESSION_DATA } from "../../constants";

export const SessionProvider = () => {
  const [loginData, setLoginData] = useState<Session | null>(null);
  const cachedSession = Cookies.get(SESSION_DATA) || null;

  useEffect(() => {
    Api.Session.getSession()
      .then((response) => {
        if (response) {
          setLoginData(response.data);
        }
      })
      .catch(() => {
        Cookies.remove(SESSION_DATA);
        setLoginData(null);
      });
  }, []);

  useEffect(() => {
    if (cachedSession) {
      setLoginData(JSON.parse(cachedSession));
    } else {
      Api.Session.getSession().then((response) => {
        setLoginData(response.data);
        Cookies.set(SESSION_DATA, JSON.stringify(response.data));
      });
    }
  }, [cachedSession]);

  console.log("cachedSession", cachedSession);
  console.log("loginData", loginData);

  const logout = async () => {
    setLoginData(null);
    Cookies.remove(SESSION_DATA);
    Cookies.remove(CSRF_TOKEN_KEY);
    await Api.User.logout();
  };

  return (
    <Outlet
      context={{ data: loginData, login: setLoginData, logout } as SessionData}
    />
  );
};

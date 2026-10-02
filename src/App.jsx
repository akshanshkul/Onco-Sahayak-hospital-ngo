import React, { useEffect, useState } from "react";
import { api, authHeaders, token } from "./services/api";
import Login from "./pages/auth/Login";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!token()) return;
    api("/organizations/profile", { headers: authHeaders() })
      .then((data) => {
        setSession({ organization: data.organization });
        if (!window.location.pathname.startsWith("/dashboard")) window.history.replaceState({}, "", "/dashboard");
      })
      .catch(() => localStorage.removeItem("organization_token"));
  }, []);

  const login = (data) => {
    setSession(data);
    window.history.pushState({}, "", "/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("organization_token");
    setSession(null);
    window.history.pushState({}, "", "/");
  };

  return session ? <AppRoutes session={session} onLogout={logout} /> : <Login onLogin={login} />;
}

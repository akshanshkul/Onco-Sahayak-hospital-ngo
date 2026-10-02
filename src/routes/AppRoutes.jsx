import React from "react";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes({ session, onLogout }) {
  return <Dashboard session={session} onLogout={onLogout} />;
}

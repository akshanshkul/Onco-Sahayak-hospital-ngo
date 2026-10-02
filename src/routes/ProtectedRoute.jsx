import React from "react";

export default function ProtectedRoute({ session, children }) {
  return session ? children : null;
}

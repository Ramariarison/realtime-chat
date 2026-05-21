import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function GuestRoute() {

  const { user } = useAuth();

  // Utilisateur déjà connecté
  if (user) {

    if (user.role === "admin") {
      return <Navigate to="/admin/users" replace />;
    }

    return <Navigate to="/user/chat" replace />;
  }

  // Utilisateur non connecté
  return <Outlet />;
}
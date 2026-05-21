import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  allowedRoles: string[];
};

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {

  const { user } = useAuth();

  // Pas connecté
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Vérification du rôle
  if (!allowedRoles.includes(user.role)) {

    if (user.role === "admin") {
      return <Navigate to="/admin/users" replace />;
    }

    return <Navigate to="/user/chat" replace />;
  }

  return <Outlet />;
}
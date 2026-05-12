import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("user_role");

  // utilisateur déjà connecté
  if (token) {

    if (role === "admin") {
      return <Navigate to="/admin/users" replace />;
    }

    return <Navigate to="/user/chat" replace />;
  }

  // utilisateur non connecté
  return <Outlet />;
}
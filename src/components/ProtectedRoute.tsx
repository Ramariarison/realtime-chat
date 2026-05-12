import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  allowedRoles: string[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("user_role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role || "")) {

    if (role === 'admin') return <Navigate to="/admin/users" replace />;

    return <Navigate to="/user/chat" replace />;
  }

  return <Outlet />;
}
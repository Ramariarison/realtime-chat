import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import MainLayout from "../layout/MainLayout"
import AdminLayout from "../layout/AdminLayout"

// Pages
import AuthPage from "../pages/AuthPage"
import ChatPage from "../pages/ChatPage"
import ProfileUserpage from "../pages/ProfileUserPage"
import UserList from "../components/admin/UserList"
import ProtectedRoute from "../components/ProtectedRoute"
import GuestRoute from "../components/GuestRoute"
import ProfileAdminPage from "../pages/ProfileAdminPage"
import Dashboard from "../pages/Dashboard"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Zone Publique */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<AuthPage />} />
        </Route>

        {/* Utilisateur Normal */}
        <Route element={<ProtectedRoute allowedRoles={['normal']} />}>
          <Route element={<MainLayout />}>
            <Route path="/user/chat" element={<ChatPage />} />
            <Route path="/user/profile" element={<ProfileUserpage />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/profile" element={<ProfileAdminPage />} />
          </Route>
        </Route>

        {/* Si la route n'existe pas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
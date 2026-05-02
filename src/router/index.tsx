import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "../layout/MainLayout"
import AdminLayout from "../layout/AdminLayout"

// Pages
import AuthPage from "../pages/AuthPage"
import ChatPage from "../pages/ChatPage"
import Profilepage from "../pages/ProfilePage"
import UserList from "../components/admin/UserList"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<AuthPage />} />


        <Route element={<MainLayout />}>
        
          <Route path="/user/chat" element={<ChatPage />} />

          <Route path="/user/profile" element={<Profilepage />} />

        </Route>

        <Route element={<AdminLayout />}>
        
          <Route path="/admin/users" element={<UserList />}/>

          <Route path="/admin/dashboard" element/>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}
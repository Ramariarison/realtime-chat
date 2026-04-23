import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layout/MainLayout"

// Pages
import AuthPage from "../pages/AuthPage"
import ChatPage from "../pages/ChatPage"
import Profilepage from "../pages/ProfilePage"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<AuthPage />} />


        <Route element={<MainLayout />}>
        
          <Route path="/chat" element={<ChatPage />} />

          <Route path="/profile" element={<Profilepage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}
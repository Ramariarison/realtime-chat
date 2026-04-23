import Sidebar from "../components/sidebar/SideBar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      
      <Sidebar />

      <div className="flex-1 bg-gray-100">
        <Outlet />
      </div>

    </div>
  )
}
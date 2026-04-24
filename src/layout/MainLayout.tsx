import Sidebar from "../components/sidebar/SideBar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      
      <Sidebar />

      <div className="flex-1">
        <Outlet />
      </div>

    </div>
  )
}
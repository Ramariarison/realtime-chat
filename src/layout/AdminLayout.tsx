import { Outlet } from "react-router-dom"
import Sidebar from "../components/admin/SideBar"

export default function AdminLayout() {
    return (
        <div className="flex h-screen overflow-hidden">
        
        <Sidebar />

        <div className="flex-1 min-h-screen">
            <Outlet />
        </div>

        </div>
    )
}
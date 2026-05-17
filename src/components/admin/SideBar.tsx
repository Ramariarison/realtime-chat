import { Users, LayoutDashboard, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import { logoutUser } from "../../services/authService";
import { me } from "../../services/userService";
import { useEffect, useState } from "react";

export default function Sidebar() {

  const navigate = useNavigate();

  type Me = {
    avatar: string;
    name: string;
    email: string;
  };

  const [mee, setMee] = useState<Me | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function meme(){
        try {
            const response = await me(token);
            setMee(response.user_info);
        } catch (error) {
            console.error(error);
        };
    }

    meme();
  }, []);

  const handleLogout = async () => {
    try {

      // récupérer le token
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      // appel API logout
      await logoutUser(token);

      // supprimer token local
      localStorage.removeItem("token");
      localStorage.removeItem("user_role");

      // redirection
      navigate("/");

    } catch (error) {
      console.error(error);
    }
  };

  const menu = [
    { name: "Users List", icon: Users, path: "/admin/users" },
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  ];

  return (
    <div className="w-20 md:w-72 h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 text-white flex flex-col border-r border-white/10 shadow-2xl transition-all duration-300 overflow-hidden">

      {/* Header */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
          <Logo />
        </div>

        <div className="hidden md:block">
          <div className="font-semibold text-xl tracking-tight">
            Pochita
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-8 flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 hover:bg-white/10 active:scale-[0.97] ${
                  isActive
                    ? "bg-white/15 shadow-inner shadow-white/10 text-white font-medium"
                    : "hover:shadow-sm text-white/90"
                }`
              }
            >
              <div className="flex items-center justify-center w-6">
                <Icon
                  size={22}
                  className="transition-transform group-hover:scale-110"
                />
              </div>

              <span className="hidden md:block text-sm tracking-wide">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-white/10 transition-colors">
          <img 
              className="w-12 h-12 rounded-full ring-2 ring-blue-300 object-cover"
              src={`http://127.0.0.1:8000/storage/${mee?.avatar}`}
              alt={mee?.name}
          />

          <div className="hidden md:block flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{mee?.name}</div>
            <div className="text-xs text-white/60">{mee?.email}</div>
          </div>

          <button
            onClick={handleLogout}
            className="hidden md:block p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            title="Déconnexion"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  BarChart3,
  LogOut,
  Menu,
} from "lucide-react";
import { logout } from "../../api/auth";
import { clearAccessToken } from "../../auth/TokenStorage";
import { clearUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";

const SidebarLink = ({ to, icon: Icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
      ${
        isActive
          ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
      }`
    }
  >
    <Icon size={20} />
    <span className="font-medium tracking-wide">{label}</span>
  </NavLink>
);

const OwnerLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout failed", e);
    }
    clearAccessToken();
    localStorage.setItem("loggedOut", "true");
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/60 bg-slate-900/40 backdrop-blur-xl p-6 relative z-20">
        <div className="mb-10 flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20" />
          <h1 className="text-xl font-bold text-white tracking-tight">
            Host<span className="text-indigo-400">Console</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarLink
            to="/owner/dashboard"
            icon={LayoutDashboard}
            label="Overview"
            end
          />
          <SidebarLink
            to="/owner/hotels"
            icon={Building2}
            label="My Hotels"
            end
          />
          <SidebarLink
            to="/owner/hotels/new"
            icon={PlusCircle}
            label="Add Hotel"
            end
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800/60">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
          <span className="font-bold text-lg">Host Console</span>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
            <Menu />
          </button>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="max-w-7xl mx-auto">
            {/* Page Transition Wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>

      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

export default OwnerLayout;

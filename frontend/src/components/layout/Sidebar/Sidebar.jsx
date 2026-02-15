import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCheckSquare,
  FiBarChart2,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";
import { hasPermission, PERMISSIONS } from "../../../utils/rbac";

const Sidebar = () => {
  const { user } = useAuth();
  const userRole = user?.role;

  const allMenuItems = [
    {
      path: "/dashboard",
      icon: <FiHome />,
      label: userRole === "worker" ? "My Dashboard" : "Dashboard",
      permission: PERMISSIONS.VIEW_DASHBOARD,
    },
    {
      path: "/workers",
      icon: <FiUsers />,
      label: "Workers",
      permission: PERMISSIONS.VIEW_WORKERS,
    },
    {
      path: "/tasks",
      icon: <FiCheckSquare />,
      label: userRole === "worker" ? "My Tasks" : "Tasks",
      permission: PERMISSIONS.VIEW_TASKS,
    },
    {
      path: "/analytics",
      icon: <FiBarChart2 />,
      label: userRole === "worker" ? "My Performance" : "Analytics",
      permission: PERMISSIONS.VIEW_ANALYTICS,
    },
    {
      path: "/reports",
      icon: <FiFileText />,
      label: "Reports",
      permission: PERMISSIONS.VIEW_REPORTS,
    },
    {
      path: "/settings",
      icon: <FiSettings />,
      label: "Settings",
      permission: PERMISSIONS.VIEW_SETTINGS,
    },
  ];

  // Filter menu items based on user permissions
  const menuItems = allMenuItems.filter((item) =>
    hasPermission(userRole, item.permission),
  );

  return (
    <aside className="w-[250px] md:w-[250px] max-md:w-[70px] bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <nav className="py-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 no-underline transition-all border-l-[3px] max-md:justify-center ${
                isActive
                  ? "bg-indigo-600/10 text-indigo-600 border-l-indigo-600 font-medium"
                  : "text-gray-500 border-l-transparent hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <span className="text-xl flex items-center">{item.icon}</span>
            <span className="text-base max-md:hidden">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

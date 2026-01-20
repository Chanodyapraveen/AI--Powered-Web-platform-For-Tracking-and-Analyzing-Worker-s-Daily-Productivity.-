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
import styles from "./Sidebar.module.css";

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
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

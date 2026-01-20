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
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const menuItems = [
    { path: "/dashboard", icon: <FiHome />, label: "Dashboard" },
    { path: "/workers", icon: <FiUsers />, label: "Workers" },
    { path: "/tasks", icon: <FiCheckSquare />, label: "Tasks" },
    { path: "/analytics", icon: <FiBarChart2 />, label: "Analytics" },
    { path: "/reports", icon: <FiFileText />, label: "Reports" },
    { path: "/settings", icon: <FiSettings />, label: "Settings" },
  ];

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

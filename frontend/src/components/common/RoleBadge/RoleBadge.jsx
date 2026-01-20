import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./RoleBadge.module.css";

const RoleBadge = () => {
  const { user } = useAuth();

  if (!user) return null;

  const roleColors = {
    admin: { bg: "#dc26264d", text: "#dc2626" },
    manager: { bg: "#f59e0b4d", text: "#f59e0b" },
    worker: { bg: "#10b9814d", text: "#10b981" },
  };

  const roleLabels = {
    admin: "Admin",
    manager: "Manager",
    worker: "Worker",
  };

  const color = roleColors[user.role] || roleColors.worker;

  return (
    <span
      className={styles.badge}
      style={{
        backgroundColor: color.bg,
        color: color.text,
      }}
    >
      {roleLabels[user.role] || user.role}
    </span>
  );
};

export default RoleBadge;

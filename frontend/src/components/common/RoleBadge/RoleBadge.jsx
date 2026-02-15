import React from "react";
import { useAuth } from "../../../hooks/useAuth";

const roleClasses = {
  admin: "bg-red-500/30 text-red-600",
  manager: "bg-amber-500/30 text-amber-500",
  worker: "bg-emerald-500/30 text-emerald-500",
};

const roleLabels = {
  admin: "Admin",
  manager: "Manager",
  worker: "Worker",
};

const RoleBadge = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        roleClasses[user.role] || roleClasses.worker
      }`}
    >
      {roleLabels[user.role] || user.role}
    </span>
  );
};

export default RoleBadge;

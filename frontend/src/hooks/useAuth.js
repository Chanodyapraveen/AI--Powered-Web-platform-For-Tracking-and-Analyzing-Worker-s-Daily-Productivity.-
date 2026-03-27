import { useMemo } from "react";

export function useAuth() {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  const user = useMemo(() => {
    if (!userRaw) return null;
    try {
      return JSON.parse(userRaw);
    } catch {
      return null;
    }
  }, [userRaw]);

  const isAuthenticated = Boolean(token && user);

  return {
    token,
    user,
    isAuthenticated,
  };
}

import React, { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback(
    (message, type = "info", duration = 3000) => {
      const id = Date.now() + Math.random();
      const notification = { id, message, type, duration };

      setNotifications((prev) => [...prev, notification]);

      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    [],
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message, duration) => {
      return showNotification(message, "success", duration);
    },
    [showNotification],
  );

  const showError = useCallback(
    (message, duration) => {
      return showNotification(message, "error", duration);
    },
    [showNotification],
  );

  const showWarning = useCallback(
    (message, duration) => {
      return showNotification(message, "warning", duration);
    },
    [showNotification],
  );

  const showInfo = useCallback(
    (message, duration) => {
      return showNotification(message, "info", duration);
    },
    [showNotification],
  );

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    showNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

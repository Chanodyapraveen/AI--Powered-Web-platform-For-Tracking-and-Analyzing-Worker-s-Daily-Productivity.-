import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/layout/Navbar/Navbar";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import Dashboard from "../pages/Dashboard/Dashboard";
import Workers from "../pages/Workers/Workers";
import Tasks from "../pages/Tasks/Tasks";
import Analytics from "../pages/Analytics/Analytics";
import Login from "../pages/Login/Login";
import Loader from "../components/common/Loader/Loader";
import { canAccessRoute } from "../utils/rbac";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen text="Loading..." />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Role-Based Route Component
const RoleRoute = ({ children, path }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen text="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!canAccessRoute(user?.role, path)) {
    return (
      <AppLayout>
        <div
          style={{
            padding: "3rem",
            textAlign: "center",
            color: "var(--text-secondary)",
          }}
        >
          <h2 style={{ color: "var(--danger-color)", marginBottom: "1rem" }}>
            Access Denied
          </h2>
          <p>You don't have permission to access this page.</p>
          <Navigate to="/dashboard" replace />
        </div>
      </AppLayout>
    );
  }

  return children;
};

// Layout Component
const AppLayout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <div className="app-container">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Navigate to="/dashboard" replace />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/workers"
        element={
          <RoleRoute path="/workers">
            <AppLayout>
              <Workers />
            </AppLayout>
          </RoleRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <RoleRoute path="/tasks">
            <AppLayout>
              <Tasks />
            </AppLayout>
          </RoleRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <RoleRoute path="/analytics">
            <AppLayout>
              <Analytics />
            </AppLayout>
          </RoleRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <RoleRoute path="/reports">
            <AppLayout>
              <div>Reports Page (Coming Soon)</div>
            </AppLayout>
          </RoleRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <RoleRoute path="/settings">
            <AppLayout>
              <div>Settings Page (Coming Soon)</div>
            </AppLayout>
          </RoleRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;

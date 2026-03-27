// FRONTEND/src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RootLayout from "../layouts/RootLayout.jsx";
import SupervisorLayout from "../layouts/SupervisorLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import InventoryLayout from "../layouts/InventoryLayout.jsx";

import RequireAuth from "./components/RequireAuth.jsx";

// Public
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/Register.jsx";

// Notes (practice)
import CreatePage from "./pages/CreatePage.jsx";

// Admin
import AdminDashboard from "./pages/admin/adminDashboard.jsx";
import AdminUsers from "./pages/admin/Users.Pages.jsx";
import FieldsPage from "./pages/admin/FieldPage.jsx";
import AdminNotifications from "./pages/admin/AdminNotifiaction.jsx";

// Supervisor
import SupervisorDashboard from "./pages/supervisor/attendance/SupervisorDashboard.jsx";
import TaskAssign from "./pages/supervisor/attendance/TaskAssign.jsx";

// Incidents
import IncidencePage from "./pages/IncidencePage.jsx";
import AddIncidencePage from "./pages/AddincidencePage.jsx";
import IncidenceDetailPage from "./pages/IncidenceDetailsPage.jsx";
import UpdateIncidencePage from "./pages/UpdateIncidentPage.jsx";

// Plucking Record
import PluckingRecordPage from "./pages/PluckingRecordPage.jsx";
import AddPluckingRecordPage from "./pages/AddPluckingRecordPage.jsx";
import ViewPluckingRecordPage from "./pages/ViewPluckingRecordPage.jsx";
import EditPluckingRecordPage from "./pages/EditPluckingRecord.jsx";

// Other roles / features
import WorkerDashboard from "./pages/Workers/WorkersDashboard.jsx";
import ProductionDashboard from "./pages/ProductionDashboard.jsx";
import ProductionBatchPage from "./pages/ProductionBatchPage.jsx";
import CreateProductionBatch from "./pages/CreaterProductinBatch.jsx";
import EditProductionBatch from "./pages/EditProductionBatch.jsx";
import ReportsPage from "./pages/ReportPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import InventoryManagerDashboard from "./pages/Inventory/InventoryManagerDashboard.jsx";
import InventoryReports from "./pages/Inventory/InventoryReport.jsx";
import InventoryStock from "./pages/Inventory/InventoryStock.jsx";
import InventorySupplies from "./pages/Inventory/InventorySupplies.jsx";
import ToolsPage from "./pages/ToolsPage.jsx";
import CreateToolPage from "./pages/CreateToolpage.jsx";
import ToolDetailPage from "./pages/ToolDetailsPage.jsx";
import SuppliersPage from "./pages/supplier/SupplierPage.jsx";
import SupplierEditPage from "./pages/supplier/SupplierEditPage.jsx";
import SupplierCreate from "./pages/supplier/SupplierCreate.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* No-navbar route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Routes with global Navbar via RootLayout */}
      <Route element={<RootLayout />}>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* ADMIN AREA with sub-navbar & breadcrumbs */}
        <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="fields" element={<FieldsPage />} />
          <Route path="notifications" element={<AdminNotifications />} />

          {/* Incidences (admin access) */}
          <Route path="incidences" element={<IncidencePage />} />
          <Route path="incidences/add" element={<AddIncidencePage />} />
          <Route path="incidences/:id" element={<IncidenceDetailPage />} />
          <Route path="incidences/:id/edit" element={<UpdateIncidencePage />} />
        </Route>

        {/* SUPERVISOR AREA with sub-navbar & breadcrumbs */}
        <Route
          path="/supervisor"
          element={
            <RequireAuth role="field_supervisor">
              <SupervisorLayout />
            </RequireAuth>
          }
        >
          <Route index element={<SupervisorDashboard />} />
          <Route path="tasks" element={<TaskAssign />} />

          {/* Incidents (scoped) */}
          <Route path="incidences" element={<IncidencePage />} />
          <Route path="incidences/add" element={<AddIncidencePage />} />
          <Route path="incidences/:id" element={<IncidenceDetailPage />} />
          <Route path="incidences/:id/edit" element={<UpdateIncidencePage />} />

          {/* Plucking Records (scoped) */}
          <Route path="plucking-records" element={<PluckingRecordPage />} />
          <Route
            path="plucking-records/add"
            element={<AddPluckingRecordPage />}
          />
          <Route
            path="plucking-records/:id"
            element={<ViewPluckingRecordPage />}
          />
          <Route
            path="plucking-records/:id/edit"
            element={<EditPluckingRecordPage />}
          />
        </Route>

        {/* Public Incidences Routes */}
        <Route
          path="/incidences"
          element={
            <RequireAuth>
              <IncidencePage />
            </RequireAuth>
          }
        />
        <Route
          path="/incidences/add"
          element={
            <RequireAuth>
              <AddIncidencePage />
            </RequireAuth>
          }
        />
        <Route
          path="/incidences/:id"
          element={
            <RequireAuth>
              <IncidenceDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/incidences/:id/edit"
          element={
            <RequireAuth>
              <UpdateIncidencePage />
            </RequireAuth>
          }
        />

        {/* Plucking Records Routes */}
        <Route
          path="/plucking-records"
          element={
            <RequireAuth>
              <PluckingRecordPage />
            </RequireAuth>
          }
        />
        <Route
          path="/plucking-records/add"
          element={
            <RequireAuth>
              <AddPluckingRecordPage />
            </RequireAuth>
          }
        />
        <Route
          path="/plucking-records/:id"
          element={
            <RequireAuth>
              <ViewPluckingRecordPage />
            </RequireAuth>
          }
        />
        <Route
          path="/plucking-records/:id/edit"
          element={
            <RequireAuth>
              <EditPluckingRecordPage />
            </RequireAuth>
          }
        />

        {/* Worker */}
        <Route
          path="/worker"
          element={
            <RequireAuth role="worker">
              <WorkerDashboard />
            </RequireAuth>
          }
        />

        {/* Worker Incidence Routes */}
        <Route
          path="/worker/incidences"
          element={
            <RequireAuth role="worker">
              <IncidencePage />
            </RequireAuth>
          }
        />
        <Route
          path="/worker/incidences/add"
          element={
            <RequireAuth role="worker">
              <AddIncidencePage />
            </RequireAuth>
          }
        />
        <Route
          path="/worker/incidences/:id"
          element={
            <RequireAuth role="worker">
              <IncidenceDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/worker/incidences/:id/edit"
          element={
            <RequireAuth role="worker">
              <UpdateIncidencePage />
            </RequireAuth>
          }
        />

        {/* Production Manager */}
        <Route
          path="/production-dashboard"
          element={
            <RequireAuth role="production_manager">
              <ProductionDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/production-batches"
          element={
            <RequireAuth role="production_manager">
              <ProductionBatchPage />
            </RequireAuth>
          }
        />
        <Route
          path="/create-production-batch"
          element={
            <RequireAuth role="production_manager">
              <CreateProductionBatch />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-production-batch/:id"
          element={
            <RequireAuth role="production_manager">
              <EditProductionBatch />
            </RequireAuth>
          }
        />
        <Route
          path="/reports"
          element={
            <RequireAuth role="production_manager">
              <ReportsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth role="production_manager">
              <ProfilePage />
            </RequireAuth>
          }
        />

        {/* INVENTORY MANAGER AREA with sub-navbar & breadcrumbs */}
        <Route
          path="/inventory"
          element={
            <RequireAuth role="inventory_manager">
              <InventoryLayout />
            </RequireAuth>
          }
        >
          <Route index element={<InventoryManagerDashboard />} />
          <Route path="stock" element={<InventoryStock />} />
          <Route path="supplies" element={<InventorySupplies />} />
          <Route path="reports" element={<InventoryReports />} />

          {/* Tools */}
          <Route path="tools" element={<ToolsPage />} />
          <Route path="tools/create" element={<CreateToolPage />} />
          <Route path="tools/:id" element={<ToolDetailPage />} />

          {/* Suppliers */}
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="suppliers/create" element={<SupplierCreate />} />
          <Route path="suppliers/:id/edit" element={<SupplierEditPage />} />
        </Route>

        {/* Fallback inside layout */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Extra safety net */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

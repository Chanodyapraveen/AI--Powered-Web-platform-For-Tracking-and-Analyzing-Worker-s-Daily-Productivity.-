// Role-based access control utilities

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  WORKER: 'worker',
};

export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_WORKERS: 'view_workers',
  MANAGE_WORKERS: 'manage_workers',
  VIEW_TASKS: 'view_tasks',
  MANAGE_TASKS: 'manage_tasks',
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_REPORTS: 'view_reports',
  VIEW_SETTINGS: 'view_settings',
  MANAGE_SETTINGS: 'manage_settings',
};

// Define permissions for each role
const rolePermissions = {
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_WORKERS,
    PERMISSIONS.MANAGE_WORKERS,
    PERMISSIONS.VIEW_TASKS,
    PERMISSIONS.MANAGE_TASKS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.MANAGE_SETTINGS,
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_WORKERS,
    PERMISSIONS.MANAGE_WORKERS,
    PERMISSIONS.VIEW_TASKS,
    PERMISSIONS.MANAGE_TASKS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_REPORTS,
  ],
  [ROLES.WORKER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_TASKS,
  ],
};

/**
 * Check if a user has a specific permission
 */
export const hasPermission = (userRole, permission) => {
  if (!userRole) return false;
  const permissions = rolePermissions[userRole] || [];
  return permissions.includes(permission);
};

/**
 * Check if a user has any of the specified permissions
 */
export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some(permission => hasPermission(userRole, permission));
};

/**
 * Check if a user has all of the specified permissions
 */
export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every(permission => hasPermission(userRole, permission));
};

/**
 * Get allowed routes based on user role
 */
export const getAllowedRoutes = (userRole) => {
  const routes = [];
  
  if (hasPermission(userRole, PERMISSIONS.VIEW_DASHBOARD)) {
    routes.push('/dashboard');
  }
  
  if (hasPermission(userRole, PERMISSIONS.VIEW_WORKERS)) {
    routes.push('/workers');
  }
  
  if (hasPermission(userRole, PERMISSIONS.VIEW_TASKS)) {
    routes.push('/tasks');
  }
  
  if (hasPermission(userRole, PERMISSIONS.VIEW_ANALYTICS)) {
    routes.push('/analytics');
  }
  
  if (hasPermission(userRole, PERMISSIONS.VIEW_REPORTS)) {
    routes.push('/reports');
  }
  
  if (hasPermission(userRole, PERMISSIONS.VIEW_SETTINGS)) {
    routes.push('/settings');
  }
  
  return routes;
};

/**
 * Check if user can access a specific route
 */
export const canAccessRoute = (userRole, route) => {
  const allowedRoutes = getAllowedRoutes(userRole);
  return allowedRoutes.some(allowedRoute => route.startsWith(allowedRoute));
};

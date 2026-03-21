/**
 * User-related TypeScript type definitions
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "operator" | "viewer";
  permissions: string[];
  status: "active" | "inactive" | "suspended";
  avatar?: string;
  phone?: string;
  lastLogin?: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: User["role"];
  status?: User["status"];
  sortBy?: keyof User;
  sortOrder?: "asc" | "desc";
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: User["role"];
  permissions?: string[];
  phone?: string;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  role?: User["role"];
  permissions?: string[];
  status?: User["status"];
  phone?: string;
  avatar?: string;
}

export interface UpdateUserPasswordRequest {
  currentPassword?: string; // Required for non-admin users
  newPassword: string;
  confirmPassword: string;
}

export interface UserPermissions {
  userId: string;
  permissions: string[];
  role: User["role"];
  customPermissions: string[];
  inheritedPermissions: string[];
}

/**
 * Permission categories for the system
 */
export const PERMISSIONS = {
  // User management
  USERS_VIEW: "users:view",
  USERS_CREATE: "users:create",
  USERS_UPDATE: "users:update",
  USERS_DELETE: "users:delete",
  USERS_MANAGE_ROLES: "users:manage_roles",
  USERS_MANAGE_PERMISSIONS: "users:manage_permissions",

  // Customer management
  CUSTOMERS_VIEW: "customers:view",
  CUSTOMERS_CREATE: "customers:create",
  CUSTOMERS_UPDATE: "customers:update",
  CUSTOMERS_DELETE: "customers:delete",
  CUSTOMERS_SUSPEND: "customers:suspend",

  // Subscription management
  SUBSCRIPTIONS_VIEW: "subscriptions:view",
  SUBSCRIPTIONS_CREATE: "subscriptions:create",
  SUBSCRIPTIONS_UPDATE: "subscriptions:update",
  SUBSCRIPTIONS_CANCEL: "subscriptions:cancel",

  // Payment management
  PAYMENTS_VIEW: "payments:view",
  PAYMENTS_CREATE: "payments:create",
  PAYMENTS_UPDATE: "payments:update",
  PAYMENTS_REFUND: "payments:refund",

  // Invoice management
  INVOICES_VIEW: "invoices:view",
  INVOICES_CREATE: "invoices:create",
  INVOICES_UPDATE: "invoices:update",
  INVOICES_DELETE: "invoices:delete",
  INVOICES_SEND: "invoices:send",

  // Reports
  REPORTS_VIEW: "reports:view",
  REPORTS_EXPORT: "reports:export",

  // Settings
  SETTINGS_VIEW: "settings:view",
  SETTINGS_UPDATE: "settings:update",
  SETTINGS_SYSTEM: "settings:system",
} as const;

/**
 * Role-based permission presets
 */
export const ROLE_PERMISSIONS: Record<User["role"], string[]> = {
  admin: Object.values(PERMISSIONS),
  operator: [
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.CUSTOMERS_CREATE,
    PERMISSIONS.CUSTOMERS_UPDATE,
    PERMISSIONS.CUSTOMERS_SUSPEND,
    PERMISSIONS.SUBSCRIPTIONS_VIEW,
    PERMISSIONS.SUBSCRIPTIONS_CREATE,
    PERMISSIONS.SUBSCRIPTIONS_UPDATE,
    PERMISSIONS.PAYMENTS_VIEW,
    PERMISSIONS.PAYMENTS_CREATE,
    PERMISSIONS.PAYMENTS_UPDATE,
    PERMISSIONS.INVOICES_VIEW,
    PERMISSIONS.INVOICES_CREATE,
    PERMISSIONS.INVOICES_UPDATE,
    PERMISSIONS.INVOICES_SEND,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
    PERMISSIONS.SETTINGS_VIEW,
  ],
  viewer: [
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.SUBSCRIPTIONS_VIEW,
    PERMISSIONS.PAYMENTS_VIEW,
    PERMISSIONS.INVOICES_VIEW,
    PERMISSIONS.REPORTS_VIEW,
  ],
};

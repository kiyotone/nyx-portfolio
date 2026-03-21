/**
 * Navigation & Routing Types
 *
 * Types for application navigation, routes, and menus
 */

import type { ReactNode } from "react";

/**
 * Navigation item
 */
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode | string;
  badge?: string | number;
  children?: NavItem[];
  disabled?: boolean;
  permission?: string;
  onClick?: () => void;
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
}

/**
 * Route configuration
 */
export interface RouteConfig {
  path: string;
  label: string;
  component?: ReactNode;
  exact?: boolean;
  protected?: boolean;
  permission?: string;
  children?: RouteConfig[];
  meta?: RouteMeta;
}

/**
 * Route metadata
 */
export interface RouteMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  requiresAuth?: boolean;
  requiredPermissions?: string[];
  requiredRoles?: string[];
  layout?: "default" | "auth" | "dashboard" | "public";
}

/**
 * Application routes
 */
export const ROUTES = {
  // Public routes
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",

  // Auth routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Dashboard routes
  DASHBOARD: "/dashboard",

  // Customer routes
  CUSTOMERS: "/customers",
  CUSTOMER_DETAIL: "/customers/[id]",
  CUSTOMER_NEW: "/customers/new",
  CUSTOMER_EDIT: "/customers/[id]/edit",

  // Subscription routes
  SUBSCRIPTIONS: "/subscriptions",
  SUBSCRIPTION_DETAIL: "/subscriptions/[id]",
  SUBSCRIPTION_NEW: "/subscriptions/new",

  // Payment routes
  PAYMENTS: "/payments",
  PAYMENT_DETAIL: "/payments/[id]",
  PAYMENT_NEW: "/payments/new",

  // Invoice routes
  INVOICES: "/invoices",
  INVOICE_DETAIL: "/invoices/[id]",
  INVOICE_NEW: "/invoices/new",

  // Package routes
  PACKAGES: "/packages",
  PACKAGE_DETAIL: "/packages/[id]",

  // Report routes
  REPORTS: "/reports",
  REPORT_REVENUE: "/reports/revenue",
  REPORT_CUSTOMERS: "/reports/customers",
  REPORT_SUBSCRIPTIONS: "/reports/subscriptions",

  // Service ticket routes
  TICKETS: "/tickets",
  TICKET_DETAIL: "/tickets/[id]",
  TICKET_NEW: "/tickets/new",

  // User management routes
  USERS: "/users",
  USER_DETAIL: "/users/[id]",
  USER_NEW: "/users/new",

  // Settings routes
  SETTINGS: "/settings",
  SETTINGS_PROFILE: "/settings/profile",
  SETTINGS_SECURITY: "/settings/security",
  SETTINGS_NOTIFICATIONS: "/settings/notifications",
  SETTINGS_BILLING: "/settings/billing",

  // Error routes
  UNAUTHORIZED: "/unauthorized",
  NOT_FOUND: "/404",
  SERVER_ERROR: "/500",
} as const;

/**
 * Route path type
 */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * Menu section
 */
export interface MenuSection {
  id: string;
  title?: string;
  items: NavItem[];
}

/**
 * Sidebar menu configuration
 */
export interface SidebarConfig {
  sections: MenuSection[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

/**
 * Navigation state
 */
export interface NavigationState {
  currentPath: string;
  previousPath?: string;
  breadcrumbs: BreadcrumbItem[];
}

/**
 * Query parameters type
 */
export type QueryParams = Record<string, string | string[] | undefined>;

/**
 * Route params type
 */
export type RouteParams = Record<string, string>;

/**
 * Navigation guard
 */
export type NavigationGuard = (to: RouteConfig, from?: RouteConfig) => boolean | Promise<boolean>;

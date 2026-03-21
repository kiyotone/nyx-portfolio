// components/templates/ProtectedRoute/ProtectedRoute.types.ts
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
}

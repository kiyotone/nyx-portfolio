// components/templates/ProtectedRoute/ProtectedRoute.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/hooks";
import { Spinner } from "@/components/atoms";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredPermission,
}) => {
  const { isAuthenticated, isLoading, user, isSessionExpired } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    // Redirect if session expired
    if (isSessionExpired) {
      router.push("/login?reason=session_expired");
      return;
    }

    // Check role requirement
    if (isAuthenticated && requiredRole && user?.role !== requiredRole) {
      router.push("/dashboard?error=unauthorized");
      return;
    }

    // Check permission requirement
    if (isAuthenticated && requiredPermission && !user?.permissions?.includes(requiredPermission)) {
      router.push("/dashboard?error=unauthorized");
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    isSessionExpired,
    user,
    requiredRole,
    requiredPermission,
    router,
  ]);

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated || isSessionExpired) {
    return null;
  }

  // Don't render if role/permission check fails
  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  if (requiredPermission && !user?.permissions?.includes(requiredPermission)) {
    return null;
  }

  return <>{children}</>;
};

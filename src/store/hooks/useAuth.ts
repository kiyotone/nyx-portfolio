// store/hooks/useAuth.ts
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./index";
import {
  logout as logoutAction,
  sessionExpired,
  trackActivity,
  selectIsAuthenticated,
  selectAuthLoading,
  selectCurrentUser,
  selectAuthToken,
  selectIsSessionExpired,
  selectIsIdle,
  setCredentials,
} from "../slices/auth.slice";
import { useRouter } from "next/navigation";
import { User } from "@/types/user.types";
import { addToast } from "../slices/toast.slice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectAuthToken);
  const isSessionExpired = useAppSelector(selectIsSessionExpired);
  const isIdle = useAppSelector(selectIsIdle(15 * 60 * 1000)); // 15 minutes

  // Track user activity
  useEffect(() => {
    if (isAuthenticated) {
      const handleActivity = () => {
        dispatch(trackActivity());
      };

      const events = ["mousedown", "keydown", "scroll", "touchstart"];

      events.forEach((event) => {
        window.addEventListener(event, handleActivity);
      });

      return () => {
        events.forEach((event) => {
          window.removeEventListener(event, handleActivity);
        });
      };
    }
  }, [isAuthenticated, dispatch]);

  // Check session expiry and idle state
  useEffect(() => {
    if (isAuthenticated) {
      const checkSession = setInterval(() => {
        if (isSessionExpired || isIdle) {
          dispatch(sessionExpired());

          dispatch(
            addToast({
              title: "Session Expired",
              message: "Your session has expired due to inactivity. Please log in again.",
              variant: "warning",
              duration: 6000,
            })
          );
        }
      }, 60000); // Check every minute

      return () => clearInterval(checkSession);
    }
  }, [isAuthenticated, isSessionExpired, isIdle, dispatch]);

  return {
    isAuthenticated,
    isLoading,
    user,
    token,
    isSessionExpired,
    isIdle,
  };
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const login = useCallback(
    (data: { user: User; token: string; refreshToken?: string; expiresIn?: number }) => {
      // Redux Persist will automatically save to localStorage
      dispatch(setCredentials(data));

      // Redirect to dashboard
      router.push("/dashboard");
    },
    [dispatch, router]
  );

  return login;
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = useCallback(() => {
    // Redux Persist will automatically clear from localStorage
    dispatch(logoutAction());

    // Show toast notification
    dispatch(
      addToast({
        title: "Logged Out",
        message: "You have been successfully logged out.",
        variant: "info",
        duration: 4000,
      })
    );

    // Redirect to login
    router.push("/login");
  }, [dispatch, router]);

  return logout;
};

export const usePermission = (permission: string) => {
  const user = useAppSelector(selectCurrentUser);
  return user?.permissions?.includes(permission) || false;
};

export const useRole = (role: string) => {
  const user = useAppSelector(selectCurrentUser);
  return user?.role === role;
};

export const useHasAnyRole = (roles: User["role"][]) => {
  const user = useAppSelector(selectCurrentUser);
  return user?.role ? roles.includes(user.role) : false;
};

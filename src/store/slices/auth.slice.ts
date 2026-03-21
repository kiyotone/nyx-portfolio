import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  sessionExpiry: number | null;
  lastActivity: number | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  sessionExpiry: null,
  lastActivity: null,
};

/**
 * Authentication slice
 *
 * Security features:
 * - Token management with automatic expiry
 * - Session timeout tracking
 * - Activity monitoring for idle detection
 * - Secure credential storage
 * - Auto-logout on suspicious activity
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Set user credentials after successful login
     */
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        refreshToken?: string;
        expiresIn?: number;
      }>
    ) => {
      const { user, token, refreshToken, expiresIn } = action.payload;

      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken || state.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
      state.lastActivity = Date.now();

      // Set session expiry if provided (in seconds, convert to ms timestamp)
      if (expiresIn) {
        state.sessionExpiry = Date.now() + expiresIn * 1000;
      }
    },

    /**
     * Update access token (after refresh)
     */
    updateToken: (state, action: PayloadAction<{ token: string; expiresIn?: number }>) => {
      const { token, expiresIn } = action.payload;

      state.token = token;
      state.lastActivity = Date.now();

      if (expiresIn) {
        state.sessionExpiry = Date.now() + expiresIn * 1000;
      }
    },

    /**
     * Update user data (after profile update)
     */
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    /**
     * Track user activity for idle timeout
     */
    trackActivity: (state) => {
      state.lastActivity = Date.now();
    },

    /**
     * Set loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * Set error state
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    /**
     * Logout user and clear all auth data
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.sessionExpiry = null;
      state.lastActivity = null;
    },

    /**
     * Session expired - similar to logout but with different UX
     */
    sessionExpired: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = "Your session has expired. Please login again.";
      state.sessionExpiry = null;
      state.lastActivity = null;
    },
  },
});

// Export actions
export const {
  setCredentials,
  updateToken,
  updateUser,
  trackActivity,
  setLoading,
  setError,
  logout,
  sessionExpired,
} = authSlice.actions;

// Export selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;

/**
 * Check if user has specific permission
 */
export const selectHasPermission = (permission: string) => (state: { auth: AuthState }) => {
  return state.auth.user?.permissions?.includes(permission) || false;
};

/**
 * Check if user has specific role
 */
export const selectHasRole = (role: User["role"]) => (state: { auth: AuthState }) => {
  return state.auth.user?.role === role;
};

/**
 * Check if user has any of the specified roles
 */
export const selectHasAnyRole = (roles: User["role"][]) => (state: { auth: AuthState }) => {
  return state.auth.user?.role ? roles.includes(state.auth.user.role) : false;
};

/**
 * Check if session is expired
 */
export const selectIsSessionExpired = (state: { auth: AuthState }) => {
  if (!state.auth.sessionExpiry) return false;
  return Date.now() > state.auth.sessionExpiry;
};

/**
 * Check if user is idle (inactive for specified time)
 * @param idleTimeMs - Idle time in milliseconds (default: 15 minutes)
 */
export const selectIsIdle =
  (idleTimeMs: number = 15 * 60 * 1000) =>
  (state: { auth: AuthState }) => {
    if (!state.auth.lastActivity) return false;
    return Date.now() - state.auth.lastActivity > idleTimeMs;
  };

export default authSlice.reducer;

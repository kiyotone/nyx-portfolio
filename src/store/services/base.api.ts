import type { User } from "@/types";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";
import { logout, setCredentials } from "../slices/auth.slice";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/**
 * Response type for token refresh
 */
interface RefreshTokenResponse {
  token: string;
  user: User;
}

/**
 * Base query with authentication token injection
 */
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include", // Important for cookies
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Add CSRF token if available
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    if (csrfToken) {
      headers.set("X-CSRF-Token", csrfToken);
    }

    headers.set("Content-Type", "application/json");
    return headers;
  },
});

/**
 * Type guard to check if refresh response is valid
 */
function isRefreshTokenResponse(data: unknown): data is RefreshTokenResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "token" in data &&
    "user" in data &&
    typeof (data as RefreshTokenResponse).token === "string"
  );
}

/**
 * Base query with automatic token refresh and error handling
 */
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 unauthorized errors
  if (result.error && result.error.status === 401) {
    console.log("Token expired, attempting refresh...");

    // Try to refresh the token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        credentials: "include",
      },
      api,
      extraOptions
    );

    if (refreshResult.data && isRefreshTokenResponse(refreshResult.data)) {
      // Store the new token
      const { token, user } = refreshResult.data;
      api.dispatch(setCredentials({ token, user }));

      // Retry the original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, logout user
      api.dispatch(logout());
    }
  }

  return result;
};

/**
 * Base API configuration
 * All other API services will inject endpoints into this
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "User",
    "Customer",
    "Subscription",
    "Payment",
    "Invoice",
    "Report",
    "Service",
    "Package",
    "Transaction",
  ],
  endpoints: () => ({}),
});

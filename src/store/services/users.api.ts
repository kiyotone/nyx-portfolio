import { baseApi } from "./base.api";
import type {
  User,
  UserListParams,
  UserListResponse,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateUserPasswordRequest,
  UserPermissions,
} from "@/types";

/**
 * Users API endpoints with role-based access control
 *
 * Security features:
 * - Token-based authentication (handled by base API)
 * - Automatic token refresh on 401
 * - CSRF protection
 * - Role-based endpoint access
 * - Secure password handling (never returned in responses)
 * - Audit logging on sensitive operations
 */
export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== QUERIES ====================

    /**
     * Get all users with pagination and filters
     * @requires Admin or Operator role
     */
    getUsers: builder.query<UserListResponse, UserListParams | void>({
      query: (params) => ({
        url: "/users",
        params: params || {},
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }: { id: string }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    /**
     * Get single user by ID
     * @requires Admin, Operator, or same user
     */
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    /**
     * Get current authenticated user
     * @requires Valid authentication token
     */
    getCurrentUser: builder.query<User, void>({
      query: () => "/users/me",
      providesTags: ["Auth"],
    }),

    /**
     * Get user permissions
     * @requires Valid authentication token
     */
    getUserPermissions: builder.query<UserPermissions, string>({
      query: (id) => `/users/${id}/permissions`,
      providesTags: (result, error, id) => [{ type: "User", id: `${id}-permissions` }],
    }),

    /**
     * Search users by query
     * @requires Admin or Operator role
     */
    searchUsers: builder.query<User[], string>({
      query: (query) => ({
        url: "/users/search",
        params: { q: query },
      }),
      providesTags: [{ type: "User", id: "SEARCH" }],
    }),

    // ==================== MUTATIONS ====================

    /**
     * Create new user
     * @requires Admin role
     * @audit User creation event logged
     */
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    /**
     * Update user details
     * @requires Admin role or same user (limited fields)
     * @audit User update event logged
     */
    updateUser: builder.mutation<User, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
        "Auth", // Invalidate auth if current user updated
      ],
    }),

    /**
     * Update user password
     * @requires Same user or Admin role
     * @security Old password required for user, not for admin
     * @audit Password change event logged
     */
    updateUserPassword: builder.mutation<
      { message: string },
      { id: string; data: UpdateUserPasswordRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}/password`,
        method: "PUT",
        body: data,
      }),
    }),

    /**
     * Update user permissions
     * @requires Admin role only
     * @audit Permission change event logged
     */
    updateUserPermissions: builder.mutation<User, { id: string; permissions: string[] }>({
      query: ({ id, permissions }) => ({
        url: `/users/${id}/permissions`,
        method: "PUT",
        body: { permissions },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: `${id}-permissions` },
      ],
    }),

    /**
     * Update user role
     * @requires Admin role only
     * @audit Role change event logged
     */
    updateUserRole: builder.mutation<User, { id: string; role: User["role"] }>({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    /**
     * Deactivate user account
     * @requires Admin role only
     * @audit Account deactivation event logged
     */
    deactivateUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `/users/${id}/deactivate`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    /**
     * Reactivate user account
     * @requires Admin role only
     * @audit Account reactivation event logged
     */
    reactivateUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `/users/${id}/reactivate`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    /**
     * Delete user permanently
     * @requires Admin role only
     * @security Soft delete - user marked as deleted, not removed from DB
     * @audit Account deletion event logged
     */
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    /**
     * Force logout user from all sessions
     * @requires Admin role or same user
     * @security Invalidates all active sessions and tokens
     * @audit Force logout event logged
     */
    forceLogoutUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/users/${id}/force-logout`,
        method: "POST",
      }),
    }),

    /**
     * Get user activity log
     * @requires Admin role or same user (limited view)
     * @returns Paginated audit log of user actions
     */
    getUserActivityLog: builder.query<
      {
        activities: Array<{
          id: string;
          action: string;
          timestamp: string;
          ipAddress: string;
          userAgent: string;
          metadata?: Record<string, unknown>;
        }>;
        total: number;
        page: number;
        limit: number;
      },
      { userId: string; page?: number; limit?: number }
    >({
      query: ({ userId, page = 1, limit = 20 }) => ({
        url: `/users/${userId}/activity`,
        params: { page, limit },
      }),
      providesTags: (result, error, { userId }) => [{ type: "User", id: `${userId}-activity` }],
    }),

    /**
     * Get active user sessions
     * @requires Admin role or same user
     * @returns List of active sessions with device and location info
     */
    getUserSessions: builder.query<
      Array<{
        id: string;
        deviceName: string;
        ipAddress: string;
        location: string;
        lastActive: string;
        current: boolean;
      }>,
      string
    >({
      query: (userId) => `/users/${userId}/sessions`,
      providesTags: (result, error, userId) => [{ type: "User", id: `${userId}-sessions` }],
    }),

    /**
     * Revoke specific user session
     * @requires Admin role or same user
     * @security Cannot revoke current session
     */
    revokeUserSession: builder.mutation<{ message: string }, { userId: string; sessionId: string }>(
      {
        query: ({ userId, sessionId }) => ({
          url: `/users/${userId}/sessions/${sessionId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, { userId }) => [
          { type: "User", id: `${userId}-sessions` },
        ],
      }
    ),
  }),
});

// Export hooks for use in components
export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetCurrentUserQuery,
  useGetUserPermissionsQuery,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useUpdateUserPermissionsMutation,
  useUpdateUserRoleMutation,
  useDeactivateUserMutation,
  useReactivateUserMutation,
  useDeleteUserMutation,
  useForceLogoutUserMutation,
  useGetUserActivityLogQuery,
  useGetUserSessionsQuery,
  useRevokeUserSessionMutation,
} = usersApi;

/**
 * LoginForm Organism
 *
 * A complete login form with email/password fields, validation,
 * remember me, forgot password, and optional social login.
 *
 * @example
 * ```tsx
 * import { LoginForm } from "@/components/organisms/LoginForm";
 *
 * <LoginForm
 *   onSubmit={async (data) => {
 *     await loginUser(data);
 *   }}
 *   isLoading={isLoading}
 *   error={error}
 *   showSocialLogin
 *   onSocialLogin={(provider) => console.log(provider)}
 *   onForgotPassword={() => navigate('/forgot-password')}
 * />
 * ```
 */

export { LoginForm } from "./LoginForm";
export type { LoginFormProps, LoginFormData } from "./LoginForm.types";

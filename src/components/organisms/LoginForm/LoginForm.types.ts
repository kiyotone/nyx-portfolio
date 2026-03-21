// components/organisms/LoginForm/LoginForm.types.ts
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginFormProps extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> {
  /**
   * Callback function when form is submitted (REQUIRED)
   */
  onSubmit: (data: LoginFormData) => Promise<void> | void;

  /**
   * Loading state
   */
  isLoading?: boolean;

  /**
   * Error message to display
   */
  error?: string | null;

  /**
   * Show "Remember me" checkbox
   */
  showRememberMe?: boolean;

  /**
   * Show "Forgot password" link
   */
  showForgotPassword?: boolean;

  /**
   * Callback for forgot password link
   */
  onForgotPassword?: () => void;

  /**
   * Show social login buttons
   */
  showSocialLogin?: boolean;

  /**
   * Callback for social login
   */
  onSocialLogin?: (provider: "google" | "github") => void;
}

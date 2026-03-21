import type { ButtonVariant, ButtonSize } from "@/types/component.types";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the button
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Show loading spinner and disable button
   * @default false
   */
  isLoading?: boolean;

  /**
   * Icon to display before children
   */
  iconBefore?: React.ReactNode;

  /**
   * Icon to display after children
   */
  iconAfter?: React.ReactNode;

  /**
   * Make button full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button content
   */
  children?: React.ReactNode;
}

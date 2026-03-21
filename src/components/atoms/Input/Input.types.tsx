import type { InputVariant, InputSize, InputState, InputType } from "@/types/component.types";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Visual variant of the input
   * @default "default"
   */
  variant?: InputVariant;

  /**
   * Size of the input
   * @default "md"
   */
  size?: InputSize;

  /**
   * State of the input (affects styling)
   * @default "default"
   */
  state?: InputState;

  /**
   * Input type
   * @default "text"
   */
  type?: InputType;

  /**
   * Label for the input
   */
  label?: string;

  /**
   * Helper text below the input
   */
  helperText?: string;

  /**
   * Error message (automatically sets state to "error")
   */
  error?: string;

  /**
   * Icon to display before input
   */
  iconBefore?: React.ReactNode;

  /**
   * Icon to display after input
   */
  iconAfter?: React.ReactNode;

  /**
   * Make input full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Show required indicator
   * @default false
   */
  required?: boolean;

  /**
   * Show optional indicator
   * @default false
   */
  optional?: boolean;
}

import type { InputSize } from "@/types/component.types";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /**
   * Size of the checkbox
   * @default "md"
   */
  size?: InputSize;

  /**
   * Label for the checkbox
   */
  label?: React.ReactNode;

  /**
   * Helper text below the checkbox
   */
  helperText?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Indeterminate state
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Custom checked icon
   */
  checkedIcon?: React.ReactNode;

  /**
   * Custom indeterminate icon
   */
  indeterminateIcon?: React.ReactNode;
}

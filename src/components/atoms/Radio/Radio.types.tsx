import type { InputSize } from "@/types/component.types";

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /**
   * Size of the radio button
   * @default "md"
   */
  size?: InputSize;

  /**
   * Label for the radio button
   */
  label?: React.ReactNode;

  /**
   * Helper text below the radio button
   */
  helperText?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Value of the radio button (required for radio groups)
   */
  value: string;
}

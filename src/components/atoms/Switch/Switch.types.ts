import type { SwitchVariant, InputSize, LabelPosition } from "@/types/component.types";

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /**
   * Visual variant of the switch
   * @default "default"
   */
  variant?: SwitchVariant;

  /**
   * Size of the switch
   * @default "md"
   */
  size?: InputSize;

  /**
   * Label for the switch
   */
  label?: React.ReactNode;

  /**
   * Helper text below the switch
   */
  helperText?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Position of the label
   * @default "right"
   */
  labelPosition?: LabelPosition;
}

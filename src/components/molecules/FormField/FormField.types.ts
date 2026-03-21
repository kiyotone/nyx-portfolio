// components/molecules/FormField/FormField.types.ts
import type { InputProps } from "@/components/atoms/Input/Input.types";

export interface FormFieldProps extends Omit<InputProps, "id"> {
  /**
   * Label for the input field
   */
  label?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display below the input
   */
  helperText?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Additional className for the container
   */
  className?: string;

  /**
   * Additional className for the input
   */
  inputClassName?: string;

  /**
   * Additional className for the label
   */
  labelClassName?: string;
}

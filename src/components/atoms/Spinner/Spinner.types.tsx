import type { SpinnerVariant, SpinnerSize, ColorVariant } from "@/types/component.types";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the spinner
   * @default "circle"
   */
  variant?: SpinnerVariant;

  /**
   * Size of the spinner
   * @default "md"
   */
  size?: SpinnerSize;

  /**
   * Color variant of the spinner
   * @default "primary"
   */
  color?: ColorVariant;

  /**
   * Accessible label for screen readers
   * @default "Loading"
   */
  label?: string;
}

import type {
  TypographyVariant,
  TypographyElement,
  FontWeight,
  TextAlign,
  TypographyColor,
} from "@/types/component.types";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * HTML element to render
   * @default "p"
   */
  as?: TypographyElement;

  /**
   * Visual variant of the text
   * @default "body"
   */
  variant?: TypographyVariant;

  /**
   * Font weight
   * @default undefined (uses variant default)
   */
  weight?: FontWeight;

  /**
   * Text alignment
   * @default undefined
   */
  align?: TextAlign;

  /**
   * Text color variant
   * @default "default"
   */
  color?: TypographyColor;

  /**
   * Truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Apply italic style
   * @default false
   */
  italic?: boolean;

  /**
   * Text content
   */
  children?: React.ReactNode;
}

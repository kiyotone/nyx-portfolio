/**
 * Atoms - Foundational UI Components
 *
 * The smallest, indivisible UI components that serve as the building blocks
 * for more complex components. Each atom is self-contained and highly reusable.
 */

/**
 * Button Atom
 * A highly modular, accessible button component with multiple variants,
 * sizes, loading states, and icon support.
 */
export { Button } from "./Button";
export type { ButtonProps } from "./Button/Button.types";

/**
 * Typography Atom
 * A flexible typography component for consistent text rendering with
 * multiple variants, colors, weights, and semantic HTML elements.
 */
export { Typography } from "./Typography";
export type { TypographyProps } from "./Typography/Typography.types";

/**
 * Input Atom
 * A highly accessible input component with multiple variants, sizes,
 * states, and icon support. Includes label, helper text, and error handling.
 */
export { Input } from "./Input";
export type { InputProps } from "./Input/Input.types";

/**
 * Checkbox Atom
 * An accessible checkbox component with label, helper text, error handling,
 * and indeterminate state support.
 */
export { Checkbox } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox/Checkbox.types";

/**
 * Radio Atom
 * An accessible radio button component for single-choice selections
 * with label and helper text support.
 */
export { Radio } from "./Radio";
export type { RadioProps } from "./Radio/Radio.types";

/**
 * Switch Atom
 * A toggle switch component for on/off states with multiple variants
 * and label positioning options.
 */
export { Switch } from "./Switch";
export type { SwitchProps } from "./Switch/Switch.types";

/**
 * Badge Atom
 * A versatile badge component for labels, tags, and status indicators
 * with multiple variants, sizes, and optional icons.
 */
export { Badge } from "./Badge";
export type { BadgeProps } from "./Badge/Badge.types";

/**
 * Avatar Atom
 * A user avatar component with image support, fallback initials,
 * status indicators, and multiple sizes.
 */
export { Avatar } from "./Avatar";
export type { AvatarProps } from "./Avatar/Avatar.types";

/**
 * Spinner Atom
 * A loading spinner component with multiple animation variants,
 * sizes, and color options.
 */
export { Spinner } from "./Spinner";
export type { SpinnerProps } from "./Spinner/Spinner.types";

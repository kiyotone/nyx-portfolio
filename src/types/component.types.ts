// types/component.types.ts

/**
 * Common Types for Component System
 * Shared types used across the application
 */

/**
 * Size variants used across components
 */
export type Size = "sm" | "md" | "lg" | "xl";

/**
 * Color variants for semantic styling
 */
export type ColorVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "success"
  | "warning"
  | "muted";

/**
 * Button-specific variants
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link"
  | "success";

/**
 * Button-specific sizes
 */
export type ButtonSize = "sm" | "md" | "lg" | "icon";

/**
 * Typography-specific variants
 */
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "bodyLarge"
  | "bodySmall"
  | "caption"
  | "overline"
  | "label";

/**
 * Typography element types
 */
export type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label"
  | "div";

/**
 * Font weight variants
 */
export type FontWeight = "light" | "normal" | "medium" | "semibold" | "bold";

/**
 * Text alignment options
 */
export type TextAlign = "left" | "center" | "right" | "justify";

/**
 * Typography-specific color variants
 */
export type TypographyColor =
  | "default"
  | "muted"
  | "primary"
  | "secondary"
  | "destructive"
  | "success";

/**
 * Input-specific variants
 */
export type InputVariant = "default" | "filled" | "outline";

/**
 * Input-specific sizes
 */
export type InputSize = "sm" | "md" | "lg";

/**
 * Input state variants
 */
export type InputState = "default" | "error" | "success" | "warning";

/**
 * Input types
 */
export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "color";

/**
 * Switch-specific variants
 */
export type SwitchVariant = "default" | "success" | "destructive";

/**
 * Badge-specific variants
 */
export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "destructive"
  | "outline";

/**
 * Badge-specific sizes
 */
export type BadgeSize = "sm" | "md" | "lg";

/**
 * Avatar-specific sizes
 */
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Avatar status variants
 */
export type AvatarStatus = "online" | "offline" | "away" | "busy";

/**
 * Avatar shape variants
 */
export type AvatarShape = "circle" | "square";

/**
 * Spinner-specific variants
 */
export type SpinnerVariant = "circle" | "dots" | "bars";

/**
 * Spinner-specific sizes
 */
export type SpinnerSize = "sm" | "md" | "lg" | "xl";

/**
 * Skeleton-specific variants
 */
export type SkeletonVariant = "text" | "circle" | "rectangle";

/**
 * Skeleton animation types
 */
export type SkeletonAnimation = "pulse" | "wave" | "none";

/**
 * Divider orientation
 */
export type DividerOrientation = "horizontal" | "vertical";

/**
 * Divider variants
 */
export type DividerVariant = "solid" | "dashed" | "dotted";

/**
 * Icon sizes
 */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Link variants
 */
export type LinkVariant = "default" | "underline" | "button";

/**
 * Label position for form elements
 */
export type LabelPosition = "left" | "right" | "top" | "bottom";

/**
 * Toast-specific types
 */
export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface Toast {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastState {
  toasts: Toast[];
}

export interface AddToastPayload {
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Modal/Popup-specific types
 */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export type ModalVariant = "default" | "centered" | "drawer";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: ModalSize;
  variant?: ModalVariant;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  footer?: React.ReactNode;
  preventClose?: boolean;
}

/**
 * Common loading state
 */
export interface LoadingState {
  isLoading: boolean;
}

/**
 * Common disabled state
 */
export interface DisabledState {
  disabled?: boolean;
}

/**
 * Common children prop
 */
export interface WithChildren {
  children?: React.ReactNode;
}

/**
 * Common className prop for style overrides
 */
export interface WithClassName {
  className?: string;
}

/**
 * Base props that many components share
 */
export interface BaseComponentProps extends WithChildren, WithClassName {}

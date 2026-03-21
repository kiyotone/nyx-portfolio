import * as React from "react";
import { cn } from "@/utils/cn";
import type { ButtonVariant, ButtonSize } from "@/types/component.types";
import type { ButtonProps } from "./Button.types";

// Loading spinner component - MOVED OUTSIDE to prevent recreation on each render
const LoadingSpinner = () => (
  <svg
    className="h-4 w-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      iconBefore,
      iconAfter,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles - common to all buttons
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";

    // Variant styles - different button types
    const variants: Record<ButtonVariant, string> = {
      primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90 active:bg-primary/80",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
      outline:
        "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 active:text-primary/70",
      destructive:
        "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/80",
      success:
        "bg-success text-success-foreground shadow-sm hover:bg-success/90 active:bg-success/80",
    };

    // Size styles
    const sizes: Record<ButtonSize, string> = {
      sm: "h-8 px-3 text-sm gap-1.5",
      md: "h-10 px-4 py-2 gap-2",
      lg: "h-12 px-6 text-lg gap-2.5",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], fullWidth && "w-full", className)}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        {!isLoading && iconBefore && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {iconBefore}
          </span>
        )}
        {children}
        {!isLoading && iconAfter && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {iconAfter}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

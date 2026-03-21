import * as React from "react";
import { cn } from "@/utils/cn";
import type { BadgeVariant, BadgeSize } from "@/types/component.types";
import type { BadgeProps } from "./Badge.types";

// Close icon component
const CloseIcon = () => (
  <svg
    className="h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      dot = false,
      removable = false,
      onRemove,
      iconBefore,
      iconAfter,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center gap-1 font-medium transition-colors rounded-full whitespace-nowrap";

    // Variant styles
    const variants: Record<BadgeVariant, string> = {
      default: "bg-muted text-muted-foreground",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      success: "bg-success text-success-foreground",
      warning: "bg-warning text-warning-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border-2 border-input bg-background text-foreground",
    };

    // Size styles
    const sizes: Record<BadgeSize, string> = {
      sm: "px-2 py-0.5 text-xs gap-1",
      md: "px-2.5 py-1 text-sm gap-1.5",
      lg: "px-3 py-1.5 text-base gap-2",
    };

    // Dot sizes
    const dotSizes: Record<BadgeSize, string> = {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-2.5 w-2.5",
    };

    // Icon sizes
    const iconSizes: Record<BadgeSize, string> = {
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {dot && (
          <span
            className={cn("rounded-full bg-current shrink-0", dotSizes[size])}
            aria-hidden="true"
          />
        )}
        {iconBefore && (
          <span className={cn("inline-flex shrink-0", iconSizes[size])} aria-hidden="true">
            {iconBefore}
          </span>
        )}
        {children}
        {iconAfter && !removable && (
          <span className={cn("inline-flex shrink-0", iconSizes[size])} aria-hidden="true">
            {iconAfter}
          </span>
        )}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              "inline-flex shrink-0 rounded-full hover:bg-black/10 active:bg-black/20 transition-colors",
              iconSizes[size]
            )}
            aria-label="Remove"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };

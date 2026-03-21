import * as React from "react";
import { cn } from "@/utils/cn";
import type { SpinnerVariant, SpinnerSize, ColorVariant } from "@/types/component.types";
import type { SpinnerProps } from "./Spinner.types";

// Circle spinner
const CircleSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Dots spinner
const DotsSpinner = ({ className }: { className?: string }) => (
  <div className={cn("flex gap-1", className)}>
    <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
    <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
    <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
  </div>
);

// Bars spinner
const BarsSpinner = ({ className }: { className?: string }) => (
  <div className={cn("flex gap-1 items-end h-full", className)}>
    <div
      className="w-1 bg-current animate-pulse [animation-delay:-0.3s] h-full origin-bottom"
      style={{ animation: "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
    />
    <div
      className="w-1 bg-current animate-pulse [animation-delay:-0.15s] h-3/4 origin-bottom"
      style={{ animation: "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
    />
    <div
      className="w-1 bg-current animate-pulse h-full origin-bottom"
      style={{ animation: "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
    />
  </div>
);

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    { className, variant = "circle", size = "md", color = "primary", label = "Loading", ...props },
    ref
  ) => {
    // Size styles
    const sizes: Record<SpinnerSize, string> = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    };

    // Color styles
    const colors: Record<ColorVariant, string> = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      destructive: "text-destructive",
      success: "text-success",
      warning: "text-warning",
      muted: "text-muted-foreground",
    };

    const spinnerContent = {
      circle: <CircleSpinner className="h-full w-full" />,
      dots: <DotsSpinner className="h-full w-full" />,
      bars: <BarsSpinner className="h-full w-full" />,
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center",
          sizes[size],
          colors[color],
          className
        )}
        {...props}
      >
        {spinnerContent[variant]}
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };

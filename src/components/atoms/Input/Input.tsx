import * as React from "react";
import { cn } from "@/utils/cn";
import type { InputVariant, InputSize, InputState, InputType } from "@/types/component.types";
import type { InputProps } from "./Input.types";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      state = "default",
      type = "text",
      label,
      helperText,
      error,
      iconBefore,
      iconAfter,
      fullWidth = false,
      required = false,
      optional = false,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // Always call useId, then use provided id if available
    const generatedId = React.useId();
    const inputId = id || generatedId;

    // If error is provided, override state
    const effectiveState = error ? "error" : state;

    // Base styles
    const baseStyles =
      "flex w-full rounded-md border bg-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

    // Variant styles
    const variants: Record<InputVariant, string> = {
      default:
        "border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      filled: "bg-muted border-transparent focus-visible:border-input focus-visible:bg-background",
      outline: "border-2 border-input focus-visible:border-primary",
    };

    // Size styles
    const sizes: Record<InputSize, string> = {
      sm: "h-8 px-3 py-1 text-sm",
      md: "h-10 px-4 py-2 text-base",
      lg: "h-12 px-5 py-3 text-lg",
    };

    // State styles
    const states: Record<InputState, string> = {
      default: "",
      error: "border-destructive focus-visible:ring-destructive",
      success: "border-success focus-visible:ring-success",
      warning: "border-warning focus-visible:ring-warning",
    };

    // Icon wrapper sizes
    const iconSizes: Record<InputSize, string> = {
      sm: "px-2",
      md: "px-3",
      lg: "px-4",
    };

    const inputElement = (
      <input
        id={inputId}
        ref={ref}
        type={type}
        disabled={disabled}
        required={required}
        aria-invalid={effectiveState === "error"}
        aria-describedby={helperText || error ? `${inputId}-description` : undefined}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          states[effectiveState],
          iconBefore && "pl-10",
          iconAfter && "pr-10",
          className
        )}
        {...props}
      />
    );

    const inputWrapper = (
      <div className={cn("relative", fullWidth && "w-full")}>
        {iconBefore && (
          <div
            className={cn(
              "absolute left-0 top-0 h-full flex items-center text-muted-foreground pointer-events-none",
              iconSizes[size]
            )}
          >
            {iconBefore}
          </div>
        )}
        {inputElement}
        {iconAfter && (
          <div
            className={cn(
              "absolute right-0 top-0 h-full flex items-center text-muted-foreground pointer-events-none",
              iconSizes[size]
            )}
          >
            {iconAfter}
          </div>
        )}
      </div>
    );

    // If no label, return just the input wrapper
    if (!label) {
      return inputWrapper;
    }

    // Return full input group with label and helper text
    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
          {optional && !required && (
            <span className="text-muted-foreground ml-1 font-normal">(optional)</span>
          )}
        </label>
        {inputWrapper}
        {(helperText || error) && (
          <p
            id={`${inputId}-description`}
            className={cn("text-sm", error ? "text-destructive" : "text-muted-foreground")}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

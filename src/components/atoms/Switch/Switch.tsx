import * as React from "react";
import { cn } from "@/utils/cn";
import type { SwitchVariant, InputSize, LabelPosition } from "@/types/component.types";
import type { SwitchProps } from "./Switch.types";

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      label,
      helperText,
      error,
      labelPosition = "right",
      disabled,
      id,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;

    // Base styles for the switch track
    const baseStyles =
      "peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    // Variant styles for unchecked state
    const uncheckedVariants: Record<SwitchVariant, string> = {
      default: "bg-input",
      success: "bg-input",
      destructive: "bg-input",
    };

    // Variant styles for checked state
    const checkedVariants: Record<SwitchVariant, string> = {
      default: "peer-checked:bg-primary",
      success: "peer-checked:bg-success",
      destructive: "peer-checked:bg-destructive",
    };

    // Size styles
    const sizes: Record<InputSize, { track: string; thumb: string; thumbTranslate: string }> = {
      sm: { track: "h-5 w-9", thumb: "h-4 w-4", thumbTranslate: "peer-checked:translate-x-4" },
      md: { track: "h-6 w-11", thumb: "h-5 w-5", thumbTranslate: "peer-checked:translate-x-5" },
      lg: { track: "h-7 w-14", thumb: "h-6 w-6", thumbTranslate: "peer-checked:translate-x-7" },
    };

    const switchElement = (
      <div className="relative inline-flex items-center">
        <input
          id={switchId}
          ref={ref}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={helperText || error ? `${switchId}-description` : undefined}
          className="peer absolute h-full w-full cursor-pointer opacity-0"
          {...props}
        />
        <div
          className={cn(
            baseStyles,
            uncheckedVariants[variant],
            checkedVariants[variant],
            sizes[size].track,
            className
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute left-0.5 rounded-full bg-background shadow-lg transition-transform duration-200",
              sizes[size].thumb,
              sizes[size].thumbTranslate
            )}
          />
        </div>
      </div>
    );

    // If no label, return just the switch
    if (!label) {
      return switchElement;
    }

    // Return switch with label and helper text
    return (
      <div className="space-y-2">
        <div
          className={cn(
            "flex items-center gap-2",
            labelPosition === "left" && "flex-row-reverse justify-end"
          )}
        >
          {switchElement}
          <label
            htmlFor={switchId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
          >
            {label}
          </label>
        </div>
        {(helperText || error) && (
          <p
            id={`${switchId}-description`}
            className={cn("text-sm", error ? "text-destructive" : "text-muted-foreground")}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };

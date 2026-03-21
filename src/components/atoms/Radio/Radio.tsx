import * as React from "react";
import { cn } from "@/utils/cn";
import type { InputSize } from "@/types/component.types";
import type { RadioProps } from "./Radio.types";

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size = "md", label, helperText, error, disabled, id, value, ...props }, ref) => {
    const generatedId = React.useId();
    const radioId = id || generatedId;

    // Base styles for the radio container
    const baseStyles =
      "peer relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-input bg-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary";

    // Checked styles
    const checkedStyles = "peer-checked:border-primary peer-checked:bg-background";

    // Size styles
    const sizes: Record<InputSize, { container: string; dot: string }> = {
      sm: { container: "h-4 w-4", dot: "h-2 w-2" },
      md: { container: "h-5 w-5", dot: "h-2.5 w-2.5" },
      lg: { container: "h-6 w-6", dot: "h-3 w-3" },
    };

    const radioElement = (
      <div className="relative inline-flex items-center">
        <input
          id={radioId}
          ref={ref}
          type="radio"
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={helperText || error ? `${radioId}-description` : undefined}
          className="peer absolute h-full w-full cursor-pointer opacity-0"
          {...props}
        />
        <div className={cn(baseStyles, checkedStyles, sizes[size].container, className)}>
          <div
            className={cn(
              "rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity",
              sizes[size].dot
            )}
          />
        </div>
      </div>
    );

    // If no label, return just the radio
    if (!label) {
      return radioElement;
    }

    // Return radio with label and helper text
    return (
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          {radioElement}
          <label
            htmlFor={radioId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
          >
            {label}
          </label>
        </div>
        {(helperText || error) && (
          <p
            id={`${radioId}-description`}
            className={cn("text-sm ml-7", error ? "text-destructive" : "text-muted-foreground")}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export { Radio };

import * as React from "react";
import { cn } from "@/utils/cn";
import type { InputSize } from "@/types/component.types";
import type { CheckboxProps } from "./Checkbox.types";

// Default check icon
const CheckIcon = () => (
  <svg
    className="h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Default indeterminate icon
const IndeterminateIcon = () => (
  <svg
    className="h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = "md",
      label,
      helperText,
      error,
      indeterminate = false,
      checkedIcon,
      indeterminateIcon,
      disabled,
      id,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    const internalRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = ref || internalRef;

    // Set indeterminate property on the DOM element
    React.useEffect(() => {
      const element = (combinedRef as React.RefObject<HTMLInputElement>).current;
      if (element) {
        element.indeterminate = indeterminate;
      }
    }, [indeterminate, combinedRef]);

    // Base styles for the checkbox container
    const baseStyles =
      "peer relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded border-2 border-input bg-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary";

    // Checked/indeterminate styles
    const checkedStyles =
      "peer-checked:bg-primary peer-checked:border-primary peer-checked:text-primary-foreground";

    const indeterminateStyles = indeterminate
      ? "bg-primary border-primary text-primary-foreground"
      : "";

    // Size styles
    const sizes: Record<InputSize, { container: string; icon: string }> = {
      sm: { container: "h-4 w-4", icon: "h-3 w-3" },
      md: { container: "h-5 w-5", icon: "h-4 w-4" },
      lg: { container: "h-6 w-6", icon: "h-5 w-5" },
    };

    const checkboxElement = (
      <div className="relative inline-flex items-center">
        <input
          id={checkboxId}
          ref={combinedRef as React.RefObject<HTMLInputElement>}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          aria-invalid={!!error}
          aria-describedby={helperText || error ? `${checkboxId}-description` : undefined}
          className="peer absolute h-full w-full cursor-pointer opacity-0"
          {...props}
        />
        <div
          className={cn(
            baseStyles,
            checkedStyles,
            indeterminateStyles,
            sizes[size].container,
            className
          )}
        >
          <div
            className={cn(
              "opacity-0 peer-checked:opacity-100 transition-opacity",
              sizes[size].icon
            )}
          >
            {indeterminate
              ? indeterminateIcon || <IndeterminateIcon />
              : checkedIcon || <CheckIcon />}
          </div>
        </div>
      </div>
    );

    // If no label, return just the checkbox
    if (!label) {
      return checkboxElement;
    }

    // Return checkbox with label and helper text
    return (
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          {checkboxElement}
          <label
            htmlFor={checkboxId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
          >
            {label}
          </label>
        </div>
        {(helperText || error) && (
          <p
            id={`${checkboxId}-description`}
            className={cn("text-sm ml-7", error ? "text-destructive" : "text-muted-foreground")}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };

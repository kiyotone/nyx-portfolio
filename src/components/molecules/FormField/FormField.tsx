// components/molecules/FormField/FormField.tsx
import * as React from "react";
import { cn } from "@/utils/cn";
import { Input } from "@/components/atoms/Input";
import { Typography } from "@/components/atoms/Typography";
import type { FormFieldProps } from "./FormField.types";

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      className,
      inputClassName,
      labelClassName,
      ...inputProps
    },
    ref
  ) => {
    const inputId = React.useId();

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn("text-sm font-medium text-foreground", labelClassName)}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <Input
          ref={ref}
          id={inputId}
          className={cn(error && "border-destructive", inputClassName)}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...inputProps}
        />

        {error && (
          <Typography
            variant="bodySmall"
            className="text-destructive"
            id={`${inputId}-error`}
            role="alert"
          >
            {error}
          </Typography>
        )}

        {helperText && !error && (
          <Typography
            variant="bodySmall"
            className="text-muted-foreground"
            id={`${inputId}-helper`}
          >
            {helperText}
          </Typography>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };

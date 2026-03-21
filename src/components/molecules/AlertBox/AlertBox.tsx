import * as React from "react";
import { cn } from "@/utils/cn";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import type { AlertBoxProps, AlertVariant } from "./AlertBox.types";

const InfoIcon = () => (
  <svg
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const XCircleIcon = () => (
  <svg
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const XIcon = () => (
  <svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const AlertBox = React.forwardRef<HTMLDivElement, AlertBoxProps>(
  (
    {
      className,
      variant = "info",
      title,
      description,
      dismissible = false,
      onDismiss,
      icon,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const [isDismissed, setIsDismissed] = React.useState(false);

    const handleDismiss = () => {
      setIsDismissed(true);
      onDismiss?.();
    };

    if (isDismissed) {
      return null;
    }

    const variants: Record<AlertVariant, { container: string; icon: React.ReactNode }> = {
      info: {
        container: "bg-blue-50 border-blue-200 text-blue-900",
        icon: <InfoIcon />,
      },
      success: {
        container: "bg-green-50 border-green-200 text-green-900",
        icon: <CheckCircleIcon />,
      },
      warning: {
        container: "bg-yellow-50 border-yellow-200 text-yellow-900",
        icon: <AlertTriangleIcon />,
      },
      destructive: {
        container: "bg-red-50 border-red-200 text-red-900",
        icon: <XCircleIcon />,
      },
    };

    const variantStyles = variants[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn("relative rounded-lg border p-4", variantStyles.container, className)}
        {...props}
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-0.5">{icon || variantStyles.icon}</div>

          <div className="flex-1 min-w-0">
            {title && (
              <Typography variant="body" weight="semibold" className="mb-1">
                {title}
              </Typography>
            )}

            {description && (
              <Typography variant="bodySmall" className="opacity-90">
                {description}
              </Typography>
            )}

            {children && <div className="mt-2">{children}</div>}

            {action && <div className="mt-3">{action}</div>}
          </div>

          {dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="flex-shrink-0 h-6 w-6 p-0 hover:bg-black/10"
              aria-label="Dismiss alert"
            >
              <XIcon />
            </Button>
          )}
        </div>
      </div>
    );
  }
);

AlertBox.displayName = "AlertBox";

export { AlertBox };

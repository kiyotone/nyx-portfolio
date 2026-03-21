// components/molecules/Toast/Toast.tsx

"use client";

import * as React from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/atoms/Button";
import type { Toast as ToastType } from "@/types/component.types";

interface ToastProps extends ToastType {
  onClose: () => void;
}

const CheckCircleIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const XCircleIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const AlertCircleIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const InfoIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, title, message, variant = "default", action, onClose }, ref) => {
    const [isExiting, setIsExiting] = React.useState(false);

    const handleClose = () => {
      setIsExiting(true);
      setTimeout(() => {
        onClose();
      }, 300);
    };

    const variantConfig = {
      default: {
        icon: <InfoIcon />,
        className:
          "bg-gray-900 dark:bg-gray-100 border-gray-700 dark:border-gray-300 text-white dark:text-gray-900",
        iconColor: "text-gray-400 dark:text-gray-600",
      },
      success: {
        icon: <CheckCircleIcon />,
        className:
          "bg-green-600 dark:bg-green-500 border-green-500 dark:border-green-400 text-white",
        iconColor: "text-green-200 dark:text-green-100",
      },
      error: {
        icon: <XCircleIcon />,
        className: "bg-red-600 dark:bg-red-500 border-red-500 dark:border-red-400 text-white",
        iconColor: "text-red-200 dark:text-red-100",
      },
      warning: {
        icon: <AlertCircleIcon />,
        className:
          "bg-orange-600 dark:bg-orange-500 border-orange-500 dark:border-orange-400 text-white",
        iconColor: "text-orange-200 dark:text-orange-100",
      },
      info: {
        icon: <InfoIcon />,
        className: "bg-blue-600 dark:bg-blue-500 border-blue-500 dark:border-blue-400 text-white",
        iconColor: "text-blue-200 dark:text-blue-100",
      },
    };

    const config = variantConfig[variant];

    return (
      <div
        ref={ref}
        style={{
          animation: isExiting
            ? "slideOutRight 0.3s ease-out forwards"
            : "slideInRight 0.3s ease-out forwards",
        }}
        className={cn(
          "flex items-start gap-3 p-4 rounded-lg border-2 shadow-xl min-w-[320px] max-w-md",
          config.className
        )}
        role="alert"
      >
        <style jsx>{`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideOutRight {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100%);
              opacity: 0;
            }
          }
        `}</style>

        {/* Icon */}
        <div className={cn("flex-shrink-0 mt-0.5", config.iconColor)}>{config.icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && <div className="font-semibold text-sm mb-1">{title}</div>}
          <div className="text-sm opacity-95">{message}</div>

          {action && (
            <Button
              variant="ghost"
              size="sm"
              onClick={action.onClick}
              className="mt-2 h-7 px-2 text-xs text-current hover:bg-white/20"
            >
              {action.label}
            </Button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={cn(
            "flex-shrink-0 p-1 rounded-md transition-all duration-200",
            "hover:bg-white/20 dark:hover:bg-black/10",
            "hover:scale-110 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          )}
          aria-label="Close notification"
        >
          <CloseIcon />
        </button>
      </div>
    );
  }
);

Toast.displayName = "Toast";

export default Toast;

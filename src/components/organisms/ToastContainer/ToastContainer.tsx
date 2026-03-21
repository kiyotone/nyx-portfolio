// components/organisms/ToastContainer/ToastContainer.tsx

"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "@/store";
import { selectToasts, removeToast } from "@/store/slices/toast.slice";
import { Toast } from "@/components/molecules/Toast";
import { cn } from "@/utils/cn";
import type { ToastPosition } from "@/types/component.types";

export interface ToastContainerProps {
  position?: ToastPosition;
  maxToasts?: number;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = "top-right",
  maxToasts = 5,
}) => {
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const visibleToasts = React.useMemo(() => {
    return toasts.slice(-maxToasts);
  }, [toasts, maxToasts]);

  React.useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    visibleToasts.forEach((toast) => {
      if (toast.duration && toast.duration > 0) {
        const timer = setTimeout(() => {
          dispatch(removeToast(toast.id));
        }, toast.duration);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [visibleToasts, dispatch]);

  const positionStyles: Record<ToastPosition, string> = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
    "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  };

  if (!isMounted || visibleToasts.length === 0) return null;

  const toastContent = (
    <div
      className={cn(
        "fixed z-100 flex flex-col gap-3 pointer-events-none",
        positionStyles[position]
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {visibleToasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={() => dispatch(removeToast(toast.id))} />
        </div>
      ))}
    </div>
  );

  return createPortal(toastContent, document.body);
};

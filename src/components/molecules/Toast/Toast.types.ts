import type { Toast, ToastVariant } from "@/types/component.types";

export interface ToastProps extends Toast {
  onClose: () => void;
}

export type { Toast, ToastVariant };

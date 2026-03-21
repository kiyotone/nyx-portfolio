// components/molecules/Modal/Modal.tsx

"use client";

import type { ModalProps } from "@/types/component.types";
import { cn } from "@/utils/cn";
import * as React from "react";
import { createPortal } from "react-dom";

const CloseIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      children,
      size = "md",
      variant = "default",
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      className,
      footer,
      preventClose = false,
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [shouldRender, setShouldRender] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
      setIsMounted(true);
    }, []);

    const handleClose = () => {
      if (preventClose) return;
      onClose();
    };

    // Handle open/close animations
    React.useEffect(() => {
      if (isOpen) {
        setShouldRender(true);
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      } else {
        setIsAnimating(false);
        const timer = setTimeout(() => {
          setShouldRender(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    // Handle escape key
    React.useEffect(() => {
      if (!isOpen || !closeOnEscape || preventClose) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeOnEscape, preventClose]);

    // Lock body scroll when modal is open
    React.useEffect(() => {
      if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }

      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }, [isOpen]);

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        handleClose();
      }
    };

    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-full",
    };

    if (!isMounted || !shouldRender) return null;

    const modalContent = (
      <>
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes fadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes scaleOut {
            from {
              opacity: 1;
              transform: scale(1);
            }
            to {
              opacity: 0;
              transform: scale(0.95);
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideDown {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(100%);
            }
          }
        `}</style>

        {/* Full Screen Overlay with Centered Content */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={handleOverlayClick}
        >
          {/* Backdrop */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(2px)",
              animation: isAnimating ? "fadeIn 0.3s ease-out" : "fadeOut 0.3s ease-out",
            }}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div
            ref={ref}
            style={{
              position: "relative",
              zIndex: 1,
              animation:
                variant === "drawer"
                  ? isAnimating
                    ? "slideUp 0.3s ease-out"
                    : "slideDown 0.3s ease-out"
                  : isAnimating
                    ? "scaleIn 0.3s ease-out"
                    : "scaleOut 0.3s ease-out",
            }}
            className={cn(
              "w-full bg-card rounded-lg shadow-2xl",
              "max-h-[90vh] overflow-y-auto",
              sizeClasses[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
            aria-modal="true"
            role="dialog"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby={description ? "modal-description" : undefined}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between p-6 pb-4 border-b border-border">
                <div className="flex-1">
                  {title && (
                    <h2 id="modal-title" className="text-lg font-semibold text-foreground">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="modal-description" className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>

                {showCloseButton && !preventClose && (
                  <button
                    onClick={handleClose}
                    className={cn(
                      "ml-4 p-1 rounded-md text-muted-foreground",
                      "transition-all duration-200",
                      "hover:bg-accent hover:text-accent-foreground",
                      "hover:scale-110 active:scale-95",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    )}
                    aria-label="Close modal"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-6">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-border">
                {footer}
              </div>
            )}
          </div>
        </div>
      </>
    );

    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = "Modal";

export default Modal;

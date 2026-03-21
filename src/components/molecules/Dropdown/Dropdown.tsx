import * as React from "react";
import { cn } from "@/utils/cn";
import { Typography } from "@/components/atoms/Typography";
import type { DropdownProps } from "./Dropdown.types";

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    { className, trigger, items, align = "left", open: controlledOpen, onOpenChange, ...props },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const isOpen = controlledOpen ?? internalOpen;
    const setIsOpen = onOpenChange ?? setInternalOpen;

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen, setIsOpen]);

    // Close on escape
    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
      }
    }, [isOpen, setIsOpen]);

    return (
      <div ref={dropdownRef} className={cn("relative", className)} {...props}>
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

        {isOpen && (
          <div
            className={cn(
              "absolute top-full mt-2 w-56 rounded-lg border bg-card shadow-lg z-50",
              "animate-in fade-in-0 zoom-in-95",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            <div className="p-1">
              {items.map((item, index) => {
                if (item.divider) {
                  return <div key={index} className="my-1 h-px bg-border" role="separator" />;
                }

                const handleClick = () => {
                  if (!item.disabled) {
                    item.onClick?.();
                    setIsOpen(false);
                  }
                };

                const content = (
                  <>
                    {item.icon && <span className="mr-2 flex-shrink-0">{item.icon}</span>}
                    <Typography variant="bodySmall">{item.label}</Typography>
                  </>
                );

                const baseStyles = cn(
                  "flex items-center w-full px-3 py-2 rounded-md",
                  "text-left transition-colors",
                  item.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted cursor-pointer"
                );

                if (item.href && !item.disabled) {
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className={baseStyles}
                      onClick={() => setIsOpen(false)}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={handleClick}
                    disabled={item.disabled}
                    className={baseStyles}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

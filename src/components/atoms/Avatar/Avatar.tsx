import * as React from "react";
import { cn } from "@/utils/cn";
import type { AvatarSize, AvatarStatus, AvatarShape } from "@/types/component.types";
import type { AvatarProps } from "./Avatar.types";

// Default user icon for when no image or fallback is provided
const UserIcon = () => (
  <svg
    className="h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, size = "md", src, alt = "", fallback, status, shape = "circle", ...props },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    // Reset error state when src changes
    React.useEffect(() => {
      setImageError(false);
    }, [src]);

    // Base styles
    const baseStyles =
      "relative inline-flex items-center justify-center overflow-hidden bg-muted text-muted-foreground shrink-0";

    // Size styles
    const sizes: Record<AvatarSize, { container: string; text: string; status: string }> = {
      xs: { container: "h-6 w-6", text: "text-xs", status: "h-1.5 w-1.5" },
      sm: { container: "h-8 w-8", text: "text-sm", status: "h-2 w-2" },
      md: { container: "h-10 w-10", text: "text-base", status: "h-2.5 w-2.5" },
      lg: { container: "h-12 w-12", text: "text-lg", status: "h-3 w-3" },
      xl: { container: "h-16 w-16", text: "text-2xl", status: "h-4 w-4" },
    };

    // Shape styles
    const shapes: Record<AvatarShape, string> = {
      circle: "rounded-full",
      square: "rounded-md",
    };

    // Status colors
    const statusColors: Record<AvatarStatus, string> = {
      online: "bg-success",
      offline: "bg-muted-foreground",
      away: "bg-warning",
      busy: "bg-destructive",
    };

    const shouldShowImage = src && !imageError;
    const shouldShowFallback = !shouldShowImage && fallback;
    const shouldShowIcon = !shouldShowImage && !fallback;

    return (
      <div
        ref={ref}
        className={cn(baseStyles, shapes[shape], sizes[size].container, className)}
        {...props}
      >
        {shouldShowImage && (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        {shouldShowFallback && (
          <span className={cn("font-medium select-none", sizes[size].text)}>{fallback}</span>
        )}
        {shouldShowIcon && (
          <div className="h-2/3 w-2/3 text-current">
            <UserIcon />
          </div>
        )}
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-2 border-background",
              statusColors[status],
              sizes[size].status
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
